import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { useFormik } from "formik"
import { nullFunc } from "@4cplatform/elements/Helpers"
import { H3 } from "@4cplatform/elements/Typography"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import { addOrgsModel as validationSchema } from "./networkDocuments.helpers"

// Components
import List from "./networkDocuments.addOrgs.list"
import Form from "./networkDocuments.addOrgs.form"

const AddOrgs = ({ isSharedToAll, list, setList }) => {
  const { setOrgVal, orgVal, organisations } = React.useContext(NetworkDocumentsContext)

  // Formik instance
  const addOrgsFormik = useFormik({
    initialValues: {
      organisation_id: null
    },
    validationSchema,
    onSubmit: (item, { resetForm }) => {
      // Only add to list if it's not already there
      const isPresent = list.findIndex(org => org.organisation_id === item.organisation_id) !== -1
      if (!isPresent) {
        setList([...list, { ...item, label: orgVal }])
      }

      setOrgVal("")
      resetForm("")
    }
  })

  const { handleSubmit } = addOrgsFormik
  const formik = { ...addOrgsFormik, validationSchema }

  // If sharing to all, do not show this element
  if (isSharedToAll) return null

  return (
    <>
      {!isEmpty(list) && <H3 margin="0 0 1rem 2rem">Selected Organisations</H3>}
      <List list={list} setList={setList} />
      <Form formik={formik} handleSubmit={handleSubmit} organisations={organisations} />
    </>
  )
}

AddOrgs.defaultProps = {
  isSharedToAll: false,
  list: [],
  setList: nullFunc
}

AddOrgs.propTypes = {
  isSharedToAll: PropTypes.bool,
  list: PropTypes.array,
  setList: PropTypes.func
}

export default AddOrgs
