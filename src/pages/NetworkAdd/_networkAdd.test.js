/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers } from "../../UI/Helpers"

// Components
import NetworkAdd from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<NetworkAdd />", () => {
  test("All components present", async () => {
    const { getByText, queryAllByText } = await renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <NetworkAdd />
      </Providers>
    )
    // Check Breadcrumbs
    expect(getByText("Dashboard")).toBeInTheDocument()
    expect(queryAllByText("Networks").length).toBe(2)
    expect(queryAllByText("Add network").length).toBe(3)
    // Check field labels
    expect(getByText("Network name")).toBeInTheDocument()
    expect(getByText("Description")).toBeInTheDocument()
    expect(getByText("Postcode")).toBeInTheDocument()
    expect(getByText("Phone number")).toBeInTheDocument()
    expect(getByText("Registration number")).toBeInTheDocument()
    expect(getByText("FCA reference")).toBeInTheDocument()
    expect(getByText("Contact first name")).toBeInTheDocument()
    expect(getByText("Contact last name")).toBeInTheDocument()
    expect(getByText("Contact email")).toBeInTheDocument()
    // Check buttons
    expect(getByText("Create network")).toBeInTheDocument()
    expect(getByText("Cancel")).toBeInTheDocument()
  })
})
