import React from "react"
import { get } from "lodash"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { fakeOrganisationGetResponse } from "../../Helpers"

import ActivateOrganisation from "."

// eslint-disable-next-line react/prop-types
const TestComponent = ({ organisation }) => (
  <ActivateOrganisation selectedOrganisation={organisation} />
)

describe("<ActivateOrganisation />", () => {
  test("Basic components present and accounted for", async () => {
    const { getByTestId } = renderWithTheme(
      <TestComponent organisation={get(fakeOrganisationGetResponse, "data", [])} />
    )

    const activateBtn = getByTestId("activate-button")

    expect(activateBtn).toBeInTheDocument()
    expect(activateBtn).toHaveTextContent("Activate")
  })
})
