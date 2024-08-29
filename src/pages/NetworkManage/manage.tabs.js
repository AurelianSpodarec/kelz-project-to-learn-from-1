import React, { useContext, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"
import { get } from "lodash"
import { H1, P } from "@4cplatform/elements/Typography"
import { Helmet } from "react-helmet-async"

// Helpers
import { AuthContext } from "@4cplatform/elements/Auth"
import { NetworkManageContext } from "./context/manage.context"
import { DASHBOARD, NETWORK_ADMIN } from "../../config/pages"

// Components
import { Breadcrumbs, ConfirmationModal } from "../../UI/Molecules"
import { Tabs, Tab } from "../../UI/Organisms"
import Details from "./pages/Details"
import Users from "./pages/Users"
import Invitations from "./pages/Invitations"
import Applications from "./pages/Applications"
import Documents from "./pages/Documents"
import Settings from "./pages/Settings"
import Members from "./pages/Members"
import Quotes from "./pages/Quotes"
import Policies from "./pages/Policies"
import AgencyCodes from "./pages/AgencyCodes"

const NetworkManageTabs = () => {
  const { network, networkLoading, hasUnsavedNetworkDetails, setHasUnsavedNetworkDetails } =
    useContext(NetworkManageContext)
  const { canAccess } = useContext(AuthContext)
  const [exitModalState, setExitModalState] = useState({ modalOpen: false, tabId: null })

  const { search } = useLocation()
  const history = useHistory()
  const qs = queryString.parse(search)

  const tabProps = {
    hasClickOverride: hasUnsavedNetworkDetails,
    clickOverrideHandler: (tabId = null) => setExitModalState({ modalOpen: true, tabId })
  }

  return (
    <>
      {/* Page Info */}
      <Helmet>
        <title>{get(network, "name", "Network")}</title>
      </Helmet>
      <Breadcrumbs
        trail={[
          { label: "Dashboard", link: DASHBOARD.path },
          canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"])
            ? { label: "Networks", link: NETWORK_ADMIN.path }
            : undefined,
          { label: get(network, "name", "Network") }
        ].filter(x => x !== undefined)}
        margin="4.5rem 0 0.5rem 0"
      />
      <H1 margin="0 0 3rem" isLoading={networkLoading}>
        {get(network, "name", "-")}
      </H1>
      {/* Components */}
      <Tabs hasQueryControls name="manage">
        <Tab header="Details">
          <Details />
        </Tab>
        <Tab
          header="Settings"
          isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN"])}
          {...tabProps}
        >
          <Settings />
        </Tab>
        <Tab
          header="Users"
          isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "NETWORK_ADMIN"])}
          {...tabProps}
        >
          <Users />
        </Tab>
        <Tab header="Members" {...tabProps}>
          <Members />
        </Tab>
        <Tab header="Invitations" {...tabProps}>
          <Invitations />
        </Tab>
        <Tab header="Applications" {...tabProps}>
          <Applications />
        </Tab>
        <Tab header="Documents" {...tabProps}>
          <Documents />
        </Tab>
        <Tab
          header="Agency codes"
          isPresent={canAccess([
            "SYS_ADMIN",
            "SUPPORT_ADMIN",
            "NETWORK_ADMIN",
            "NETWORK_MEMBER_ADMIN"
          ])}
          {...tabProps}
        >
          <AgencyCodes isChild />
        </Tab>
        <Tab
          header="Quotes"
          isPresent={canAccess([
            "SYS_ADMIN",
            "SUPPORT_ADMIN",
            "NETWORK_ADMIN",
            "NETWORK_MEMBER_ADMIN"
          ])}
          {...tabProps}
        >
          <Quotes />
        </Tab>
        <Tab
          header="Policies"
          isPresent={canAccess([
            "SYS_ADMIN",
            "SUPPORT_ADMIN",
            "NETWORK_ADMIN",
            "NETWORK_MEMBER_ADMIN"
          ])}
          {...tabProps}
        >
          <Policies />
        </Tab>
      </Tabs>

      {exitModalState.modalOpen && (
        <ConfirmationModal
          confirmIcon="cancel"
          confirmText="Yes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setExitModalState({ modalOpen: false, tabId: null })}
          onConfirm={() => {
            setHasUnsavedNetworkDetails(false)
            setExitModalState({ modalOpen: false, tabId: null })
            history.replace({
              search: queryString.stringify({ ...qs, manage: exitModalState.tabId })
            })
          }}
        >
          <P>
            You have unsaved changes. Are you sure you want to abandon changes and proceed to{" "}
            {exitModalState.tabId.replaceAll("_", " ")} page?
          </P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default NetworkManageTabs
