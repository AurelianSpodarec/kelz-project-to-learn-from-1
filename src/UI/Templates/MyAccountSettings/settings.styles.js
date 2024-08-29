import styled from "styled-components"
import { Row } from "@4cplatform/elements/Atoms"
import { get } from "lodash"

export const SettingsRow = styled(Row)`
  &:first-child {
    border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
  }
`
