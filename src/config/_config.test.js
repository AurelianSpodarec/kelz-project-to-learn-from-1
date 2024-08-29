import appConfig from "./index"
import { DASHBOARD, LOGIN, FORBIDDEN, TWO_FACTOR_AUTH } from "./pages"

test("appConfig should have the desired structure and types", () => {
  expect(appConfig.API_URL).toStrictEqual(process.env.REACT_APP_API_URL)
  expect(appConfig.TRANSLATION_NAMESPACES).toStrictEqual(
    process.env.REACT_APP_TRANSLATION_NAMESPACES
      ? process.env.REACT_APP_TRANSLATION_NAMESPACES.split(", ")
      : []
  )
  expect(appConfig.HOME_PATH).toStrictEqual(DASHBOARD.path)
  expect(appConfig.LOGIN_PATH).toStrictEqual(LOGIN.path)
  expect(appConfig.TWOFA_PATH).toStrictEqual(TWO_FACTOR_AUTH.path)
  expect(appConfig.FORBIDDEN_PATH).toStrictEqual(FORBIDDEN.path)
})
