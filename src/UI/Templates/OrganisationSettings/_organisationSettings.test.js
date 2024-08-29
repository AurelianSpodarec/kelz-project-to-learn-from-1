import React, { useEffect } from "react"
import "jest-styled-components"
import userEvent from "@testing-library/user-event"
import { waitFor, fireEvent } from "@testing-library/react"
import { omit } from "lodash"
import { useFormik } from "formik"
import { string, object } from "yup"
import { renderWithTheme } from "@4cplatform/elements/Helpers"

import OrganisationSettings from "."
import TestOrganisationSettingsProvider from "./story/organisationSettings.story.provider"

// Helpers
import { fakeOrganisationQQSettingsGetResponse, renderWithMockedRouter } from "../../Helpers"

// eslint-disable-next-line react/prop-types
const TestComponent = ({ value }) => (
  <TestOrganisationSettingsProvider value={value}>
    <OrganisationSettings />
  </TestOrganisationSettingsProvider>
)

describe("<OrganisationSettings />", () => {
  test("Sales Preferences", async () => {
    // Render
    const { container, getByText } = renderWithMockedRouter(() => <TestComponent />, {
      path: "/organisations/organisation-1",
      route: "/organisations/organisation-1?manage=settings&settings=sales_preferences"
    })

    // Assert
    getByText("Lead data")
    getByText(/As a 4C Platform user, you will have the option to purchase sales leads./)

    getByText("Do you currently buy sales leads?")

    getByText("Product sold")
    getByText(
      "Of the options below, please let us know what types of insurance your organisation sells:"
    )

    getByText("Critical illness cover")
    getByText("General insurance")
    getByText("Income protection insurance")
    getByText("Investments")
    getByText("Life insurance")
    getByText("Mortgages")
    getByText("Pensions")
    getByText("Group private medical insurance")
    getByText("Individual private medical insurance")

    // Snapshot
    expect(container).toMatchSnapshot()
  })

  test("Client Journey", async () => {
    // Render
    const { container, getByText, getByTestId } = renderWithMockedRouter(() => <TestComponent />, {
      path: "/organisations/organisation-1",
      route: "/organisations/organisation-1?manage=settings&settings=client_journey"
    })

    // Assert
    getByText("Consent Text")
    getByText("Exclusion Text")
    getByText("Selling Options")

    getByText("Some consent text here")
    getByText("Some exclusion text here")
    getByText("Skip affordable budget fact-find")

    getByTestId("consent_text_edit-button")
    getByTestId("exclusion_text_edit-button")

    getByTestId("revert_consent_text-button")
    getByTestId("revert_exclusion_text-button")

    // Snapshot
    expect(container).toMatchSnapshot()
  })

  test("Editing Client Journey", async () => {
    const test = jest.fn()
    // Render
    const { getByTestId } = renderWithMockedRouter(
      () => <TestComponent value={{ onJourneyUpdate: test }} />,
      {
        path: "/organisations/organisation-1",
        route: "/organisations/organisation-1?manage=settings&settings=client_journey"
      }
    )

    const editConsentTextButton = getByTestId("consent_text_edit-button")
    userEvent.click(editConsentTextButton)

    await waitFor(() => {
      expect(getByTestId("consent_text-editor-label_wrapper")).toBeInTheDocument()
    })

    const submitEditConsentTextButton = getByTestId("consent_text_submit-button")
    userEvent.click(submitEditConsentTextButton)

    await waitFor(() => {
      expect(test).toHaveBeenCalled()
    })
  })

  test("Quick Quote", async () => {
    // Render
    const { container, getByText, getAllByText, getByTestId } = renderWithMockedRouter(
      () => <TestComponent />,
      {
        path: "/organisations/organisation-1",
        route: "/organisations/organisation-1?manage=settings&settings=quick_quote"
      }
    )

    // Assert
    getByText("Basic Policy")
    getByText("Standard Policy")
    getByText("Comprehensive Policy")

    expect(getAllByText("Excess").length).toBe(3)
    expect(getAllByText("Hospital list").length).toBe(3)
    expect(getAllByText("Outpatient limit").length).toBe(3)
    expect(getAllByText("Underwriting").length).toBe(3)

    getByTestId("basic_edit_button-button")
    getByTestId("standard_edit_button-button")
    getByTestId("comprehensive_edit_button-button")

    // Snapshot
    expect(container).toMatchSnapshot()
  })

  test("Editing Quick Quote", async () => {
    const test = jest.fn()
    let values

    const EditTestComponent = () => {
      const formFields = omit(fakeOrganisationQQSettingsGetResponse.data, [
        "id",
        "available_options"
      ])

      const validationSchema = (() => {
        const schema = {}
        Object.keys(formFields).forEach(
          key => (schema[key] = string().required("MISSING_REQUIRED_FIELD"))
        )
        return object(schema)
      })()

      const quickQuoteSettingsFormik = useFormik({
        enableReinitialize: true,
        initialValues: formFields,
        validationSchema,
        onSubmit: () => {}
      })

      const formik = { ...quickQuoteSettingsFormik, validationSchema }

      useEffect(() => {
        values = formik.values
      }, [formik.values])

      return <TestComponent value={{ formik, handleSubmit: test }} />
    }

    // Render
    const { getByTestId } = renderWithTheme(<EditTestComponent />)

    // Setup
    const [quickQuotesLink] = getByTestId("tab-quick_quote").children
    userEvent.click(quickQuotesLink)
    await waitFor(() => {
      expect(getByTestId("heading_2-helper_text-container").firstChild.textContent).toBe(
        "Quick Quote"
      )
    })

    const editBasicButton = getByTestId("basic_edit_button-button")
    userEvent.click(editBasicButton)
    await waitFor(() => {
      expect(getByTestId("basic_excess-select")).toBeInTheDocument()
    })

    // Update
    const excessSelectField = getByTestId("basic_excess-select")
    fireEvent.change(excessSelectField, { target: { value: "GLOBAL_EXCESS_100" } })
    await waitFor(() => {
      expect(excessSelectField.value).toBe("GLOBAL_EXCESS_100")
    })

    // Assert
    const submitButton = getByTestId("basic_save_button-button")
    userEvent.click(submitButton)
    // Form should submit without erroring
    await waitFor(() => {
      expect(test).toHaveBeenCalled()
    })

    // Values to be logged after user changes
    expect(values.basic_excess).toBe("GLOBAL_EXCESS_100")
  })
})
