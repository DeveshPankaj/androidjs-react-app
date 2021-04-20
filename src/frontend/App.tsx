import React from 'react';
import logo from './logo.svg';
import './App.css'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function App() {


  const [url, setUrl] = React.useState<string>('172.16.5.64:3000')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/frontend/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://android-js.github.io/docs/configuring_app.html#change-the-icon-of-your-app/"
          rel="noopener noreferrer"
        >
          Explore more.
        </a>

      </header>

      {/* <div>
        <input type="text" placeholder="provide ip address" value={url} onChange={(e)=> {setUrl(e.target.value)}} /> <button onClick={() => {
          window.location.href = 'http://' + url
        }}>GO</button>
      </div> */}
    </div>
  );
}

export default App;
