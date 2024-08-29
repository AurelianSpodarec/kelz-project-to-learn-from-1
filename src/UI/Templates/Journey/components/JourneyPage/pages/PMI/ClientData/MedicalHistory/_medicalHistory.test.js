import React from "react"
import "jest-styled-components"
import { waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { get } from "lodash"
import MockAdapter from "axios-mock-adapter"
import { Container } from "@4cplatform/elements/Atoms"
import { renderWithTheme } from "@4cplatform/elements/Helpers"
import { api } from "@4cplatform/elements/Api/fetchData"

// Components
import Journey from "../../../../../../journey"
import StoryJourneyProvider from "../../../../../../story/journey.story.provider"

// Helpers
import {
  Providers,
  fakeApiUrl,
  fakeMedicalHistoryGetResponse,
  fakeMedicalHistoryApplicantsResponse,
  fakeMedicalHistoryNotesGetResponse
} from "../../../../../../../../Helpers"

// Axios Mock adapter
let mockAxios

beforeEach(() => {
  mockAxios = new MockAdapter(api)
})

afterEach(() => {
  mockAxios.restore()
  jest.resetAllMocks()
})

const TestComponent = props => (
  <Providers>
    <StoryJourneyProvider response={get(fakeMedicalHistoryGetResponse, "data", {})} {...props}>
      <Container style={{ position: "static" }}>
        <Journey {...props} />
      </Container>
    </StoryJourneyProvider>
  </Providers>
)

jest.mock("moment", () => {
  const moment = jest.requireActual("moment")
  return moment
})

describe("Medical history details", () => {
  test("Basic components and page rendered from config", () => {
    // Render
    const { container, getAllByText, getByText, getByTestId } = renderWithTheme(
      <TestComponent value={{ notes: [{ test: "one" }] }} />
    )

    // Assert
    expect(getAllByText("Medical history").length).toBe(2)
    expect(
      getByText(
        "In order to determine the best advice for the client it is important to ask the following questions:"
      )
    ).toBeInTheDocument()
    expect(
      getByTestId(
        "anyone_had_consultations_tests_therapies_or_treatment_last_twelve_months-toggle-options"
      )
    ).toBeInTheDocument()
    expect(
      getByTestId(
        "anyone_had_consultations_tests_medication_or_treatment_last_five_years-toggle-options"
      )
    ).toBeInTheDocument()
    expect(
      getByTestId(
        "anyone_had_treatment_for_cancer_heart_disease_psychiatric_orthopaedic_last_five_years-toggle-options"
      )
    ).toBeInTheDocument()
    expect(
      getByTestId("any_appointments_planned_or_pending_in_the_future-toggle-options")
    ).toBeInTheDocument()

    // Snapshot
    expect(container).toMatchSnapshot()
  })

  test("Medical notes", async () => {
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/medical-notes`
      )
      .replyOnce(200, fakeMedicalHistoryNotesGetResponse)

    const [{ note, updated_at: updatedAt }] = fakeMedicalHistoryNotesGetResponse.data

    // Render
    const { getByText } = renderWithTheme(<TestComponent />)

    expect(getByText("No notes exist")).toBeInTheDocument()

    await waitFor(() => {
      expect(() => getByText("No notes exist")).toThrowError()
    })

    expect(getByText(note)).toBeInTheDocument()
    const [date, time] = updatedAt.split("T")
    const [year, month, day] = date.split("-")
    const [hour, minutes] = time.split(":")
    expect(getByText(`- ${day}/${month}/${year} ${hour}:${minutes}`)).toBeInTheDocument()
  })

  test("Edit note", async () => {
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/medical-notes`
      )
      .replyOnce(200, fakeMedicalHistoryNotesGetResponse)
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/applicants`
      )
      .replyOnce(200, fakeMedicalHistoryApplicantsResponse)

    const [{ id, journey_applicant_id: journeyApplicantId }] =
      fakeMedicalHistoryNotesGetResponse.data
    const [{ id: applicantId }] = fakeMedicalHistoryApplicantsResponse.data

    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    expect(getByText("No notes exist")).toBeInTheDocument()

    await waitFor(() => {
      expect(() => getByText("No notes exist")).toThrowError()
    })

    const editButton = getByTestId(`${journeyApplicantId}-${id}_edit-button`)
    userEvent.click(editButton)
    await waitFor(() => {
      expect(getByTestId("0-0_submit-button")).toBeInTheDocument()
    })

    const selectField = getByTestId("journey_applicant_id-select")
    expect(selectField.value).toBe(applicantId.toString())
  })

  test("Editing note", async () => {
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/medical-notes`
      )
      .replyOnce(200, fakeMedicalHistoryNotesGetResponse)

    // Render
    const { getByTestId, getByText } = renderWithTheme(<TestComponent />)

    expect(getByTestId("add_new_note-button")).toBeInTheDocument()

    await waitFor(() => {
      expect(() => getByText("No notes exist")).toThrowError()
    })

    const editButton = getByTestId("0-0_edit-button")
    userEvent.click(editButton)
    await waitFor(() => {
      expect(getByTestId("note-textarea")).toBeInTheDocument()
      expect(() => getByTestId("add_new_note-button")).toThrowError()
    })
  })

  test("Unsaved edit changes", async () => {
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/medical-notes`
      )
      .replyOnce(200, fakeMedicalHistoryNotesGetResponse)
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/applicants`
      )
      .replyOnce(200, fakeMedicalHistoryApplicantsResponse)

    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    expect(getByText("No notes exist")).toBeInTheDocument()

    await waitFor(() => {
      expect(() => getByText("No notes exist")).toThrowError()
    })

    const editButton = getByTestId("0-0_edit-button")
    userEvent.click(editButton)
    await waitFor(() => {
      expect(getByTestId("note-textarea")).toBeInTheDocument()
    })

    const noteTextareaField = getByTestId("note-textarea")
    fireEvent.change(noteTextareaField, { target: { value: "" } })
    await waitFor(() => {
      expect(noteTextareaField.value).toBe("")
    })

    const cancelEditButton = getByTestId("0-0_cancel-button")
    userEvent.click(cancelEditButton)
    await waitFor(() => {
      expect(getByText("Are you sure you want to lose unsaved changes?")).toBeInTheDocument()
    })

    const cancelModalButton = getByTestId(
      "save_changes_for_note_modal_confirmation_modal_cancel-button"
    )
    userEvent.click(cancelModalButton)
    await waitFor(() => {
      expect(() => getByText("Are you sure you want to lose unsaved changes?")).toThrowError()
    })

    expect(noteTextareaField).toBeInTheDocument()
    expect(noteTextareaField.value).toBe("")
  })

  test("Unsaved Add Note form changes", async () => {
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/medical-notes`
      )
      .replyOnce(200, fakeMedicalHistoryNotesGetResponse)
    mockAxios
      .onGet(
        `${fakeApiUrl}/journeys/${get(
          fakeMedicalHistoryGetResponse,
          "data.journey.slug"
        )}/applicants`
      )
      .replyOnce(200, fakeMedicalHistoryApplicantsResponse)

    // Render
    const { getByText, getByTestId } = renderWithTheme(<TestComponent />)

    await waitFor(() => {
      expect(() => getByText("No notes exist")).toThrowError()
    })

    const addButton = getByTestId("add_new_note-button")
    userEvent.click(addButton)
    await waitFor(() => {
      expect(getByTestId("condition-input")).toBeInTheDocument()
    })

    // The close button on the Add Note Modal should not be present
    expect(() => getByTestId("add_note_modal-modal-close")).toThrowError()

    const noteMedicalConditionField = getByTestId("condition-input")
    fireEvent.change(noteMedicalConditionField, { target: { value: "Example" } })
    await waitFor(() => {
      expect(noteMedicalConditionField.value).toBe("Example")
    })

    const cancelAddButton = getByTestId("cancel-button")
    userEvent.click(cancelAddButton)
    await waitFor(() => {
      expect(getByText("Are you sure you want to lose unsaved changes?")).toBeInTheDocument()
    })

    const cancelModalButton = getByTestId(
      "save_changes_for_note_modal_confirmation_modal_confirm-button"
    )
    userEvent.click(cancelModalButton)
    await waitFor(() => {
      expect(() => getByText("Are you sure you want to lose unsaved changes?")).toThrowError()
    })

    expect(() => getByTestId("condition-input")).toThrowError()
  })
})
