import React from "react"
import "jest-styled-components"

// Helpers
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { TranslationsProvider } from "@4cplatform/elements/Translations"

// Component
import Typeahead from "."

describe("<Typeahead />", () => {
  test("Basic styling and functionality", async () => {
    const TestComponent = props => {
      const [value, setValue] = React.useState("")
      return <Typeahead {...props} value={value} setValue={val => setValue(val)} />
    }
    const { queryByTestId, container } = renderWithTheme(<TestComponent name="test" />)

    // By default, dropdown should not be in the doc.
    expect(queryByTestId("test-typeahead-drop_wrapper")).toBe(null)
    expect(queryByTestId("test-typeahead-drop_overlay")).toBe(null)

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Error state from error prop", () => {
    const fieldName = "field_test"
    const error = "Error content example"
    const { container, getByTestId } = renderWithTheme(
      <TranslationsProvider>
        <Typeahead name={fieldName} error={error} />
      </TranslationsProvider>
    )

    expect(getByTestId("field_test-error-message").textContent.includes(error)).toBe(true)

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  test("Error state from 422 validation error", () => {
    const fieldName = "field_test"
    const apiErrors = { message: "VALIDATION_FAILED", validation: { field_test: ["NOT_UNIQUE"] } }
    const { container, getByTestId } = renderWithTheme(
      <TranslationsProvider>
        <Typeahead name={fieldName} apiErrors={apiErrors} />
      </TranslationsProvider>
    )

    expect(
      getByTestId("field_test-error-message").textContent.includes(apiErrors.validation.field_test)
    ).toBe(true)

    // Snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
