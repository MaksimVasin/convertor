import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextType } from './store/ContextType';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const Context = createContext<ContextType | null>(null);

root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Context.Provider>
  
);