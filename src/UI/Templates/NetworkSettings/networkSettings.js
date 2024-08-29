import React from "react"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { NetworkSettingsContext } from "./networkSettings.context"

// Components
import { ConfirmationModal } from "../../Molecules"
import { TextSetting } from "../../Organisms"

const NetworkSettings = () => {
  const {
    consentText,
    onSubmitConsentText,
    editConsent,
    setEditConsent,
    exclusionText,
    onSubmitExclusionText,
    editExclusion,
    setEditExclusion,
    getLoading,
    updateLoading,
    onDeleteConsentText,
    onDeleteExclusionText,
    deleteConsent,
    setDeleteConsent,
    deleteExclusion,
    setDeleteExclusion
  } = React.useContext(NetworkSettingsContext)

  return (
    <>
      <TextSetting
        name="consent_text"
        title="Consent Text"
        content={consentText}
        onSubmit={val => {
          onSubmitConsentText(val)
        }}
        helperText="If your organisation has its own script that it would like to be used when confirming that a client has given 'consent to use personal information' then insert it here. This will then be displayed for all users within your organisation when they visit this page and they will need to confirm the client has understood it before they will be able to progress."
        isEdit={editConsent}
        setEdit={setEditConsent}
        isLoading={getLoading || updateLoading}
        onDelete={() => setDeleteConsent(true)}
      />
      <TextSetting
        name="exclusion_text"
        title="Exclusion Text"
        content={exclusionText}
        onSubmit={val => {
          onSubmitExclusionText(val)
        }}
        helperText="If your organisation has its own script that it would like to be used when explaining limited product disclosure and general exclusions, you can insert it here. This will then be displayed for all users within your organisation when they visit the final compliance page. They will need to confirm the client has understood them all before they will be able to onboard the policy."
        isEdit={editExclusion}
        setEdit={setEditExclusion}
        isLoading={getLoading || updateLoading}
        onDelete={() => setDeleteExclusion(true)}
      />
      {deleteConsent && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setDeleteConsent(false)}
          onConfirm={onDeleteConsentText}
          isLoadingConfirm={updateLoading}
        >
          <P>Are you sure you want to remove the custom consent text?</P>
        </ConfirmationModal>
      )}
      {deleteExclusion && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setDeleteExclusion(false)}
          onConfirm={onDeleteExclusionText}
          isLoadingConfirm={updateLoading}
        >
          <P>Are you sure you want to remove the custom exclusion text?</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default NetworkSettings
