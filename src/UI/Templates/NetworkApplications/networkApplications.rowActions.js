import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"

// Components
import { ConfirmationModal } from "../../Molecules"
import { RowActionsWrapper } from "./networkApplications.styles"

// Helpers
import { NetworkApplicationsContext } from "./networkApplications.context"

const RowActions = ({ data }) => {
  const {
    onAcceptApplication,
    onRejectApplication,
    acceptLoading,
    rejectLoading,
    modal,
    setModal
  } = React.useContext(NetworkApplicationsContext)

  return (
    <>
      <RowActionsWrapper>
        <Button
          type="inline-button"
          leadingIcon="thumb-up"
          appearance="successInline"
          onClick={() => setModal({ isOpen: true, type: "accept", id: get(data, "id") })}
          name="accept"
        >
          Accept
        </Button>
        <Button
          type="inline-button"
          leadingIcon="thumb-down"
          appearance="errorInline"
          onClick={() => setModal({ isOpen: true, type: "reject", id: get(data, "id") })}
          name="reject"
        >
          Reject
        </Button>
      </RowActionsWrapper>

      {modal.isOpen && get(modal, "id") === get(data, "id") && !!get(modal, "id") && (
        <ConfirmationModal
          confirmIcon={modal.type === "accept" ? "check" : "close"}
          confirmText={modal.type === "accept" ? "Accept application" : "Reject application"}
          confirmAppearance={modal.type === "accept" ? "success" : "error"}
          isLoadingConfirm={acceptLoading || rejectLoading}
          cancelAppearance="errorGhost"
          onClose={() => setModal({ isOpen: false, type: null })}
          onConfirm={() => {
            if (modal.type === "accept") {
              onAcceptApplication(data)
            } else {
              onRejectApplication(data)
            }
          }}
        >
          <P>
            {`Are you sure you want to ${modal.type} this organisation's application to join the network?`}
          </P>
        </ConfirmationModal>
      )}
    </>
  )
}

RowActions.defaultProps = {
  data: {}
}

RowActions.propTypes = {
  data: PropTypes.object
}

export default RowActions
