import React from "react"
import { get, isEmpty } from "lodash"
import { useFormik } from "formik"
import { Button } from "@4cplatform/elements/Molecules"
import { H3 } from "@4cplatform/elements/Typography"
import { Select, Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import {
  formatEditDocumentBody,
  editNetworkDocumentModel as validationSchema
} from "./networkDocuments.helpers"
import { PageContext } from "../../Organisms"

// Components
import { EditDocumentActions, EditButtonsWrapper } from "./networkDocuments.styles"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import NetworkDocumentPanelHeader from "./networkDocuments.panel.header"
import OrgsTable from "./networkDocuments.panel.edit.table"
import AddOrganisations from "./networkDocuments.panel.edit.add"

const NetworkDocumentEdit = () => {
  const { selectedDocument, onSubmitEdit, editLoading } = React.useContext(NetworkDocumentsContext)
  const {
    panelStatusControls: { panelStatus },
    setPanelStatus
  } = React.useContext(PageContext)

  const editNetworkDocumentFormik = useFormik({
    initialValues: {
      display_point: get(selectedDocument, "display_point", ""),
      share_to_all: get(selectedDocument, "share_to_all", false),
      share_with: [],
      revoke: []
    },
    validationSchema,
    onSubmit: body => onSubmitEdit(formatEditDocumentBody(body))
  })

  const [selected, setSelected] = React.useState([])
  const { handleSubmit } = editNetworkDocumentFormik
  const formik = { ...editNetworkDocumentFormik, validationSchema }

  return (
    <>
      <NetworkDocumentPanelHeader selectedDocument={selectedDocument} context="wide" />
      {!!selectedDocument && panelStatus !== "closed" && (
        <PanelBody>
          <Select name="display_point" formik={formik} label="Display point" appearance="light">
            <option value="">Select display point</option>
            <option value="quote">Quote</option>
            <option value="policy">Policy</option>
            <option value="both">Both</option>
          </Select>
          <H3 appearance="light">Shared with</H3>
          {/* Table actions */}
          <EditDocumentActions>
            <Button
              type="inline-button"
              appearance="errorInlineLight"
              leadingIcon="delete"
              isDisabled={isEmpty(selected)}
              onClick={() => {
                const revokeList = get(formik, "values.revoke", [])
                const newList = [...revokeList, ...selected]

                formik.setFieldValue("revoke", newList)
                setSelected([])
              }}
            >
              {isEmpty(selected) ? "Remove selected" : `Remove selected (${selected.length})`}
            </Button>
            <AddOrganisations
              isDisabled={!!get(formik, "values.share_to_all", false)}
              onConfirm={list => {
                formik.setFieldValue(
                  "share_with",
                  list.map(item => item.organisation_id)
                )
              }}
            />
            <Checkbox
              name="share_to_all"
              formik={formik}
              label="Share to all"
              appearance="light"
              margin="0"
              hasErrorMessage={false}
            />
          </EditDocumentActions>
          {/* Table */}
          <OrgsTable formik={formik} selected={selected} setSelected={setSelected} />
          {/* Save/cancel buttons */}
          <EditButtonsWrapper>
            <Button
              appearance="success"
              leadingIcon="check"
              margin="0 2rem 0 0"
              onClick={handleSubmit}
              isLoading={editLoading}
            >
              Save
            </Button>
            <Button appearance="error" leadingIcon="cancel" onClick={() => setPanelStatus("open")}>
              Cancel
            </Button>
          </EditButtonsWrapper>
        </PanelBody>
      )}
    </>
  )
}

export default NetworkDocumentEdit
