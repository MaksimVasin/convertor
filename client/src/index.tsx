import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextType } from './store/ContextType';
import UserStore from './store/UserStore';
import  'bootstrap/dist/css/bootstrap.min.css' ;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const Context = createContext<ContextType>({
  user: new UserStore()
});

root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Context.Provider>
  
);