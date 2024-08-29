import React from "react"
import { get } from "lodash"

// Components
import { Logo } from "../../Organisms"

// Helpers
import { NetworkDetailsContext } from "./details.context"

const NetworkLogo = () => {
  const {
    isEdit,
    onLogoUpdate,
    onLogoDelete,
    isLogoUpdateLoading,
    isLogoDeleteLoading,
    data: network,
    logoUpdateOpen,
    logoDeleteOpen,
    setLogoUpdate,
    setLogoDelete
  } = React.useContext(NetworkDetailsContext)

  return (
    <Logo
      isEdit={isEdit}
      title="Network logo"
      onSubmit={body => {
        onLogoUpdate(body)
      }}
      onDelete={() => onLogoDelete()}
      updateLoading={isLogoUpdateLoading}
      deleteLoading={isLogoDeleteLoading}
      path={get(network, "logo_file_path", null)}
      isUpdate={logoUpdateOpen}
      isDelete={logoDeleteOpen}
      setUpdate={setLogoUpdate}
      setDelete={setLogoDelete}
    />
  )
}

export default NetworkLogo
