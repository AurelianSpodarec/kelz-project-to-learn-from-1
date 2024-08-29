import React, { useState, useContext } from "react"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"
import { get } from "lodash"
import { Helmet } from "react-helmet-async"
import { H1, P } from "@4cplatform/elements/Typography"
import { AuthContext } from "@4cplatform/elements/Auth"

// Helpers
import { ProviderManageContext } from "./context/manage.context"
import { DASHBOARD, PROVIDER_ADMIN } from "../../config/pages"

// Components
import { Breadcrumbs, ConfirmationModal } from "../../UI/Molecules"
import { Tabs, Tab } from "../../UI/Organisms"
import Details from "./pages/Details"
import Policies from "./pages/Policies"
import Quotes from "./pages/Quotes"
import Users from "./pages/Users"

const ProviderManageTabs = () => {
  const { search: lSearch } = useLocation()
  const history = useHistory()
  const qs = queryString.parse(lSearch)
  const { canAccess } = useContext(AuthContext)
  const { hasUnsavedProviderDetails, setHasUnsavedProviderDetails, provider, providerLoading } =
    useContext(ProviderManageContext)
  const [exitModalState, setExitModalState] = useState({ modalOpen: false, tabId: null })
  const onClickOverride = (tabId = null) => setExitModalState({ modalOpen: true, tabId })

  return (
    <>
      <Helmet>
        <title>{get(provider, "name", "Provider")}</title>
      </Helmet>
      <Breadcrumbs
        trail={[
          { label: "Dashboard", link: DASHBOARD.path },
          canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"])
            ? { label: "Providers", link: PROVIDER_ADMIN.path }
            : undefined,
          { label: get(provider, "name", "Provider") }
        ].filter(x => x !== undefined)}
        margin="4.5rem 0 3rem 0"
      />
      <H1 margin="0 0 3rem" isLoading={providerLoading}>
        {get(provider, "name", "")}
      </H1>
      <Tabs name="manage" margin="0" hasQueryControls>
        <Tab header="Details">
          <Details />
        </Tab>
        <Tab
          header="Users"
          hasClickOverride={hasUnsavedProviderDetails}
          clickOverrideHandler={val => onClickOverride(val)}
        >
          <Users />
        </Tab>
        <Tab
          header="Policies"
          hasClickOverride={hasUnsavedProviderDetails}
          clickOverrideHandler={val => onClickOverride(val)}
        >
          <Policies />
        </Tab>
        <Tab
          header="Simulated policies"
          hasClickOverride={hasUnsavedProviderDetails}
          clickOverrideHandler={val => onClickOverride(val)}
        >
          <Policies isSimulated />
        </Tab>
        <Tab
          header="Quotes"
          hasClickOverride={hasUnsavedProviderDetails}
          clickOverrideHandler={val => onClickOverride(val)}
        >
          <Quotes />
        </Tab>
        <Tab
          header="Simulated quotes"
          hasClickOverride={hasUnsavedProviderDetails}
          clickOverrideHandler={val => onClickOverride(val)}
        >
          <Quotes isSimulated />
        </Tab>
      </Tabs>

      {exitModalState?.modalOpen && (
        <ConfirmationModal
          confirmIcon="cancel"
          confirmText="Yes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setExitModalState({ modalOpen: false, tabId: null })}
          onConfirm={() => {
            setHasUnsavedProviderDetails(false)
            setExitModalState({ modalOpen: false, tabId: null })

            history.replace({
              search: queryString.stringify({ ...qs, manage: exitModalState?.tabId })
            })
          }}
        >
          <P>
            You have unsaved changes. Are you sure you want to abandon changes and proceed to{" "}
            {exitModalState?.tabId.replaceAll("_", " ")} page?
          </P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default ProviderManageTabs
