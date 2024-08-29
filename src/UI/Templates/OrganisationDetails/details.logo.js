import React from "react"
import { get } from "lodash"

// Components
import { Logo } from "../../Organisms"

// Helpers
import { OrganisationDetailsContext } from "./details.context"

const OrganisationLogo = () => {
  const {
    isEdit,
    onLogoUpdate,
    onLogoDelete,
    isLogoUpdateLoading,
    isLogoDeleteLoading,
    data: organisation,
    logoUpdateOpen,
    logoDeleteOpen,
    setLogoUpdate,
    setLogoDelete
  } = React.useContext(OrganisationDetailsContext)

  return (
    <Logo
      isEdit={isEdit}
      title="Organisation logo"
      onSubmit={body => {
        onLogoUpdate(body)
      }}
      onDelete={() => onLogoDelete()}
      updateLoading={isLogoUpdateLoading}
      deleteLoading={isLogoDeleteLoading}
      path={get(organisation, "logo_file_path", null)}
      isUpdate={logoUpdateOpen}
      isDelete={logoDeleteOpen}
      setUpdate={setLogoUpdate}
      setDelete={setLogoDelete}
    />
  )
}

export default OrganisationLogo
