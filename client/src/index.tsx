import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextType } from './store/ContextType';
import UserStore from './store/UserStore';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import ColorStore from './store/ColorStore';
import SelectedElements from './store/SelectedElements';
import ModeStore from './store/ModeStore';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const Context = createContext<ContextType>({
  user: new UserStore(),
  color: new ColorStore(),
  selectedElements: new SelectedElements(),
  mode: new ModeStore(),
});



root.render(
  <Context.Provider value={{
    user: new UserStore(),
    color: new ColorStore(),
    selectedElements: new SelectedElements(),
    mode: new ModeStore(),
  }}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Context.Provider>
  
);