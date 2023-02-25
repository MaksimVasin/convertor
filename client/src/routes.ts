import { AdminPage } from "./pages/Admin"
import AuthPage from "./pages/Auth"
import ConvertorPage from "./pages/Convertor"
import PersonalAreaPage from "./pages/PersonalArea"

import { ADMIN_ROUTE, CONVERTOR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PERSONAL_AREA_ROUTE } from "./utils/consts"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: PERSONAL_AREA_ROUTE,
    Component: PersonalAreaPage,
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