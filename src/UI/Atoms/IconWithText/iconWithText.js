import React from "react"
import PropTypes from "prop-types"
import { Icon } from "@4cplatform/elements/Atoms"
import { Skeleton } from "@4cplatform/elements/Molecules"

// Components
import { Wrapper, IconWrapper, Text } from "./iconWithText.styles"

// Helpers
import { getIconColour } from "./iconWithText.helpers"

const IconWithText = ({
  appearance,
  iconSize,
  icon,
  content,
  fontSize,
  fontColour,
  children,
  margin,
  iconColour,
  iconSpacing,
  loadingWidth,
  isLoading,
  iconBackgroundColour
}) => (
  <Wrapper margin={margin} appearance={appearance}>
    <IconWrapper iconSpacing={iconSpacing} iconBackgroundColour={iconBackgroundColour}>
      {/* If the component is loading, display the skeleton */}
      <Icon
        icon={icon}
        size={iconSize}
        colour={getIconColour({ appearance, iconColour })}
        isLoading={isLoading}
        appearance={appearance}
      />
    </IconWrapper>
    {!children && (
      <Text
        fontSize={fontSize}
        fontColour={fontColour}
        isLoading={isLoading}
        loadingWidth={loadingWidth}
      >
        {isLoading && <Skeleton />}
        {!isLoading && <>{content}</>}
      </Text>
    )}
    {!!children && (
      <>
        {!isLoading && children}
        {isLoading && (
          <Text isLoading={isLoading} loadingWidth={loadingWidth}>
            <Skeleton />
          </Text>
        )}
      </>
    )}
  </Wrapper>
)

IconWithText.defaultProps = {
  appearance: "dark",
  iconSize: "2rem",
  icon: "view-dashboard",
  content: "",
  fontSize: "1.6rem",
  children: null,
  margin: "0 0 2rem",
  iconColour: null,
  iconSpacing: "1rem",
  isLoading: false,
  loadingWidth: "20rem",
  fontColour: null,
  iconBackgroundColour: null
}

IconWithText.propTypes = {
  /**
   * Whether or not the component is presented in light or dark mode
   */
  appearance: PropTypes.oneOf(["light", "dark"]),
  /**
   * The size prop passed to the icon
   */
  iconSize: PropTypes.string,
  /**
   * The icon prop passed to the icon
   */
  icon: PropTypes.string,
  /**
   * The text content
   */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The font-size property passed to the content
   */
  fontSize: PropTypes.string,
  /**
   * The children - if passed, this will render instead of the content prop
   */
  children: PropTypes.any,
  /**
   * The margin prop passed to the outer wrapper
   */
  margin: PropTypes.string,
  /**
   * The colour of the icon - it left blank, that color will be based on the appearance prop
   */
  iconColour: PropTypes.string,
  /**
   * The space between the icon and the text, applied as a margin-right on the icon's wrapper
   */
  iconSpacing: PropTypes.string,
  loadingWidth: PropTypes.string,
  isLoading: PropTypes.bool,
  fontColour: PropTypes.string,
  iconBackgroundColour: PropTypes.string
}

export default IconWithText
