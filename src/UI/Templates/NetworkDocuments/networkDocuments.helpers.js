import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { object, number, string, array, boolean } from "yup"

/**
 * A simple function which pluralises the noun "Organisation" if there is more than one
 * @param {*} data
 * @returns
 */
export const getOrganisationAccess = data => {
  const count = get(data, "shared_with_count")
  if (count === 1) {
    return `${count} Organisation`
  }
  return `${count} Organisations`
}

/**
 * Format the body for uploading new documents
 * @param {*} param0
 * @returns
 */
export const formatDocumentUploadBody = ({ values, list }) => {
  const isSharedToAll = get(values, "share_to_all")
  // Prepare file for submission
  const file = get(values, "file[0]", null)
  const body = new FormData()
  body.append("file", file, file.name)
  body.append(
    "share_with",
    isSharedToAll ? "[]" : JSON.stringify(list.map(item => item.organisation_id))
  )
  body.append("name", get(values, "name", ""))
  body.append("share_to_all", isSharedToAll)
  body.append("display_point", get(values, "display_point", ""))

  return body
}

/**
 * Format the body for editing a document
 * @param {*} param0
 * @returns
 */
export const formatEditDocumentBody = values => {
  const isSharedToAll = get(values, "share_to_all")
  const displayPoint = get(values, "display_point")

  // If shared with all, do not submit revoke array or share with array
  if (isSharedToAll) {
    return {
      display_point: displayPoint,
      share_to_all: true,
      share_with: [],
      revoke: []
    }
  }

  return {
    display_point: displayPoint,
    share_to_all: false,
    share_with: get(values, "share_with", []),
    revoke: get(values, "revoke", [])
  }
}

/**
 * Format versions to adhere to the structure expected by the Timeline component
 * @param {*} param0
 * @returns
 */
export const formatVersionsAsEvents = ({ versions, current, onClick }) =>
  versions.map(version => {
    const { id, version_number: num, file_name: name, created_at: date } = version
    const isCurrent = num === get(current, "version_number")
    const fileName = name.split("/").pop()

    return {
      id,
      content: `${fileName} v${num}`,
      date,
      iconColour: isCurrent ? colours.green : colours.darkBlue,
      icon: isCurrent ? "check" : "plus",
      onClick: isCurrent ? null : onClick
    }
  })

/**
 * validationSchema for the addOrgsFormik instance
 */
export const addOrgsModel = object({
  organisation_id: number().nullable()
})

/**
 * validationSchema for the editNetworkDocumentFormik instance
 */
export const editNetworkDocumentModel = object({
  display_point: string().required("MISSING_REQUIRED_FIELD").nullable(),
  share_to_all: boolean().required("MISSING_REQUIRED_FIELD").nullable(),
  share_with: array().nullable(),
  revoke: array().nullable()
})

/**
 * validationSchema for the uploadNewVersionFormik instance
 */
export const uploadNewVersionModel = object({
  file: object().nullable()
})

/**
 * validationSchema for the documentUploadFormik instance
 */
export const documentUploadModel = object({
  file: object().nullable(),
  name: string().required("MISSING_REQUIRED_FIELD").nullable(),
  display_point: string().required("MISSING_REQUIRED_FIELD").nullable(),
  share_to_all: boolean().required("MISSING_REQUIRED_FIELD").nullable(),
  share_with: array().nullable()
})
