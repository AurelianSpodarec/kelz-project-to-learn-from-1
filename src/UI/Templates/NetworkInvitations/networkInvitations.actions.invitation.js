/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { useFormik } from "formik"
import { Modal, Button } from "@4cplatform/elements/Molecules"

// Helpers
import {
  InviteOrganisationModel as validationSchema,
  disableButton,
  formatInvitationsBody
} from "./networkInvitations.helpers"
import { NetworkInvitationsContext } from "./networkInvitations.context"

// Components
import { InviteOrganisationButtonsWrapper } from "./networkInvitations.styles"
import Form from "./networkInvitations.actions.invitation.form"
import InvitationsList from "./networkinvitations.actions.invitation.list"

const InviteOrganisation = ({ onClose }) => {
  const { onInviteOrganisation, organisations, inviteLoading, queryLoading, organisationsLoading } =
    React.useContext(NetworkInvitationsContext)
  const [invitations, setInvitations] = React.useState([])

  // Formik instance
  const inviteOrganisationFormik = useFormik({
    initialValues: {
      email_address: "",
      organisation_id: ""
    },
    validationSchema,
    onSubmit: (invite, { resetForm }) => {
      setInvitations([
        ...invitations,
        { ...invite, label: inviteOrganisationFormik.values.organisation_id }
      ])
      resetForm()
    }
  })

  const { handleSubmit: addInvitation } = inviteOrganisationFormik
  const formik = { ...inviteOrganisationFormik, validationSchema }
  const allInvites = [...invitations, get(formik, "values", {})]

  return (
    <Modal onClose={() => onClose()} title="Invite organisations" hasPadding={false}>
      {/* Invites list */}
      <InvitationsList invitations={invitations} />

      {/* Form */}
      <Form
        formik={formik}
        organisations={organisations}
        handleSubmit={addInvitation}
        isLoading={organisationsLoading}
      />

      {/* Form submission and cancel action buttons */}
      <InviteOrganisationButtonsWrapper>
        <Button
          name="send_invitation"
          appearance="success"
          trailingIcon="send"
          onClick={() => onInviteOrganisation(formatInvitationsBody(allInvites))}
          isDisabled={
            queryLoading || (disableButton(get(formik, "values", {})) && isEmpty(invitations))
          }
          isLoading={inviteLoading}
        >
          Send invitation
        </Button>
        <Button name="cancel" appearance="error" trailingIcon="cancel" onClick={() => onClose()}>
          Cancel
        </Button>
      </InviteOrganisationButtonsWrapper>
    </Modal>
  )
}

InviteOrganisation.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default InviteOrganisation
