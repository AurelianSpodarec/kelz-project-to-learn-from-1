import React from "react"

// Components
import { TableActionsWrapper, TableActionsButton } from "./networkDocuments.styles"
import DocumentUpload from "./networkDocuments.upload"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"

const Actions = () => {
  const { uploadModal, setUploadModal } = React.useContext(NetworkDocumentsContext)
  return (
    <>
      <TableActionsWrapper data-testid="network_documents-actions-wrapper">
        <TableActionsButton
          onClick={() => setUploadModal({ isOpen: true, step: "file" })}
          trailingIcon="file-plus-outline"
          name="add_document"
        >
          Add document
        </TableActionsButton>
      </TableActionsWrapper>
      {uploadModal.isOpen && <DocumentUpload />}
    </>
  )
}

export default Actions
