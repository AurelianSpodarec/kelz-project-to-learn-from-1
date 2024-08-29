import styled from "styled-components"
import { get } from "lodash"
import { tint } from "polished"
import { Label } from "@4cplatform/elements/Typography"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`

export const EditorWrapper = styled.div`
  width: ${({ width }) => width};
  flex-direction: column;
  display: flex;
`

export const LabelWrapper = styled.div`
  margin: 0 0 1rem;
`

export const StyledLabel = styled(Label)`
  font-size: 1.6rem;
  max-width: calc(100% - 5rem);
  text-align: left;
  line-height: 2rem;
  color: ${({ theme, isDisabled, hasError, appearance }) => {
    if (hasError) return get(theme, "red")
    if (isDisabled) return get(theme, "tints.secondary.darkBlue.t70")
    if (appearance === "light") return get(theme, "white")
    return theme.tints.secondary.darkBlue.t20
  }};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};

  /* Required asterisk */
  sup {
    visibility: ${({ isRequired }) => (isRequired ? "visible" : "hidden")};
    padding-left: 0.2rem;
    color: ${({ theme, isDisabled }) => (isDisabled ? tint(0.7, theme.red) : theme.red)};
  }
`
