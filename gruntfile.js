const fs = require('fs')
const path = require('path');
const androidjs_react = require('androidjs-builder/modules/react')

const AndroidJS_PATH = './build/.androidjs'

module.exports = (grunt) => {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        shell: {
            gitclone: {
                command: `git clone https://github.com/android-js/sdk-static.git ${AndroidJS_PATH} && rm -rf ${AndroidJS_PATH}/.git`
            },
            buildapp: {
                command: 'react-scripts build'
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell')

    grunt.registerTask('download-androidjs-sdk', function() {
        grunt.log.ok('checking androidjs sdk ...')

        if(fs.existsSync(`${AndroidJS_PATH}/config.json`)) {
            const sdkConfig = grunt.file.readJSON(`${AndroidJS_PATH}/config.json`)
            grunt.log.ok(`sdk version: ${sdkConfig.version}`)
        } else {
            grunt.task.run('shell:gitclone')
        }
    })

    // grunt.registerTask('build-react-app', function() {
    //     const done = this.async()

    //     grunt.log.writeln('build-react-app')

    //     done()
    // })

    grunt.registerTask('build-androidjs-app', function() {
        grunt.task.requires('download-androidjs-sdk')
        const done = this.async()

        const react_app = new androidjs_react.ReactApp()


        const project = {
            dir: process.cwd(),
            name: grunt.config('pkg.name'),
            type: grunt.config('pkg.type')
        };
        const builder = {
            dir: path.parse(require.resolve('androidjs-builder')).dir,
            commander: null,
            cache: path.join(__dirname, 'build', '.androidjs'),
            debug: false
        };

        const env = {
            force: false,
            release: false,
            project,
            builder
        };
        react_app.installModule(env, {})
        react_app.build(done)

        //done()
    })

    grunt.registerTask('build', 'Build AndroidJS project', [
        'download-androidjs-sdk', 
        'shell:buildapp', 
        'build-androidjs-app'
    ]);
}


