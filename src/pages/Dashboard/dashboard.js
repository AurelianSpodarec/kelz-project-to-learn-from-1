import React from "react"
import { Helmet } from "react-helmet-async"
import { get } from "lodash"

// Helpers
import { getUserDashboard } from "../../UI/Helpers"
import { PageContext } from "../../UI/Organisms"
import { getTitle } from "./dashboard.helpers"

// Components
import { Dashboard as Dash } from "../../UI/Templates"

const Dashboard = () => {
  const { selfServiceData: user, selfServiceLoading } = React.useContext(PageContext)

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Dash
        dashboard={getUserDashboard(
          get(user, "role.name", "SYS_ADMIN"),
          get(user, "parent.slug", "")
        )}
        title={getTitle(get(user, "role.name", "SYS_ADMIN"))}
        isLoading={selfServiceLoading}
      />
    </>
  )
}

export default Dashboard
