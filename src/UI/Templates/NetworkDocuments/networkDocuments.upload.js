import React from "react"
import { get, isEmpty } from "lodash"
import { useFormik } from "formik"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { Input, Select, Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import {
  formatDocumentUploadBody,
  documentUploadModel as validationSchema
} from "./networkDocuments.helpers"

// Components
import { UploadModal } from "../../Forms"
import {
  UploadContentWrapper,
  AddOrganisationButtonsWrapper as ButtonsWrapper
} from "./networkDocuments.styles"
import AddOrgs from "./networkDocuments.upload.add"

const DocumentUpload = () => {
  const { uploadModal, setUploadModal, uploadDocument, addLoading } =
    React.useContext(NetworkDocumentsContext)
  const step = get(uploadModal, "step")
  const [list, setList] = React.useState([])

  // Formik instance
  const documentUploadFormik = useFormik({
    initialValues: {
      file: null,
      name: "",
      display_point: "",
      share_to_all: false,
      share_with: []
    },
    validationSchema,
    onSubmit: values => {
      const body = formatDocumentUploadBody({ values, list })
      uploadDocument(body)
    }
  })

  const { handleSubmit } = documentUploadFormik
  const formik = { ...documentUploadFormik, validationSchema }
  const isSharedToAll = get(documentUploadFormik, "values.share_to_all", false)

  return (
    <>
      {step === "file" && (
        <UploadModal
          onClose={() => setUploadModal({ isOpen: false, step: null })}
          formik={formik}
          name="file"
          onConfirm={() => setUploadModal({ isOpen: true, step: "details" })}
        />
      )}
      {step === "details" && (
        <Modal
          onClose={() => setUploadModal({ isOpen: false, step: null })}
          title="Document Details"
          name="document_details"
          hasPadding={false}
        >
          <UploadContentWrapper>
            <Input name="name" formik={formik} label="File name" margin="0 0 2rem" />
            <Select name="display_point" formik={formik} label="Display point" margin="0 0 2rem">
              <option value="">Select display point</option>
              <option value="quote">Post Quote</option>
              <option value="policy">Point of Sale</option>
              <option value="both">Both</option>
            </Select>
            <Checkbox
              name="share_to_all"
              formik={formik}
              label="Share to all"
              isHorizontal
              labelMaxWidth="100%"
            />
          </UploadContentWrapper>
          <AddOrgs list={list} setList={setList} isSharedToAll={isSharedToAll} />
          <ButtonsWrapper>
            <Button
              appearance="success"
              leadingIcon="check"
              onClick={handleSubmit}
              isDisabled={isEmpty(list) && !isSharedToAll}
              isLoading={addLoading}
            >
              Confirm
            </Button>
            <Button
              appearance="errorGhost"
              leadingIcon="close"
              onClick={() => setUploadModal({ isOpen: false, step: null })}
            >
              Cancel
            </Button>
          </ButtonsWrapper>
        </Modal>
      )}
    </>
  )
}

export default DocumentUpload
