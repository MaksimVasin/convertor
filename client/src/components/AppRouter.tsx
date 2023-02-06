import {Routes, Route, /* Navigate */} from 'react-router-dom'
import { Context } from '../index';
import { ConvertorPage } from '../pages/Convertor';
import { useContext } from 'react'

import { authRoutes, publicRoutes } from '../routes';

const AppRouter = (): JSX.Element => {
  const context = useContext(Context);
  if (!context) throw new Error("Context has to be used within <Context.Provider>");
  
  const user = context.user;

  console.log(user);

  return (
    <div>
      <Routes>

        {user._isAuth && authRoutes.map(
          ({path, Component}) => 
            <Route key={path} path={path} element={<Component/>}/>
        )}

        {publicRoutes.map(
          ({path, Component}) => 
            <Route key={path} path={path} element={<Component/>}/>
        )}

        <Route path='*' element={<ConvertorPage/>}/>

      </Routes>
    </div>
  )
}

export default AppRouter