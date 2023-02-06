import { AdminPage } from "./pages/Admin"
import { AuthPage } from "./pages/Auth"
import { ConvertorPage } from "./pages/Convertor"

import { ADMIN_ROUTE, CONVERTOR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  }
]

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: CONVERTOR_ROUTE,
    Component: ConvertorPage
  },
]