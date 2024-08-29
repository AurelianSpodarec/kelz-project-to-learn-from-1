import React from "react"
import PropTypes from "prop-types"
import { Skeleton } from "@4cplatform/elements/Molecules"

// Components
import { Wrapper, StyledLabel, TextWrapper, Text, LoadingWrapper } from "./labelWithText.styles"

const LabelWithText = ({
  label,
  content,
  margin,
  indent,
  textSize,
  appearance,
  children,
  labelWeight,
  labelSize,
  isLoading,
  loadingLines,
  loadingWidth,
  colour,
  name
}) => (
  <Wrapper margin={margin} appearance={appearance}>
    <StyledLabel
      appearance={appearance}
      fontSize={labelSize || textSize}
      labelWeight={labelWeight}
      isLoading={isLoading}
      labelColour={colour}
      name={name}
    >
      {label}
    </StyledLabel>
    <TextWrapper indent={indent}>
      {/* If the component is loading, display the skeleton */}
      {isLoading && (
        <Text fontSize={textSize} isLoading={isLoading} loadingWidth={loadingWidth}>
          <Skeleton count={loadingLines} wrapper={LoadingWrapper} borderRadius="0.7rem" />
        </Text>
      )}
      {/* If no children are present, render content */}
      {!children && !isLoading && (
        <Text fontSize={textSize} colour={colour}>
          <>{content}</>
        </Text>
      )}
      {/* If children are present, ignore content and render children. */}
      {!!children && !isLoading && children}
    </TextWrapper>
  </Wrapper>
)

LabelWithText.defaultProps = {
  appearance: "dark",
  content: "",
  textSize: "1.6rem",
  children: null,
  indent: "1rem",
  margin: "0 0 2rem",
  labelWeight: "bold",
  labelSize: null,
  isLoading: false,
  loadingLines: 1,
  loadingWidth: "30rem",
  colour: null,
  name: "label_with_text"
}

LabelWithText.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string,
  margin: PropTypes.string,
  indent: PropTypes.string,
  textSize: PropTypes.string,
  appearance: PropTypes.oneOf(["light", "dark"]),
  children: PropTypes.any,
  labelWeight: PropTypes.string,
  labelSize: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingLines: PropTypes.number,
  loadingWidth: PropTypes.string,
  colour: PropTypes.string,
  name: PropTypes.string
}

export default LabelWithText
