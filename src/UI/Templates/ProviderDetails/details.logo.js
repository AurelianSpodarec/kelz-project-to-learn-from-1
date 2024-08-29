import React from "react"
import { get } from "lodash"

// Helpers
import { ProviderDetailsContext } from "./details.context"

// Components
import { Logo } from "../../Organisms"

const ProviderLogo = () => {
  const {
    isEdit,
    onLogoUpdate,
    onLogoDelete,
    isLogoUpdateLoading,
    isLogoDeleteLoading,
    data: provider,
    logoUpdateOpen,
    logoDeleteOpen,
    setLogoUpdate,
    setLogoDelete
  } = React.useContext(ProviderDetailsContext)
  return (
    <Logo
      isEdit={isEdit}
      title="Provider logo"
      onSubmit={body => {
        onLogoUpdate(body)
      }}
      onDelete={() => onLogoDelete()}
      updateLoading={isLogoUpdateLoading}
      deleteLoading={isLogoDeleteLoading}
      path={get(provider, "logo_file_path", null)}
      isUpdate={logoUpdateOpen}
      isDelete={logoDeleteOpen}
      setUpdate={setLogoUpdate}
      setDelete={setLogoDelete}
    />
  )
}

export default ProviderLogo
