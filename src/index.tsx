import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import { setupStore } from './store/store';

import './index.scss';

const store = setupStore();

const divRoot = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(divRoot);

const update = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

update();
store.subscribe(update);
