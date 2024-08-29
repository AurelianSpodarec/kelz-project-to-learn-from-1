import React, { useContext } from "react"
import { Helmet } from "react-helmet-async"
import { AuthContext } from "@4cplatform/elements/Auth"
import { H1, P } from "@4cplatform/elements/Typography"

// Components
import { Breadcrumbs } from "../../UI/Molecules"
import { Tabs, Tab } from "../../UI/Organisms"
import Details from "./pages/Details"
import Settings from "./pages/Settings"
import AgencyCodes from "./pages/AgencyCodes"

// Helpers
import { DASHBOARD } from "../../config/pages"

const MyAccountTabs = () => {
  const { canAccess } = useContext(AuthContext)

  return (
    <>
      <Helmet>
        <title>My Account</title>
      </Helmet>
      <Breadcrumbs
        trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "My Account" }]}
      />
      <H1>My Account</H1>
      <P>View and manage your 4C Platform account details and settings.</P>
      <Tabs hasQueryControls name="my-account">
        <Tab header="Details">
          <Details />
        </Tab>
        <Tab header="Settings">
          <Settings />
        </Tab>
        <Tab header="Agency codes" isPresent={canAccess(["ORG_ADMIN"])}>
          <AgencyCodes />
        </Tab>
      </Tabs>
    </>
  )
}

export default MyAccountTabs
