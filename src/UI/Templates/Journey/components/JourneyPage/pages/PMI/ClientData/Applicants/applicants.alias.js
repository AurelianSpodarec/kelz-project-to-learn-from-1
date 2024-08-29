import React from "react"
import { get } from "lodash"
import { H3, H4, SmallText, P } from "@4cplatform/elements/Typography"
import { Modal, Button } from "@4cplatform/elements/Molecules"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { ApplicantsContext } from "./applicants.context"
import { getName } from "../../../../../../../../Helpers"

// Components
import {
  AliasWrapper,
  AliasContent,
  AliasButtons,
  AliasButton,
  AliasOuterWrapper
} from "./applicants.styles"
import AliasForm from "./applicants.alias.form"
import { ConfirmationModal } from "../../../../../../../../Molecules"

const Alias = () => {
  const {
    alias,
    hasAlias,
    updateAliasModal,
    setUpdateAliasModal,
    deleteAliasModal,
    setDeleteAliasModal,
    deleteAlias,
    deleteAliasLoading,
    setAddAliasModal,
    addAliasModal
  } = React.useContext(ApplicantsContext)
  const address = get(alias, "address", {})

  return (
    <AliasOuterWrapper>
      <H3 margin="0 0 1rem">Alias</H3>
      {!hasAlias && (
        <Button
          margin="0"
          onClick={() => setAddAliasModal(true)}
          leadingIcon="account-plus"
          type="inline-button"
          appearance="primaryInline"
        >
          Add alias
        </Button>
      )}
      {hasAlias && (
        <AliasWrapper>
          <AliasContent>
            <H4 margin="0 0 1rem">{getName({ data: alias, hasTitle: true })}</H4>
            {/* Address */}
            {!!get(address, "line_one") && (
              <SmallText margin="0">{get(address, "line_one")}</SmallText>
            )}
            {!!get(address, "line_two") && (
              <SmallText margin="0">{get(address, "line_two")}</SmallText>
            )}
            {!!get(address, "city") && <SmallText margin="0">{get(address, "city")}</SmallText>}
            {!!get(address, "county") && <SmallText margin="0">{get(address, "county")}</SmallText>}
            {!!get(address, "postcode") && (
              <SmallText margin="0">{get(address, "postcode")}</SmallText>
            )}
          </AliasContent>
          <AliasButtons>
            <AliasButton margin="0 1rem 0 0" onClick={() => setUpdateAliasModal(true)}>
              <Icon colour={get(colours, "white")} size="1.5rem" icon="pencil" />
            </AliasButton>
            <AliasButton appearance="error" margin="0" onClick={() => setDeleteAliasModal(true)}>
              <Icon colour={get(colours, "white")} size="1.5rem" icon="delete" />
            </AliasButton>
          </AliasButtons>
        </AliasWrapper>
      )}
      {/* Update alias */}
      {updateAliasModal && (
        <Modal onClose={() => setUpdateAliasModal(false)} title="Update alias" name="update_alias">
          <AliasForm isEdit />
        </Modal>
      )}
      {/* Delete alias */}
      {deleteAliasModal && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Yes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          isLoadingConfirm={deleteAliasLoading}
          onClose={() => setDeleteAliasModal(false)}
          onConfirm={deleteAlias}
        >
          <P>Are you sure you want to remove the current alias from the applicant list?</P>
        </ConfirmationModal>
      )}
      {/* Add alias */}
      {addAliasModal && (
        <Modal onClose={() => setAddAliasModal(false)} title="Add alias">
          <AliasForm />
        </Modal>
      )}
    </AliasOuterWrapper>
  )
}

export default Alias
