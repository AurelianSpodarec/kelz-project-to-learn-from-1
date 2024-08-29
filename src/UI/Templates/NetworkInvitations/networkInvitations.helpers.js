import * as yup from "yup"
import { isArray } from "lodash"

export const InviteOrganisationModel = yup.object({
  email_address: yup.string().email().nullable(),
  organisation_id: yup.number().nullable()
})

/**
 * This function handles the isDisabled prop in the Invite Org button
 * If both fields - email_address and organisation_id - are empty, disable the button.
 * Otherwise, enable it.
 * @param {*} values An object representing the values of the formik form
 * @returns Boolean
 */
export const disableButton = values => {
  const keys = Object.keys(values)
  return keys.reduce((acc, val) => {
    if (values[val]) return false
    return acc
  }, true)
}

/**
 * This formats the invitations array into the shape that the backend expects to receive
 * @param {*} invitations An array of invitations objects, built by the formik form
 * @returns An object with email addresses and organisation IDs for use by 4c-api
 */
export const formatInvitationsBody = (invitations = []) => {
  if (!isArray(invitations)) return null

  const body = {
    email_addresses: [],
    organisations: []
  }

  invitations.forEach(invite => {
    const { email_address: email, organisation_id: orgID } = invite
    if (email) {
      body.email_addresses = [...body.email_addresses, email]
    }
    if (orgID) {
      body.organisations = [...body.organisations, orgID]
    }
  })

  return body
}
