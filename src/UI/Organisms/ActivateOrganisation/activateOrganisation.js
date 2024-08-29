import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { ApiError, usePatch } from "@4cplatform/elements/Api"
import { P } from "@4cplatform/elements/Typography"
import { AlertsContext } from "@4cplatform/elements/Alerts"

// Components
import { ConfirmationModal } from "../../Molecules"

const ActivateOrganisation = ({ onActivate, selectedOrganisation }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const [open, setOpen] = React.useState(false)
  const isApproved = get(selectedOrganisation, "approved", false)

  // Activate organisation
  const [activate, { loading: activateLoading, error: activateError }] = usePatch({
    endpoint: "/organisations/:slug/activate",
    params: {
      slug: get(selectedOrganisation, "slug", "")
    },
    onCompleted: res => {
      setOpen(false)
      // Display success message, refetch index query
      addAlert({
        message: "Organisation has been successfully activated",
        type: "success",
        dismissible: true,
        timeout: 5
      })

      const org = get(res, "data", {})
      onActivate({ ...org, contacts: get(selectedOrganisation, "contacts", []) })
    },
    onError: () => {
      addAlert({
        message: "There was an error activating the organisation",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <div>
      <Button
        appearance="success"
        onClick={() => setOpen(true)}
        isDisabled={!isApproved}
        margin="0 0 2rem"
        width="auto"
        trailingIcon="check"
      >
        Activate
      </Button>
      {open && (
        <ConfirmationModal
          onConfirm={activate}
          confirmAppearance="warning"
          cancelAppearance="errorGhost"
          isLoadingConfirm={activateLoading}
          onClose={() => setOpen(false)}
        >
          <P>
            Are you sure you want to activate this organisation? An active organisation can use the
            platform. They will be informed by email of this action.
          </P>
        </ConfirmationModal>
      )}
      {/* Error Handling */}
      <ApiError error={activateError} />
    </div>
  )
}

ActivateOrganisation.defaultProps = {
  selectedOrganisation: {}
}

ActivateOrganisation.propTypes = {
  selectedOrganisation: PropTypes.object,
  onActivate: PropTypes.func
}

export default ActivateOrganisation
