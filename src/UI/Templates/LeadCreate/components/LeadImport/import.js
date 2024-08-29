import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty, get } from "lodash"
import { useFormik } from "formik"
import { nullFunc, colours } from "@4cplatform/elements/Helpers"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { Table } from "@4cplatform/elements/Organisms"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { importLeadModel as validationSchema } from "./import.helpers"

// Components
import Body from "./import.body"
import Actions from "./import.actions"
import { StyledSmallButton } from "./import.styles"

const LeadImport = ({
  onSubmit: manualOnSubmit,
  isOpen,
  setIsOpen,
  errors,
  isLoading,
  clearImport
}) => {
  const [importHelperModal, setImportHelperModal] = useState(false)

  // Import Lead upload formik
  const importLeadFormik = useFormik({
    initialValues: {
      file: []
    },
    validationSchema,
    onSubmit: body => manualOnSubmit(body)
  })

  // If the modal is closed and the form is dirty, reset it
  useEffect(() => {
    const isDirty = get(importLeadFormik, "dirty", false)

    if (!isOpen && isDirty) {
      importLeadFormik.handleReset()
    }
  }, [isOpen, importLeadFormik])

  const formik = { ...importLeadFormik, validationSchema }
  const { handleSubmit, handleReset } = formik

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        leadingIcon="share-all"
        type="inline-button"
        appearance="primaryInline"
        margin="0 0 4rem"
        name="import_lead"
      >
        Import lead
      </Button>
      {isOpen && (
        <Modal
          title="Import Leads"
          onClose={() => {
            clearImport()
            handleReset()
          }}
          name="import_modal"
          hasPadding={false}
        >
          <StyledSmallButton
            appearance="primaryInline"
            leadingIcon="help-circle-outline"
            iconSize="1.8rem"
            onClick={setImportHelperModal}
          >
            See guidance on file format
          </StyledSmallButton>
          <Body type={isEmpty(errors) ? "import" : "error"} formik={formik} errors={errors} />
          <Actions
            type={isEmpty(errors) ? "import" : "error"}
            handleSubmit={handleSubmit}
            formik={formik}
            isLoading={isLoading}
            clearImport={() => {
              clearImport()
              handleReset()
            }}
          />
        </Modal>
      )}

      {importHelperModal && (
        <Modal
          title="File format guidelines"
          onClose={() => setImportHelperModal(false)}
          name="allowable_file_format_modal"
          hasPadding
        >
          <P>These are the supported constrained values for the lead import:</P>

          <Table
            data={[
              { field: "Lead type", allowed_inputs: "PMI" },
              {
                field: "First Name",
                allowed_inputs:
                  "The first name must only allow alphabetical characters, single quote (') and the hyphen (-)"
              },
              {
                field: "Last Name",
                allowed_inputs:
                  "The last name must only allow alphabetical characters, single quote (') and the hyphen (-)"
              },
              { field: "Email", allowed_inputs: "Valid email address" },
              { field: "Date of birth", allowed_inputs: "Y-m-d" },
              {
                field: "Phone number",
                allowed_inputs: "Valid local or international UK phone number"
              },
              {
                field: "Title",
                allowed_inputs:
                  "MR, MRS, MISS, MS, DR, AVM, BGDR, BR, CAPT, CDR, CDRE, COL, COUNTESS, DAME, DUCHESS, DUKE, EARL, FATHER, HON, JUDGE, LADY, LORD, LTCDR, MAJGEN, MAJOR, PASTOR, PROF, RABBI, REARADM, REV, RTHON, RTREV, SHERIFF, SIR, WGCDR, OTHER"
              },
              {
                field: "Lead source",
                allowed_inputs: "INTERNAL, EXTERNAL, REFER_FRIEND, REFER_STAFF, EXISTING_CLIENT"
              },
              { field: "Gender at birth", allowed_inputs: "male, female" }
            ]}
            columns={[
              {
                label: "Field",
                dataKey: "field",
                flexBasis: 25
              },
              {
                label: "Allowed inputs/formats",
                fieldColour: colours.darkGrey,
                dataKey: "allowed_inputs",
                flexBasis: 20
              }
            ]}
          />
        </Modal>
      )}
    </>
  )
}

LeadImport.defaultProps = {
  onSubmit: nullFunc,
  errors: [],
  isLoading: false,
  clearImport: nullFunc
}

LeadImport.propTypes = {
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  errors: PropTypes.array,
  isLoading: PropTypes.bool,
  clearImport: PropTypes.func
}

export default LeadImport
