import React, { useContext } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { H3, P } from "@4cplatform/elements/Typography"
import { Skeleton } from "@4cplatform/elements/Molecules"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import NavLink from "./navigation.section.link"

const NavSection = ({ title, pages, isFirst }) => {
  const { isLoading } = useContext(JourneyContext)
  if (isEmpty(pages) && !isLoading) return null
  const margin = isFirst ? { margin: "0 0 1rem" } : {}
  return (
    <>
      <H3 isLoading={isLoading} {...margin}>
        {title}
      </H3>
      {isLoading && <Skeleton wrapper={P} count={5} />}
      {!isLoading && pages.map(page => <NavLink page={page} key={page.key} />)}
    </>
  )
}

NavSection.defaultProps = {
  pages: [],
  title: "",
  isFirst: false
}

NavSection.propTypes = {
  pages: PropTypes.array,
  title: PropTypes.string,
  isFirst: PropTypes.bool
}

export default NavSection
