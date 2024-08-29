import React from "react"
import PropTypes from "prop-types"
import { Button, Skeleton } from "@4cplatform/elements/Molecules"
import { formatLabelForTestID, nullFunc } from "@4cplatform/elements/Helpers"

// Helpers
import { getLinkAppearance } from "./tabs.helpers"

// Components
import { TabLink, Anchor, LoadingWrapper } from "./tabs.styles"

const Tab = ({
  isActive,
  onClick,
  type,
  header,
  activeAppearance,
  inactiveAppearance,
  isFirst,
  isLast,
  isPresent,
  isLoading,
  hasClickOverride,
  clickOverrideHandler
}) => {
  const tabID = formatLabelForTestID(header)
  const Link = type === "buttons" ? Button : Anchor

  if (!isPresent) return null

  if (isLoading) return <Skeleton wrapper={LoadingWrapper} />

  return (
    <TabLink
      type={type}
      isFirst={isFirst}
      isLast={isLast}
      isActive={isActive}
      onClick={() => {
        if (hasClickOverride && clickOverrideHandler) return clickOverrideHandler(tabID)
        onClick(tabID)
      }}
      data-testid={`tab-${tabID}`}
    >
      <Link
        type={type === "buttons" ? "button" : type}
        appearance={getLinkAppearance({ isActive, type, activeAppearance, inactiveAppearance })}
        name={tabID}
      >
        {header}
      </Link>
    </TabLink>
  )
}

Tab.defaultProps = {
  type: "anchors",
  activeAppearance: "primary",
  inactiveAppearance: "primaryGhost",
  isActive: false,
  isFirst: false,
  isLast: false,
  isPresent: true,
  isLoading: false,
  hasClickOverride: false,
  clickOverrideHandler: nullFunc
}

Tab.propTypes = {
  /**
   * A boolean that controls whether the Tab is active
   */
  isActive: PropTypes.bool,
  /**
   * The click handler for this Link
   */
  onClick: PropTypes.func,

  /**
   * Whether or not the Link should be displayed as a button or an anchor
   */
  type: PropTypes.string,
  /**
   * The text label for the link
   */
  header: PropTypes.string.isRequired,
  /**
   * If displaying the links as buttons, this is the active button appearance
   */
  activeAppearance: PropTypes.string,
  /**
   * If displaying the links as buttons, this is the inactive button appearance
   */
  inactiveAppearance: PropTypes.string,
  /**
   * Whether or not this element is the first element in the array
   */
  isFirst: PropTypes.bool,
  /**
   * Whether or not this element is the last element in the array
   */
  isLast: PropTypes.bool,
  /**
   * A boolean which determines whether or not to render this tab
   */
  isPresent: PropTypes.bool,
  /**
   * Loading state
   */
  isLoading: PropTypes.bool,
  /**
   * A boolean which determines whether the onClick should be overridden or not
   */
  hasClickOverride: PropTypes.bool,
  /**
   * Called if hasClickOverride is true and prevents onClick being called
   */
  clickOverrideHandler: PropTypes.func
}

export default Tab
