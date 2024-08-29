/* eslint-disable react/destructuring-assignment */
import React, { useContext } from "react"
import { v4 as uuid } from "uuid"
import { get, isEmpty, find } from "lodash"
import PropTypes from "prop-types"
import styled from "styled-components"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"

import { Button } from "@4cplatform/elements/Molecules"
import { Container } from "@4cplatform/elements/Atoms"

import { DisclosureNotesContext } from "./disclosureNotes.context"

export const Circle = styled.div`
  background: ${({ theme }) => get(theme, "blue", "blue")};
  position: absolute;
  border-radius: 50%;
  left: -4px;
  bottom: -8px;
  width: 8px;
  height: 8px;
`

const Notes = props => {
  const { disclosureNotes, setAddEditModal } = useContext(DisclosureNotesContext)
  if (isEmpty(disclosureNotes)) return ""
  const NoteDisplayComponent = get(props, "noteDisplayTemplate", "")

  if (find(disclosureNotes, note => note.field === props.fieldName)) {
    return (
      <Container
        margin="0 0 3rem 0"
        padding="1rem 1rem 0rem 1rem"
        style={{ borderLeft: `1px solid ${colours.blue}`, position: "relative" }}
      >
        {disclosureNotes.map(note => {
          if (note.field === props.fieldName) {
            return <NoteDisplayComponent key={uuid()} name={props.fieldName} note={note} />
          }
          return null
        })}
        <Button
          name="add_new"
          leadingIcon="plus"
          iconSize="1rem"
          type="inline-button"
          margin="1rem 0 0 0"
          onClick={() =>
            setAddEditModal({
              type: "new",
              isOpen: true,
              field: props.fieldName,
              noteInitialValues: {}
            })
          }
        >
          Add another disclosure note
        </Button>

        <Circle />
      </Container>
    )
  }
  return ""
}

export default Notes

Notes.defaultProps = {
  fieldName: ""
}

Notes.propTypes = {
  fieldName: PropTypes.string
}
