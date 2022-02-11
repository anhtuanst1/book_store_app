import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './components/Home';
import Admin from './components/Admin';
import Dashboard from './components/Admin/DashBoard';
import BookManagements from './components/Admin/BookManagements';
import BookManagement from './components/Admin/BookManagements/BookManagement';
import BookCreate from './components/Admin/BookManagements/BookCreate';
import BookUpdate from './components/Admin/BookManagements/BookUpdate';
import BookDetail from './components/Common/BookDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="book/:bookId" element={<BookDetail />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="book-management" element={<BookManagements />}>
              <Route index element={<BookManagement />} />
              <Route path="create" element={<BookCreate />} />
              <Route path="update/:bookId" element={<BookUpdate />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
