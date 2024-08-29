import React, { useEffect, useContext, useReducer } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { AuthContext, AuthWrapper } from "@4cplatform/elements/Auth"
import { useGet, useSubscription, ApiError } from "@4cplatform/elements/Api"
import { ConfigContext } from "@4cplatform/elements/Config"
import {
  useCurrentPath,
  storePathInSessionStorage,
  getStoredPath
} from "@4cplatform/elements/Helpers"

// Helpers
import { getUserDashboard } from "../../Helpers"
import reducer from "./page.reducer"
import { Provider } from "./page.context"

// Components
import { Header, Footer } from "../../Molecules"
import Navigation from "./page.navigation"
import { Content, PageWrapper, Overlay } from "./page.styles"

const Page = ({ children }) => {
  const {
    user: userData,
    userLoading: selfServiceLoading,
    userRefetch: selfServiceRefetch,
    userError: selfServiceError,
    isLoggedIn
  } = useContext(AuthContext)
  const { GLOBAL_TITLES, LOADING_TITLES, updateValue } = useContext(ConfigContext)

  // Manage state
  const [{ panelStatus, prevPanelStatus, user, notifications }, dispatch] = useReducer(reducer, {
    panelStatus: "closed",
    prevPanelStatus: "closed",
    user: userData,
    notifications: []
  })

  const currentPath = useCurrentPath()

  // Purge stored path if URL has been manually changed by user
  window.addEventListener("beforeunload", () => {
    if (getStoredPath() && window.location.pathname !== getStoredPath())
      return sessionStorage.removeItem("redirectPath")
  })

  // Trigger self-service update if authUser changes
  useEffect(() => {
    if (!isEmpty(userData)) dispatch({ type: "SELF_SERVICE_UPDATE", user: userData })
    // Store current navigated path for redirect logic
    const gatePaths = [
      "/login",
      "/two-factor-authentication",
      "/register",
      "/reset-password",
      "/two-factor-authentication",
      "/activate-user",
      "/forgotten-password"
    ]
    if (!gatePaths.includes(currentPath.split("?")[0])) {
      storePathInSessionStorage(currentPath)
    }
  }, [userData, currentPath])

  // Change the state of the FlyOutPanel
  const setPanelStatus = status => {
    dispatch({ type: "SET_PANEL_STATUS", status })
  }

  // Fetch unread notifications
  const { error: notificationsError } = useGet({
    endpoint: "/notifications/unread",
    onCompleted: res => {
      dispatch({ type: "UPDATE_VALUE", key: "notifications", value: get(res, "data", []) })
    },
    skip: !get(user, "slug")
  })

  // Subscribe to notifications
  useSubscription(
    `private-encrypted-user.${get(user, "id")}`,
    "4cng.notification",
    data =>
      dispatch({ type: "UPDATE_VALUE", key: "notifications", value: [...notifications, data] }),
    !get(user, "id")
  )

  // Index titles
  const { loading: titlesLoading, data: globalTitles } = useGet({
    endpoint: "/dmz/titles",
    skip: GLOBAL_TITLES !== null || !isLoggedIn,
    onCompleted: ({ data }) =>
      localStorage.setItem("usay-titles-store", JSON.stringify({ data, timestamp: Date.now() }))
  })

  useEffect(() => {
    if (LOADING_TITLES !== titlesLoading) {
      updateValue("LOADING_TITLES", titlesLoading)
    }

    if (GLOBAL_TITLES === null && !!globalTitles) {
      updateValue("GLOBAL_TITLES", { data: globalTitles })
    }
  }, [updateValue, LOADING_TITLES, GLOBAL_TITLES, titlesLoading, globalTitles])

  return (
    <Provider
      value={{
        setPanelStatus,
        panelStatusControls: {
          panelStatus,
          prevPanelStatus
        },
        resetPanel: () => dispatch({ type: "RESET_PANEL" }),
        selfServiceData: user,
        selfServiceUpdate: val => dispatch({ type: "SELF_SERVICE_UPDATE", user: val }),
        selfServiceLoading,
        selfServiceRefetch,
        updateNotifications: val =>
          dispatch({ type: "UPDATE_VALUE", key: "notifications", value: val }),
        notifications
      }}
    >
      <PageWrapper data-testid="test-page" isLoggedIn={isLoggedIn}>
        <AuthWrapper>
          <Header panelStatus={panelStatus} prevPanelStatus={prevPanelStatus} />
          <Navigation
            dashboard={getUserDashboard(
              get(user, "role.name", "SYS_ADMIN"),
              get(user, "parent.slug", "")
            )}
            isLoading={selfServiceLoading}
          />
        </AuthWrapper>
        <Content data-testid="test-content" panelStatus={panelStatus} isLoggedIn={isLoggedIn}>
          <Overlay
            panelStatus={panelStatus}
            onClick={() => {
              if (panelStatus === "wide" || panelStatus === "open") {
                setPanelStatus("closed")
              }
            }}
            data-testid="test-page-overlay"
          />
          {children}
          <ApiError error={notificationsError || selfServiceError} />
        </Content>
        <AuthWrapper>
          <Footer panelStatus={panelStatus} prevPanelStatus={prevPanelStatus} />
        </AuthWrapper>
      </PageWrapper>
    </Provider>
  )
}

Page.defaultProps = {
  children: null
}

Page.propTypes = {
  children: PropTypes.any
}

export default Page
