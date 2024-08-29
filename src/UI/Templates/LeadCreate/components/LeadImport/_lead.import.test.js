/* eslint-disable react/prop-types */
import React from "react"
import "jest-styled-components"
import { waitFor } from "@testing-library/react"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import userEvent from "@testing-library/user-event"

// Component
import LeadImport from "."

// Helpers
import { Providers } from "../../../../Helpers"

const TestComponent = props => (
  <Providers>
    <LeadImport {...props} />
  </Providers>
)

describe("<LeadImport />", () => {
  test("Default view", () => {
    const { getByTestId } = renderWithTheme(<TestComponent />)
    const button = getByTestId("import_lead-button")

    expect(button).toBeInTheDocument()
  })
  test("File dialog open", () => {
    const { getByText, getByTestId, container } = renderWithTheme(<TestComponent isOpen />)

    expect(getByText("Import Leads")).toBeInTheDocument()
    expect(getByText("Selected File")).toBeInTheDocument()
    expect(getByText("No files have been selected")).toBeInTheDocument()

    expect(getByTestId("submit-button")).toBeInTheDocument()
    expect(getByTestId("cancel-button")).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
  test("Submit button", async () => {
    const mockOnSubmit = jest.fn()
    const { getByTestId } = renderWithTheme(<TestComponent isOpen onSubmit={mockOnSubmit} />)
    const submit = getByTestId("submit-button")

    userEvent.click(submit)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })
  test("Errors present", async () => {
    const mockOnSubmit = jest.fn()
    const { getByTestId, getByText } = renderWithTheme(
      <TestComponent
        isOpen
        onSubmit={mockOnSubmit}
        errors={["RECTANGULAR_EDGES", "INVALID_FILE"]}
      />
    )
    const retry = getByTestId("try_again-button")

    expect(retry).toBeInTheDocument()
    expect(getByText("RECTANGULAR_EDGES")).toBeInTheDocument()
    expect(getByText("INVALID_FILE")).toBeInTheDocument()

    userEvent.click(retry)
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })

  test("File format guidance modal", async () => {
    const { getByTestId, getByText } = renderWithTheme(<TestComponent isOpen />)

    const fileFormatModal = getByTestId("see_guidance_on_file_format-button")

    userEvent.click(fileFormatModal)

    await waitFor(() => {
      expect(getByTestId("allowable_file_format_modal-modal-wrapper")).toBeInTheDocument()
      getByText("File format guidelines")
      getByText("These are the supported constrained values for the lead import:")
      getByText("Lead type")
      getByText("PMI")
      getByText("First Name")
      getByText(
        "The first name must only allow alphabetical characters, single quote (') and the hyphen (-)"
      )
      getByText("Last Name")
      getByText(
        "The last name must only allow alphabetical characters, single quote (') and the hyphen (-)"
      )
      getByText("Email")
      getByText("Date of birth")
      getByText("Y-m-d")
      getByText("Phone number")
      getByText("Valid local or international UK phone number")
      getByText("Title")
      getByText(
        "MR, MRS, MISS, MS, DR, AVM, BGDR, BR, CAPT, CDR, CDRE, COL, COUNTESS, DAME, DUCHESS, DUKE, EARL, FATHER, HON, JUDGE, LADY, LORD, LTCDR, MAJGEN, MAJOR, PASTOR, PROF, RABBI, REARADM, REV, RTHON, RTREV, SHERIFF, SIR, WGCDR, OTHER"
      )
      getByText("Lead source")
      getByText("INTERNAL, EXTERNAL, REFER_FRIEND, REFER_STAFF, EXISTING_CLIENT")
      getByText("Gender at birth")
      getByText("male, female")
    })
  })
})
