import {
  LOGIN,
  TWO_FACTOR_AUTH,
  DASHBOARD,
  FORBIDDEN,
  NOT_FOUND,
  PASSWORD_CHANGE_CONFIRMATION
} from "./pages"

const appConfig = {
  API_URL: process.env.REACT_APP_API_URL, // Base url for the api
  API_SCOPE: process.env.REACT_APP_API_SCOPE, // API scope
  TRANSLATION_NAMESPACES: process.env.REACT_APP_TRANSLATION_NAMESPACES
    ? process.env.REACT_APP_TRANSLATION_NAMESPACES.split(", ")
    : [],
  LOGIN_PATH: LOGIN.path, // Route for the login page
  TWOFA_PATH: TWO_FACTOR_AUTH.path, // Route for the 2fa page
  HOME_PATH: DASHBOARD.path, // Where to redirect logged in users
  FORBIDDEN_PATH: FORBIDDEN.path, // Forbidden 403 error page
  NOT_FOUND_PATH: NOT_FOUND.path, // Not Found 404 error page
  PASSWORD_CHANGE_CONFIRMATION_PATH: PASSWORD_CHANGE_CONFIRMATION.path,
  GOOGLE_MAPS_KEY: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  LOADING_TITLES: false,
  GLOBAL_TITLES: (() => {
    const titles = JSON.parse(localStorage.getItem("usay-titles-store"))
    // If null or timestamp greater than 3 days
    const oneDay = 1000 * 60 * 60 * 24
    if (!titles || Date.now() - titles.timestamp > oneDay * 3) return null
    return titles
  })()
}

export const pusherConfig = {
  clientKey: process.env.REACT_APP_PUSHER_KEY,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  authEndpoint: `${appConfig.API_URL}/${appConfig.API_SCOPE}/broadcasting/auth`,
  authTransport: "jsonp"
}

export default appConfig
