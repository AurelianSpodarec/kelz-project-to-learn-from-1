import React from "react"
import { get, isEmpty } from "lodash"
import { useFormik } from "formik"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, P } from "@4cplatform/elements/Typography"
import { Checkbox } from "@4cplatform/elements/Forms"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"
import { PageContext } from "../../../Organisms"
import { shareAgencyCodeModel as validationSchema } from "./networkAgencyCodes.helpers"

// Components
import { PanelBody } from "../../../Molecules/FlyOutPanel"
import { ConfirmationModal } from "../../../Molecules"
import AgencyCodesPanelHeader from "./networkAgencyCodes.panel.header"
import AddOrganisations from "./networkAgencyCodes.panel.sharing.add"
import OrgsTable from "./networkAgencyCodes.panel.sharing.table"
import { ShareCodeActions, ShareButtonsWrapper } from "./networkAgencyCodes.styles"

const NetworkAgencyCodesEdit = () => {
  const {
    selectedAgencyCode,
    viewData,
    onSubmitShare,
    onRevokeShares,
    revokeModal,
    setRevoke,
    revokeLoading,
    shareLoading,
    sharedOrganisations
  } = React.useContext(AgencyCodesContext)
  const {
    panelStatusControls: { panelStatus },
    setPanelStatus
  } = React.useContext(PageContext)

  // Formik instance
  const shareAgencyCodeFormik = useFormik({
    initialValues: {
      share_to_all: get(viewData, "share_to_all", false),
      share_with: []
    },
    validationSchema,
    onSubmit: body => onSubmitShare(body)
  })

  const { handleSubmit } = shareAgencyCodeFormik
  const formik = { ...shareAgencyCodeFormik, validationSchema }
  const orgsCount = get(formik, "values.share_with", []).length

  return (
    <>
      <AgencyCodesPanelHeader selectedAgencyCode={selectedAgencyCode} context="wide" />
      {!isEmpty(viewData) && panelStatus !== "closed" && (
        <PanelBody>
          <H3 appearance="light">Shared with</H3>
          {/* Table actions */}
          <ShareCodeActions>
            <Button
              type="inline-button"
              appearance="errorInlineLight"
              leadingIcon="delete"
              onClick={() => setRevoke(true)}
              isDisabled={isEmpty(sharedOrganisations)}
            >
              Revoke shares
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
          </ShareCodeActions>

          {/* Table */}
          <OrgsTable />

          {/* Save/Cancel buttons */}
          <ShareButtonsWrapper>
            <Button
              appearance="success"
              leadingIcon="check"
              margin="0 2rem 0 0"
              onClick={handleSubmit}
              isLoading={shareLoading}
            >
              {orgsCount === 0
                ? "Save"
                : `Share with ${orgsCount} organisation${orgsCount > 1 ? "s" : ""}`}
            </Button>
            <Button appearance="error" leadingIcon="cancel" onClick={() => setPanelStatus("open")}>
              Cancel
            </Button>
          </ShareButtonsWrapper>
        </PanelBody>
      )}

      {/* Revoke shares modal */}
      {revokeModal && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Yes"
          confirmAppearance="success"
          cancelAppearance="errorGhost"
          isLoadingConfirm={revokeLoading}
          onClose={() => setRevoke(false)}
          onConfirm={onRevokeShares}
        >
          <P>
            Are you sure you want to revoke all shares for this agency code? This action cannot be
            undone.
          </P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default NetworkAgencyCodesEdit
