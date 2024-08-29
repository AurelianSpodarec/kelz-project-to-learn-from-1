import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import { NavigationLink } from "./navigation.styles"

const NavLink = ({ page }) => {
  const { data, onNavClick } = useContext(JourneyContext)
  const title = get(page, "title", "")
  const key = get(page, "key", "")
  const current = get(data, "page.key")
  const invalidations = get(page, "invalidations", [])

  return (
    <NavigationLink
      isCurrent={current === key}
      disabled={current === key}
      onClick={() => {
        if (current !== key) onNavClick(page)
      }}
      hasErrors={!isEmpty(invalidations)}
      data-testid={`${key.toLowerCase()}-navigation_link`}
    >
      {title}
    </NavigationLink>
  )
}

NavLink.propTypes = {
  page: PropTypes.object.isRequired
}

export default NavLink
