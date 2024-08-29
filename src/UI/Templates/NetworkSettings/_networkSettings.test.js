import React from "react"
import "jest-styled-components"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"
import { waitFor } from "@testing-library/react"

import NetworkSettings from "."
import TestNetworkSettingsProvider from "./story/networkSettings.story.provider"

// eslint-disable-next-line react/prop-types
const TestComponent = ({ value }) => (
  <TestNetworkSettingsProvider value={value}>
    <NetworkSettings />
  </TestNetworkSettingsProvider>
)

describe("<NetworkSettings />", () => {
  test("Basic components present and accounted for", async () => {
    const { getByText, getByTestId } = renderWithTheme(
      <TestComponent
        value={{
          consentText: "Test consent text",
          exclusionText: "Test exclusion text"
        }}
      />
    )
    expect(getByText("Test consent text")).toBeInTheDocument()
    expect(getByText("Test exclusion text")).toBeInTheDocument()
    expect(getByText("Consent Text")).toBeInTheDocument()
    expect(getByText("Exclusion Text")).toBeInTheDocument()
    expect(getByTestId("consent_text_edit-button")).toBeInTheDocument()
    expect(getByTestId("consent_text_delete-button")).toBeInTheDocument()
    expect(getByTestId("exclusion_text_edit-button")).toBeInTheDocument()
    expect(getByTestId("exclusion_text_delete-button")).toBeInTheDocument()
  })
  test("Delete consent button", async () => {
    const value = {
      consentText: "Test consent text",
      exclusionText: "Test exclusion text",
      setDeleteConsent: jest.fn(),
      onDeleteConsentText: jest.fn(),
      deleteConsent: true
    }
    const { getByTestId, getByText } = renderWithTheme(<TestComponent value={value} />)

    userEvent.click(getByTestId("consent_text_delete-button"))
    await waitFor(() => {
      expect(value.setDeleteConsent).toHaveBeenCalledTimes(1)
    })

    userEvent.click(getByText("Delete"))
    await waitFor(() => {
      expect(value.onDeleteConsentText).toHaveBeenCalledTimes(1)
    })
  })
  test("Delete exclusion button", async () => {
    const value = {
      consentText: "Test consent text",
      exclusionText: "Test exclusion text",
      setDeleteExclusion: jest.fn(),
      onDeleteExclusionText: jest.fn(),
      deleteExclusion: true
    }
    const { getByTestId, getByText } = renderWithTheme(<TestComponent value={value} />)

    userEvent.click(getByTestId("exclusion_text_delete-button"))
    await waitFor(() => {
      expect(value.setDeleteExclusion).toHaveBeenCalledTimes(1)
    })

    userEvent.click(getByText("Delete"))
    await waitFor(() => {
      expect(value.onDeleteExclusionText).toHaveBeenCalledTimes(1)
    })
  })
  test("Edit consent button", async () => {
    const value = {
      consentText: "Test consent text",
      exclusionText: "Test exclusion text",
      setEditConsent: jest.fn()
    }
    const { getByTestId } = renderWithTheme(<TestComponent value={value} />)

    userEvent.click(getByTestId("consent_text_edit-button"))
    await waitFor(() => {
      expect(value.setEditConsent).toHaveBeenCalledTimes(1)
    })
  })
  test("Edit exclusion button", async () => {
    const value = {
      consentText: "Test consent text",
      exclusionText: "Test exclusion text",
      setEditExclusion: jest.fn()
    }
    const { getByTestId } = renderWithTheme(<TestComponent value={value} />)

    userEvent.click(getByTestId("exclusion_text_edit-button"))
    await waitFor(() => {
      expect(value.setEditExclusion).toHaveBeenCalledTimes(1)
    })
  })
  test("Edit buttons state", async () => {
    const value = {
      consentText: "Test consent text",
      exclusionText: "Test exclusion text",
      setEditConsent: jest.fn(),
      editConsent: true
    }
    const { getByTestId } = renderWithTheme(<TestComponent value={value} />)

    await waitFor(() => {
      expect(getByTestId("consent_text_submit-button")).toBeInTheDocument()
      expect(getByTestId("consent_text_cancel-button")).toBeInTheDocument()
    })

    userEvent.click(getByTestId("consent_text_cancel-button"))
    await waitFor(() => {
      expect(value.setEditConsent).toHaveBeenCalledTimes(1)
    })
  })
})
