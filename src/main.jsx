import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'lib-flexible/flexible';
import './main.css';
import 'zarm/dist/zarm.css';
import App from './App';
console.log(import.meta.env.MODE);
ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>, document.getElementById('root'));
//# sourceMappingURL=main.jsx.map