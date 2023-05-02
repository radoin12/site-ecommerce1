import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import {store} from './redux/configureStore'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { apiSlice } from './redux/features/api';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
     <Provider store={store}>
   
     
       <App/>
     
      </Provider>
  

  
  
  
  </React.StrictMode>
);


reportWebVitals();
