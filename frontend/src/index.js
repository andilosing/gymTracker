import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, { persistor } from './redux/store'; // Stellen Sie sicher, dass Sie persistor auch exportiert haben
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
