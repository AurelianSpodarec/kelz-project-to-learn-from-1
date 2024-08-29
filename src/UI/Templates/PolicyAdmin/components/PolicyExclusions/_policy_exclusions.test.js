import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { within, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { api } from "@4cplatform/elements/Api/fetchData"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { Providers } from "../../../../Helpers"

// Component
import PolicyExclusions from "."
import TestPoliciesProvider from "../../story/policies.story.provider"

// eslint-disable-next-line react/prop-types
const TestComponent = ({ value = {}, ...props }) => (
  <Providers>
    <TestPoliciesProvider value={value}>
      <PolicyExclusions {...props} />
    </TestPoliciesProvider>
  </Providers>
)

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<PolicyExclusions />", () => {
  test("Basic appearance and styles for Policy Exclusions Modal", async () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    userEvent.click(getByTestId("edit_policy_exclusions-button"))
    await waitFor(() => {
      const modal = getByTestId("modal-modal-wrapper")
      expect(within(modal).getByText("Policy exclusions")).toBeInTheDocument()
      expect(getByTestId("applicant_name-select")).toBeInTheDocument()
      expect(getByTestId("exclusion-textarea")).toBeInTheDocument()
    })
  })
  test("Add exclusion", async () => {
    const onCreateExclusion = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent value={{ onCreateExclusion }} />
    )
    userEvent.click(getByTestId("edit_policy_exclusions-button"))
    const nameQuery = getByTestId("applicant_name-select")
    const exclusionText = getByTestId("exclusion-textarea")
    fireEvent.change(nameQuery, { target: { value: "Joe Bloggs" } })
    fireEvent.change(exclusionText, { target: { value: "test exclusion description" } })
    const addButton = getByTestId("add_policy_exclusion-button")
    userEvent.click(addButton)
    await waitFor(() => {
      expect(getByText("test exclusion description")).toBeInTheDocument()
      expect(onCreateExclusion).toHaveBeenCalledTimes(1)
    })
  })
})
