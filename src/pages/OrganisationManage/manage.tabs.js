import React, { useContext } from "react"
import { get, isEmpty } from "lodash"
import { Helmet } from "react-helmet-async"
import { AuthContext } from "@4cplatform/elements/Auth"
import { H1 } from "@4cplatform/elements/Typography"

// Helpers
import { OrganisationManageContext } from "./context/manage.context"
import { DASHBOARD, ORGANISATION_ADMIN } from "../../config/pages"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import { Tabs, Tab } from "../../UI/Organisms"
import Details from "./pages/Details"
import Users from "./pages/Users"
import Journeys from "./pages/Journeys"
import Settings from "./pages/Settings"
import AgencyCodes from "./pages/AgencyCodes"
import Policies from "./pages/Policies"
import Approval from "./pages/Approval"
import Notes from "./pages/Notes"
import Documents from "./pages/Documents"

const OrganisationManageTabs = () => {
  const { organisation, organisationLoading } = useContext(OrganisationManageContext)
  const { canAccess } = useContext(AuthContext)
  return (
    <>
      {/* Page info */}
      <Helmet>
        <title>{get(organisation, "name", "Organisation")}</title>
      </Helmet>
      <Breadcrumbs
        trail={[
          { label: "Dashboard", link: DASHBOARD.path },
          canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"])
            ? { label: "Organisations", link: ORGANISATION_ADMIN.path }
            : undefined,
          { label: get(organisation, "name", "Organisation") }
        ].filter(x => x !== undefined)}
        margin="4.5rem 0 3rem 0"
      />
      <H1 margin="0 0 3rem" isLoading={organisationLoading}>
        {get(organisation, "name", "")}
      </H1>
      {/* Components */}
      <Tabs hasQueryControls name="manage">
        <Tab header="Details">
          <Details />
        </Tab>
        <Tab header="Users" isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"])}>
          <Users />
        </Tab>
        <Tab header="Client journeys">
          <Journeys />
        </Tab>
        <Tab header="Settings" isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"])}>
          <Settings />
        </Tab>
        <Tab
          header="Agency codes"
          isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"])}
        >
          <AgencyCodes />
        </Tab>
        <Tab header="Policies">
          <Policies />
        </Tab>
        <Tab header="Simulated policies">
          <Policies isSimulated />
        </Tab>
        <Tab header="Approval" isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"])}>
          <Approval />
        </Tab>
        <Tab header="Notes" isPresent={canAccess(["SYS_ADMIN", "SUPPORT_ADMIN"])}>
          <Notes />
        </Tab>
        <Tab header="Documents" isPresent={!isEmpty(get(organisation, "network", {}))}>
          <Documents />
        </Tab>
      </Tabs>
    </>
  )
}

export default OrganisationManageTabs
