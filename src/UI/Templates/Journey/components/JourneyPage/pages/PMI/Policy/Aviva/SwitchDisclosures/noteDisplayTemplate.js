import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { Collapse, Button } from "@4cplatform/elements/Molecules"
import { Icon } from "@4cplatform/elements/Atoms"
import { P, H4 } from "@4cplatform/elements/Typography"
import { get } from "lodash"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"

// Components
import { NotesHeaderWrapper, FlexRow, GreyLine } from "./switchDisclosures.styles"
import { DisclosureNotesContext } from "../../../../../../DisclosureNotes/disclosureNotes.context"

// eslint-disable-next-line arrow-body-style
const NoteDisplayTemplate = ({ note }) => {
  const { deleteLoading, setAddEditModal, noteToDelete, setConfirmationModal } =
    useContext(DisclosureNotesContext)

  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  const handleToggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen)
  }

  return (
    <Collapse
      wrapperBorderColour={colours.lightGrey}
      onClick={handleToggleCollapse}
      isOpenManual={isCollapseOpen}
      margin="1.5rem 0"
      headerContent={
        <NotesHeaderWrapper>
          <FlexRow>
            <Icon icon="account-alert" margin="0 1.5rem 0 0" colour={colours.blue} />
            <H4 margin="0">{`${note.journey_applicant.first_name} ${note.journey_applicant.last_name}`}</H4>
          </FlexRow>
          <FlexRow>
            <Button
              name="delete_disclousure_note"
              leadingIcon="trash-can"
              type="inline-button"
              isLoading={deleteLoading && noteToDelete.id === note.id}
              appearance="errorInline"
              onClick={e => {
                e.stopPropagation()
                setConfirmationModal({
                  warningText: "Are you sure you want to delete this note?",
                  isOpen: true,
                  fieldName: note.field,
                  query: "deleteOneNote",
                  noteId: note.id,
                  closedSelected: false,
                  confirmedSelected: false
                })
              }}
            />
            <Button
              name="edit_disclousure_note"
              leadingIcon="clipboard-edit-outline"
              type="inline-button"
              onClick={e => {
                e.stopPropagation()
                setAddEditModal({
                  type: "edit",
                  isOpen: true,
                  field: get(note, "field", ""),
                  noteInitialValues: {
                    id: get(note, "id", ""),
                    conditions_or_symptoms: get(note, "conditions_or_symptoms", ""),
                    date_of_consultation: get(note, "date_of_consultation", ""),
                    date_of_last_symptom_or_treatment: get(
                      note,
                      "date_of_last_symptom_or_treatment",
                      ""
                    ),
                    field: get(note, "field", ""),
                    foreseeable_consultation_or_treatment: get(
                      note,
                      "foreseeable_consultation_or_treatment",
                      ""
                    ),
                    journey_applicant_id: get(note, "journey_applicant.id", ""),
                    present_state_of_health: get(note, "present_state_of_health", ""),
                    product_name: get(note, "product_name", ""),
                    treatment_received: get(note, "treatment_received", "")
                  }
                })
              }}
            />
            <Icon
              icon={isCollapseOpen ? "chevron-up" : "chevron-down"}
              margin="0 0 0 1.5rem"
              colour={colours.blue}
            />
          </FlexRow>
        </NotesHeaderWrapper>
      }
      bodyContent={
        <>
          <FlexRow>
            <H4 width="100%">Condition/Symptoms: </H4>
            <GreyLine />
            <P style={{ minWidth: "16rem" }}>{note.conditions_or_symptoms}</P>
          </FlexRow>
          <FlexRow>
            <H4 width="100%">Start date of consultation: </H4>
            <GreyLine />
            <P style={{ minWidth: "16rem" }}>
              {moment(note.date_of_consultation).format("DD/MM/YYYY HH:mm")}
            </P>
          </FlexRow>
          <FlexRow>
            <H4 width="100%">Date of last symptoms/treatment: </H4>
            <GreyLine />
            <P style={{ minWidth: "16rem" }}>
              {moment(note.date_of_last_symptom_or_treatment).format("DD/MM/YYYY HH:mm")}
            </P>
          </FlexRow>
          <FlexRow>
            <H4 width="100%">Treatment received: </H4>
            <GreyLine />
            <P style={{ minWidth: "16rem" }}>{note.treatment_received}</P>
          </FlexRow>
          <FlexRow>
            <H4 width="100%">Present state of health: </H4>
            <GreyLine />
            <P style={{ minWidth: "16rem" }}>{note.present_state_of_health}</P>
          </FlexRow>
          <FlexRow>
            <H4 width="100%">Further consultation needed?: </H4>
            <GreyLine />
            <P style={{ minWidth: "16rem" }}>
              {note.foreseeable_consultation_or_treatment ? "Yes" : "No"}
            </P>
          </FlexRow>
        </>
      }
    />
  )
}

NoteDisplayTemplate.defaultProps = {
  note: {}
}

NoteDisplayTemplate.propTypes = {
  note: PropTypes.object
}

export default NoteDisplayTemplate
