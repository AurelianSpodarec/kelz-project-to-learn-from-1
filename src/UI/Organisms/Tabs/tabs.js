/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { get, findIndex } from "lodash"
import queryString from "query-string"
import { useHistory, useLocation } from "react-router-dom"
import { formatLabelForTestID } from "@4cplatform/elements/Helpers"

// Components
import { Wrapper, Links, Content } from "./tabs.styles"

// Helpers
import { getDefaultTab } from "./tabs.helpers"

const Tabs = ({
  defaultIndex,
  children,
  type,
  margin,
  activeAppearance,
  inactiveAppearance,
  name,
  hasQueryControls,
  isLoading,
  newActiveID,
  isChild
}) => {
  const location = useLocation()
  const values = queryString.parse(location.search)
  const path = get(location, "pathname")
  const search = get(location, "search")
  const history = useHistory()
  const [activeID, setActiveID] = React.useState(
    getDefaultTab({ defaultIndex, hasQueryControls, values, name, children })
  )
  // Fetch the activeIndex based on the currently-selected activeID
  const activeIndex = findIndex(
    children,
    child => formatLabelForTestID(get(child, "props.header")) === activeID
  )

  // Set URL params on page load
  React.useEffect(() => {
    // If hasQueryControls is true, but none exist for this component, add them
    if (hasQueryControls && !Object.keys(values).includes(name)) {
      if (!search) {
        history.replace(
          `${path}?${name}=${getDefaultTab({
            defaultIndex,
            hasQueryControls,
            values,
            name,
            children
          })}`
        )
      } else {
        history.replace(
          `${path}${search}&${name}=${getDefaultTab({
            defaultIndex,
            hasQueryControls,
            values,
            name,
            children
          })}`
        )
      }
    }
  }, [search])

  // If the search key for this component changes, change the active tab to match
  React.useEffect(() => {
    if (activeID !== values[name] && hasQueryControls && !!name) {
      setActiveID(values[name])
    }
  }, [values])

  useEffect(() => {
    newActiveID && setActiveID(newActiveID)
  }, [newActiveID])

  // Click handler
  const handleClick = id => {
    if (id === activeID) return

    // If hasQueryControls is true, change the value of the query
    if (hasQueryControls) {
      if (isChild) {
        history.push(`${path}${search.replace(`${name}=${activeID}`, `${name}=${id}`)}`)
      } else {
        history.push(`${path}${`?${name}=${id}`}`)
      }
    }

    setActiveID(id)
  }

  return (
    <Wrapper type={type} margin={margin} data-testid={`${name}-tabs-wrapper`}>
      <Links type={type}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onClick: handleClick,
            isActive: formatLabelForTestID(get(child, "props.header")) === activeID,
            type,
            isFirst: index === 0,
            isLast: index + 1 === children.length,
            activeAppearance,
            inactiveAppearance,
            isLoading
          })
        )}
      </Links>
      <Content type={type}>
        {!!children[activeIndex] &&
          children[activeIndex].props.isPresent &&
          children[activeIndex].props.children}
      </Content>
    </Wrapper>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  children: null,
  type: "anchors",
  margin: "0 0 2rem",
  activeAppearance: "primary",
  inactiveAppearance: "primaryGhost",
  name: "tabs",
  hasQueryControls: false,
  isLoading: false
}

Tabs.propTypes = {
  /**
   * The default Tab to display when the component is rendered
   */
  defaultIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The children wrapped by the component
   */
  children: PropTypes.any,
  /**
   * The type of the Tab Links
   */
  type: PropTypes.oneOf(["anchors", "buttons", "vertical", "table", "panel", "modal"]),
  /**
   * The margin attached to the Wrapper
   */
  margin: PropTypes.string,
  /**
   * If displaying the tabs as buttons, this is the Button appearance for the active tab
   */
  activeAppearance: PropTypes.string,
  /**
   * If displaying the tabs as buttons, this is the Button appearance for the inactive tab
   */
  inactiveAppearance: PropTypes.string,
  /**
   * Unique identifier for this component
   */
  name: PropTypes.string,
  /**
   * Whether the Tabs control URL or not
   */
  hasQueryControls: PropTypes.bool,
  /**
   * Whether the Tabs are loading or not
   */
  isLoading: PropTypes.bool,
  /**
   * Changes the active tab from the parent Component
   */
  newActiveID: PropTypes.string,
  /**
   * Indicates if this component is a child of another Tabs component
   */
  isChild: PropTypes.bool
}

export default Tabs
