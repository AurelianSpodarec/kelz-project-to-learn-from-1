/* eslint-disable import/no-unresolved */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import moment from "moment"
import { useFormik } from "formik"
import * as yup from "yup"
import { v4 as uuid } from "uuid"
import { Input } from "@4cplatform/elements/Forms"
import { nullFunc } from "@4cplatform/elements/Helpers"
import { Skeleton, Button } from "@4cplatform/elements/Molecules"

// Components
import {
  Wrapper,
  NotesWrapper,
  InputWrapper,
  MessageWrapper,
  Message,
  MessageLoading,
  MessageNoNotes,
  Content,
  Timestamp,
  UnderWrapper,
  UnderWrapperLoading,
  HeaderWrapper,
  HeaderText,
  NotesFooterWrapper,
  NotesButtonsWrapper
} from "./notes.styles"

import { Avatar } from "../../Atoms"

const Notes = ({ onAddNote, onAddNoteCancel, notes, isLoading, hasHeader, width, isNoteTab }) => {
  const validationSchema = yup.object({
    note: yup.string().required()
  })

  const formik = useFormik({
    initialValues: {
      note: ""
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { note } = values
      onAddNote(note)
      resetForm()
    }
  })
  const enhancedFormik = { ...formik, validationSchema }

  return (
    <Wrapper data-testid="test-notes" width={width} isNoteTab={isNoteTab}>
      {hasHeader && (
        <HeaderWrapper data-testid="test-notes-input-header-wrapper">
          <HeaderText data-testid="test-notes-input-header-text">Notes</HeaderText>
        </HeaderWrapper>
      )}
      <NotesWrapper data-testid="test-notes-wrapper" isNoteTab={isNoteTab}>
        {notes.map(note => (
          <MessageWrapper data-testid="test-notes-message-wrapper" key={get(note, "id", uuid())}>
            <Message data-testid="test-notes-message" isNoteTab={isNoteTab}>
              <Content data-testid="test-notes-content">
                {get(note, "note", get(note, "body", ""))}
              </Content>
            </Message>
            <Timestamp data-testid="test-notes-timestamp" isNoteTab={isNoteTab}>
              {moment(get(note, "created_at", ""), "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")}
            </Timestamp>
            <UnderWrapper data-testid="test-notes-under-wrapper" isNoteTab={isNoteTab}>
              {get(note, "user.first_name", "")} {get(note, "user.last_name", "")}
              <Avatar
                first={get(note, "user.first_name", "")}
                last={get(note, "user.last_name", "")}
                margin="0 0 0 0.5rem"
              />
            </UnderWrapper>
          </MessageWrapper>
        ))}
        {notes.length === 0 && !isLoading && <MessageNoNotes>No notes to display</MessageNoNotes>}
        {/* Loading state */}
        {isLoading && (
          <MessageWrapper data-testid="notes-loading_wrapper">
            <Skeleton wrapper={MessageLoading} />
            <UnderWrapper data-testid="test-notes-under-wrapper">
              <Skeleton wrapper={UnderWrapperLoading} />
              <Avatar first="Loading" last="State" margin="0 0.5rem 0 0" isLoading />
            </UnderWrapper>
          </MessageWrapper>
        )}
      </NotesWrapper>
      {!isNoteTab && (
        <NotesFooterWrapper data-testid="test-notes-footer-wrapper">
          <InputWrapper data-testid="test-notes-input-wrapper">
            <form autoComplete="off" margin="0" noValidate onSubmit={enhancedFormik.handleSubmit}>
              <Input
                name="note"
                formik={enhancedFormik}
                placeholder="Write your note"
                margin="0"
                isDisabled={isLoading}
              />
            </form>
          </InputWrapper>

          <NotesButtonsWrapper data-testid="test-notes-buttons-wrapper">
            <Button
              name="add_new_note"
              trailingIcon="message-plus"
              onClick={formik.handleSubmit}
              isDisabled={isLoading || !enhancedFormik.values?.note}
            >
              Add Note
            </Button>
            {onAddNoteCancel !== null && (
              <Button
                name="cancel_note"
                trailingIcon="cancel"
                appearance="error"
                onClick={onAddNoteCancel}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </NotesButtonsWrapper>
        </NotesFooterWrapper>
      )}
    </Wrapper>
  )
}

Notes.defaultProps = {
  onAddNote: nullFunc,
  onAddNoteCancel: null,
  notes: [],
  isLoading: false,
  hasHeader: true,
  width: "54.1rem",
  isNoteTab: false
}

Notes.propTypes = {
  onAddNote: PropTypes.func,
  onAddNoteCancel: PropTypes.func,
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  hasHeader: PropTypes.bool,
  width: PropTypes.string,
  isNoteTab: PropTypes.bool
}

export default Notes
