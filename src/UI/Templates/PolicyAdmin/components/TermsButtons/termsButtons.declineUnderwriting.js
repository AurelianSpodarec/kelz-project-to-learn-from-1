import React from "react"
import { get } from "lodash"
import { H2, P, SmallText } from "@4cplatform/elements/Typography"
import { TextArea } from "@4cplatform/elements/Forms"
import { colours } from "@4cplatform/elements/Helpers"
import { useFormik } from "formik"

// Helpers
import { PoliciesContext } from "../../policies.context"
import { getName } from "../../../../Helpers"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const DeclineUnderwriting = () => {
  const {
    selectedPolicy,
    setDeclineUnderwritingModal,
    onDeclineUnderwriting,
    declineUnderwritingLoading
  } = React.useContext(PoliciesContext)
  const name = getName({ data: get(selectedPolicy, "client") })
  const providerName = get(selectedPolicy, "provider.name")
  const monthly = get(selectedPolicy, "monthly_premium", "")
  const monthsOfCover = get(selectedPolicy, "months_of_cover", "")
  const reference = get(selectedPolicy, "reference", "-")
  const salesAgentParent = get(selectedPolicy, "sales_agent.parent.name")

  const declineUnderwritingFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      underwriting_declined_reason: ""
    },
    onSubmit: body => onDeclineUnderwriting({ body })
  })

  const { handleSubmit } = declineUnderwritingFormik
  const formik = { ...declineUnderwritingFormik }

  return (
    <>
      <ConfirmationModal
        formik={formik}
        hasPadding={false}
        hasTrailingIcon={false}
        leadingIcon="arrow-left"
        confirmText="Go back"
        confirmAppearance="primary"
        cancelIcon="check"
        cancelText="Yes, decline"
        cancelAppearance="error"
        isLoadingCancel={declineUnderwritingLoading}
        onClose={() => {
          setDeclineUnderwritingModal(false)
        }}
        onConfirm={() => {
          setDeclineUnderwritingModal(false)
        }}
        onCancel={handleSubmit}
      >
        <H2 margin="0 0 1rem" fontSize="22px">
          {`Decline quote ${reference}`}
        </H2>
        <P margin="0 0 1rem">{`This action will decline the quote by ${salesAgentParent} for:`}</P>
        <P margin="0">{name}</P>
        <P margin="0">{providerName}</P>
        <P margin="0">£{monthly}</P>
        <P margin="0">{monthsOfCover} months</P>

        <TextArea
          name="underwriting_declined_reason"
          margin="0 0 3rem"
          isRequired
          formik={formik}
          placeholder="Input text"
          label={
            <>
              <SmallText margin="0">Reason for declining quote</SmallText>
              <SmallText
                margin="0.5rem 0 0 1rem"
                colour={get(colours, "tints.secondary.darkBlue.t70", "black")}
              >
                e.g. Request for more information
              </SmallText>
            </>
          }
        />
      </ConfirmationModal>
    </>
  )
}

export default DeclineUnderwriting
