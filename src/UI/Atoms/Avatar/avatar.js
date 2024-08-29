import React from "react"
import PropTypes from "prop-types"
import { Skeleton } from "@4cplatform/elements/Molecules"

import { Wrapper, Initials } from "./avatar.styles"

const Avatar = ({ name, first, last, margin, size, isLoading }) => (
  <Wrapper data-testid={`${name && name}${name && "-"}avatar-wrapper`} margin={margin} size={size}>
    <Initials data-testid={`${name && name}${name && "-"}avatar-content`} size={size}>
      {!isLoading && (
        <>
          {first.charAt(0).toUpperCase()}
          {last.charAt(0).toUpperCase()}
        </>
      )}
      {isLoading && <Skeleton isCircular />}
    </Initials>
  </Wrapper>
)
Avatar.defaultProps = { name: null, margin: "0", size: "3rem", isLoading: false }

Avatar.propTypes = {
  /**
   * Name of the avatar, used for testing purposes.
   */
  name: PropTypes.string,
  /**
   * First name of person
   */
  first: PropTypes.string.isRequired,
  /**
   * Last name of person
   */
  last: PropTypes.string.isRequired,
  /**
   * Margin component
   */
  margin: PropTypes.string,
  /**
   * Size of container
   */
  size: PropTypes.string,
  /**
   * Loading bool
   */
  isLoading: PropTypes.bool
}

export default Avatar
