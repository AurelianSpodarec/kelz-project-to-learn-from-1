import React from "react"
import { useFormik } from "formik"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import { uploadNewVersionModel as validationSchema } from "./networkDocuments.helpers"

// Components
import { UploadModal } from "../../Forms"

const UploadNewVersion = () => {
  const { uploadNewVersion, setNewVersion, uploadNewVersionLoading } =
    React.useContext(NetworkDocumentsContext)

  const uploadNewVersionFormik = useFormik({
    initialValues: {
      file: null
    },
    validationSchema,
    onSubmit: values => {
      uploadNewVersion(values)
    }
  })

  const { handleSubmit } = uploadNewVersionFormik
  const formik = { ...uploadNewVersionFormik, validationSchema }

  return (
    <UploadModal
      title="Upload new version"
      name="file"
      formik={formik}
      onConfirm={handleSubmit}
      onClose={() => setNewVersion(false)}
      isLoading={uploadNewVersionLoading}
    />
  )
}

export default UploadNewVersion
