import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"
import { Modal, Button } from "@4cplatform/elements/Molecules"
import { H2, H3, P } from "@4cplatform/elements/Typography"

// Components
import { IconWithText, LabelWithText } from "../../../../Atoms"
import {
  ViewDealHeader,
  ViewDealBody,
  ButtonsWrapper,
  ConfirmWrapper,
  ConfirmButtons,
  ModalContentWrapper,
  ModalContentOverlay
} from "./assignment.styles"
import DateRange from "./assignment.card.view.dateRange"
import ApplicabilityList from "./assignment.card.view.list"

// Helpers
import { getConfirmationHeader, getConfirmationSubheader } from "./assignment.helpers"
import { AgencyCodesContext } from "../../agencyCodes.context"

const ViewDealCode = ({ code, onClose }) => {
  const {
    onSuspendDealCode,
    onReinstateDealCode,
    onUnassignDealCode,
    suspendDealCodeLoading,
    reinstateDealCodeLoading,
    unassignDealCodeLoading
  } = React.useContext(AgencyCodesContext)
  const [confirm, setConfirm] = React.useState({ isOpen: false, type: null })
  const isSuspended = get(code, "suspended", false)

  return (
    <Modal
      onClose={onClose}
      name="view_deal_code_modal"
      title="Manage deal code"
      hasPadding={false}
    >
      <ModalContentWrapper>
        {/* Overlay */}
        <ModalContentOverlay
          isVisible={get(confirm, "isOpen", false)}
          onClick={() => setConfirm({ isOpen: false, type: null })}
        />
        {/* Header */}
        <ViewDealHeader>
          <H2 margin="0 0 1rem">{get(code, "name", "-")}</H2>
          <IconWithText icon="pound" content={get(code, "deal_code", "-")} margin="0" />
        </ViewDealHeader>
        <ViewDealHeader>
          <DateRange start={get(code, "start_date")} end={get(code, "end_date")} />
        </ViewDealHeader>
        {/* Body */}
        <ViewDealBody>
          <LabelWithText label="Status">
            <IconWithText
              icon={!isSuspended ? "check-circle" : "close-circle"}
              content={!isSuspended ? "Not Suspended" : "Suspended"}
              iconColour={!isSuspended ? get(colours, "green") : get(colours, "red")}
            />
          </LabelWithText>
          <LabelWithText
            label="Description"
            content={get(code, "description", "-")}
            margin="0 0 2rem"
          />
          <ApplicabilityList code={code} />
        </ViewDealBody>
        {/* Buttons */}
        <ButtonsWrapper>
          <Button
            appearance="warning"
            trailingIcon={isSuspended ? "thumb-up" : "hand-left"}
            margin="0 1rem 0 0"
            onClick={() => {
              if (!isSuspended) {
                setConfirm({ isOpen: true, type: "suspend" })
              } else {
                setConfirm({ isOpen: true, type: "reinstate" })
              }
            }}
            isDisabled={get(confirm, "isOpen", false)}
          >
            {!isSuspended ? "Suspend" : "Reinstate"}
          </Button>
          <Button
            appearance="warning"
            trailingIcon="tag"
            margin="0"
            onClick={() => setConfirm({ isOpen: true, type: "unassign" })}
            isDisabled={get(confirm, "isOpen", false)}
          >
            Unassign
          </Button>
        </ButtonsWrapper>
      </ModalContentWrapper>
      {/* Confirm segment */}
      {confirm.isOpen && (
        <ConfirmWrapper>
          <H3 margin="0 0 1rem">{getConfirmationHeader(get(confirm, "type", null))}</H3>
          <P>{getConfirmationSubheader(get(confirm, "type", null))}</P>
          <ConfirmButtons>
            <Button
              appearance="success"
              leadingIcon="check"
              onClick={() => {
                if (get(confirm, "type") !== "unassign") {
                  if (!isSuspended) {
                    onSuspendDealCode(code)
                  } else {
                    onReinstateDealCode(code)
                  }
                } else {
                  onUnassignDealCode(code)
                }
              }}
              margin="0 1rem 0 0"
              isLoading={
                suspendDealCodeLoading || reinstateDealCodeLoading || unassignDealCodeLoading
              }
            >
              Yes
            </Button>
            <Button
              appearance="error"
              leadingIcon="close"
              onClick={() => setConfirm({ isOpen: false, type: null })}
            >
              No
            </Button>
          </ConfirmButtons>
        </ConfirmWrapper>
      )}
    </Modal>
  )
}

ViewDealCode.propTypes = {
  code: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ViewDealCode
