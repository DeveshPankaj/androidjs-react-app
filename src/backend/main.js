const back = require('androidjs').back;

back.on('Hello', function(msg){
    back.send('print', `Hello ${msg}`);
});

