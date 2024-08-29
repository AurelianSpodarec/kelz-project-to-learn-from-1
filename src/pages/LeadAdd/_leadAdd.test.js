/* eslint-disable react/prop-types */
import React from "react"
import MockAdapter from "axios-mock-adapter"
import "jest-styled-components"
import { api } from "@4cplatform/elements/Api/fetchData"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

// Helpers
import { Providers } from "../../UI/Helpers"

// Components
import LeadAdd from "."

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

describe("<LeadAdd />", () => {
  test("All components present", async () => {
    const { getByText, queryAllByText } = await renderWithTheme(
      <Providers mockAxios={mockAxios}>
        <LeadAdd />
      </Providers>
    )
    // Check Breadcrumbs
    expect(getByText("Dashboard")).toBeInTheDocument()
    expect(getByText("Leads")).toBeInTheDocument()
    expect(queryAllByText("Add lead").length).toBe(2)
    // Check field labels
    expect(getByText("Lead type")).toBeInTheDocument()
    expect(getByText("Lead source")).toBeInTheDocument()
    expect(getByText("Gender at birth")).toBeInTheDocument()
    expect(getByText("Title")).toBeInTheDocument()
    expect(getByText("First Name")).toBeInTheDocument()
    expect(getByText("Last Name")).toBeInTheDocument()
    expect(getByText("Email Address")).toBeInTheDocument()
    expect(getByText("Phone numbers")).toBeInTheDocument()
    expect(getByText("Date of birth")).toBeInTheDocument()
    // Check buttons
    expect(getByText("Create lead")).toBeInTheDocument()
    expect(getByText("Cancel")).toBeInTheDocument()
  })
})
