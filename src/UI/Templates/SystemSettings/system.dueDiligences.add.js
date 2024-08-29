import React from "react"
import { Button } from "@4cplatform/elements/Molecules"

// Components
import { TextSetting } from "../../Organisms"

// Helpers
import { SystemSettingsContext } from "./system.context"

const AddDueDiligence = () => {
  const { onAddDueDiligence, createOpen, setCreateOpen } = React.useContext(SystemSettingsContext)

  return (
    <>
      {!createOpen && (
        <Button
          type="inline-button"
          appearance="primaryInline"
          leadingIcon="account-plus"
          onClick={() => setCreateOpen(true)}
        >
          Add due diligence
        </Button>
      )}
      {createOpen && (
        <TextSetting
          isEdit
          canEditTitle
          content=""
          title=""
          contentLabel="Due diligence description"
          titleLabel="Due diligence title"
          canEditHTML={false}
          onCancel={() => setCreateOpen(false)}
          onSubmit={onAddDueDiligence}
          name="add_due_diligence"
        />
      )}
    </>
  )
}

export default AddDueDiligence
