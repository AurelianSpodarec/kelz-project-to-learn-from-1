import React from "react"
import { Redirect } from "react-router-dom"
import { get } from "lodash"
import PropTypes from "prop-types"
import { Modal, ComplianceNote, Button } from "@4cplatform/elements/Molecules"
import { H3, P, SmallText } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { ClientsContext } from "../../clients.context"
import { getName } from "../../../../Helpers"
import { LEAD_ADMIN } from "../../../../../config/pages"

// Components
import {
  QuoteDetails,
  QuoteClientWrapper,
  QuoteDetailsHeader,
  QuoteAgentWrapper,
  OwnershipIconsWrapper,
  IconBackground,
  IconWrapper,
  QuoteButtonsWrapper,
  TransferButton
} from "./quotes.styles"
import { ConfirmationModal } from "../../../../Molecules"

const QuoteSummary = ({ selectedQuote }) => {
  const {
    viewData,
    setQuoteSummaryModal,
    setDeleteQuoteModal,
    deleteQuoteModal,
    onDeleteQuote,
    deleteQuoteLoading
  } = React.useContext(ClientsContext)
  const isOwner = viewData.user_id === selectedQuote.user_id
  const [redirect, setRedirect] = React.useState(null)
  const isQuoted = selectedQuote.status === "QUOTED"
  const isCompleted = selectedQuote.status === "QUOTED" && selectedQuote.status === "COMPLETE"

  // Redirect if truthy
  if (redirect) return <Redirect to={redirect} />

  return (
    <>
      <Modal onClose={() => setQuoteSummaryModal(false)} hasPadding={false} title="Quote summary">
        <QuoteDetails>
          <QuoteDetailsHeader>
            <QuoteClientWrapper>
              <H3 margin="0 0 1rem">{selectedQuote.reference?.toUpperCase()}</H3>
              <P margin="0">{getName({ data: viewData })}</P>
              <P margin="0">{get(viewData, "email_address")}</P>
            </QuoteClientWrapper>
            <AuthWrapper roles={["SYS_ADMIN", "ORG_ADMIN"]}>
              <Button
                onClick={() => setDeleteQuoteModal(true)}
                appearance="error"
                trailingIcon="trash-can"
                name="delete_quote"
              >
                Delete
              </Button>
            </AuthWrapper>
          </QuoteDetailsHeader>
          <H3 margin="2rem 0 1rem">Agent</H3>
          <QuoteAgentWrapper>
            <P>{selectedQuote.sales_agent_name || "-"}</P>
          </QuoteAgentWrapper>
        </QuoteDetails>
        <OwnershipIconsWrapper>
          <IconWrapper>
            <H3 margin="2rem 0 1rem" width="100%">
              Client data
            </H3>
            <IconBackground success>
              <Icon size="1.5rem" icon="check" colour={colours.white} />
            </IconBackground>
          </IconWrapper>
          <IconWrapper>
            <H3 margin="2rem 0 1rem" width="100%">
              Quotes
            </H3>
            <IconBackground success={isQuoted}>
              <Icon size="1.5rem" icon={isQuoted ? "check" : "close"} colour={colours.white} />
            </IconBackground>
          </IconWrapper>
          <IconWrapper>
            <H3 margin="2rem 0 1rem" width="100%">
              Policy
            </H3>
            <IconBackground success={isCompleted}>
              <Icon size="1.5rem" icon={isCompleted ? "check" : "close"} colour={colours.white} />
            </IconBackground>
          </IconWrapper>
        </OwnershipIconsWrapper>
        <AuthWrapper roles={["SYS_ADMIN", "ORG_ADMIN", "SUPPORT_ADMIN"]}>
          {!isOwner && (
            <ComplianceNote margin="2rem">
              <P margin="0.5rem 0 1rem">You are not the owner of this client</P>
              <SmallText>
                You can continue the journey or choose to transfer the lead to you or someone else
              </SmallText>
              <TransferButton
                onClick={() => setRedirect(LEAD_ADMIN.path)}
                appearance="info"
                trailingIcon="swap-horizontal"
                name="transfer_ownership"
              >
                Transfer ownership
              </TransferButton>
            </ComplianceNote>
          )}
        </AuthWrapper>
        <QuoteButtonsWrapper hasLeftButton={isOwner}>
          {isOwner && (
            <AuthWrapper roles={["SALES_ADVISER", "ORG_ADMIN"]}>
              {/* TODO: This is rendered from QuoteSummary but its functionality is out of scope */}
              <Button appearance="success" trailingIcon="chevron-right" onClick={() => {}}>
                Resume journey
              </Button>
            </AuthWrapper>
          )}
          <Button
            appearance="error"
            trailingIcon="cancel"
            onClick={() => setQuoteSummaryModal(false)}
          >
            Cancel
          </Button>
        </QuoteButtonsWrapper>
      </Modal>
      {deleteQuoteModal && (
        <ConfirmationModal
          onClose={() => setDeleteQuoteModal(false)}
          modalTitle="Delete Quote"
          onConfirm={() => onDeleteQuote(selectedQuote)}
          isLoadingConfirm={deleteQuoteLoading}
        >
          <P>This will be worked on a future ticket</P>
        </ConfirmationModal>
      )}
    </>
  )
}

QuoteSummary.defaultProps = {
  selectedQuote: {}
}

QuoteSummary.propTypes = {
  selectedQuote: PropTypes.object
}

export default QuoteSummary
