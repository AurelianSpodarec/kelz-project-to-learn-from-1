import React from "react"
import { useFormik } from "formik"
import { string, object } from "yup"
import Select from "@4cplatform/elements/Forms/Select"

// Components
import { ConfirmationModal } from "../../Molecules"

// Helpers
import { OrganisationDetailsContext } from "./details.context"

const validationSchema = object({
  network_id: string().nullable().required("MISSING_REQUIRED_FIELD")
})
const JoinNetwork = () => {
  const { onJoinNetwork, setJoin, networks, networksLoading, applyLoading } = React.useContext(
    OrganisationDetailsContext
  )
  const joinNetworkFormik = useFormik({
    initialValues: {
      network_id: ""
    },
    validationSchema,
    onSubmit: invite => onJoinNetwork(invite)
  })
  const { handleSubmit } = joinNetworkFormik
  const formik = { ...joinNetworkFormik, validationSchema }

  return (
    <ConfirmationModal
      onConfirm={handleSubmit}
      onClose={() => setJoin(false)}
      title="Join a Network"
      isLoadingConfirm={applyLoading}
      confirmText="OK"
      confirmAppearance="success"
    >
      <Select formik={formik} name="network_id" label="Network" isLoading={networksLoading}>
        <option value="">Select network</option>
        {networks.map(network => {
          const { id, name } = network
          return (
            <option value={id} key={id}>
              {name}
            </option>
          )
        })}
      </Select>
    </ConfirmationModal>
  )
}

export default JoinNetwork
