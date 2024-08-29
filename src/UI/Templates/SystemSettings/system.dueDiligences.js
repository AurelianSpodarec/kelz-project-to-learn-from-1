import React from "react"
import { get } from "lodash"
import { H3, P } from "@4cplatform/elements/Typography"
import { formatLabelForTestID } from "@4cplatform/elements/Helpers"

// Component
import { TextSetting } from "../../Organisms"
import { ConfirmationModal } from "../../Molecules"
import AddDueDiligence from "./system.dueDiligences.add"

// Helpers
import { SystemSettingsContext } from "./system.context"

const DueDiligences = () => {
  const {
    dueDiligences,
    setDueDiligenceDelete,
    dueDiligenceEdit,
    dueDiligenceDelete,
    setDueDiligenceEdit,
    deleteLoading,
    onDueDiligenceDelete,
    onDueDiligenceSubmit,
    dueDiligencesLoading
  } = React.useContext(SystemSettingsContext)

  return (
    <>
      <H3>Due Diligences</H3>
      {/* Due diligences setting items */}
      {dueDiligences.map(item => (
        <TextSetting
          name={formatLabelForTestID(get(item, "title"))}
          key={formatLabelForTestID(get(item, "title"))}
          title={get(item, "title")}
          content={get(item, "description", "")}
          isEdit={
            get(dueDiligenceEdit, "isOpen") &&
            get(dueDiligenceEdit, "dueDiligence") === get(item, "id")
          }
          setEdit={val => {
            setDueDiligenceEdit({
              isOpen: val,
              dueDiligence: get(item, "id")
            })
          }}
          isLoading={dueDiligencesLoading}
          onDelete={() => setDueDiligenceDelete({ isOpen: true, dueDiligence: get(item, "id") })}
          onSubmit={onDueDiligenceSubmit}
          canEditHTML={false}
          contentLabel="Due diligence description"
          titleLabel="Due diligence title"
          canEditTitle
        />
      ))}
      {/* Add due diligence button */}
      <AddDueDiligence />
      {/* Delete setting modal */}
      {get(dueDiligenceDelete, "isOpen") && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setDueDiligenceDelete({ isOpen: false, dueDiligence: null })}
          onConfirm={onDueDiligenceDelete}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to delete this due diligence item?</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default DueDiligences
