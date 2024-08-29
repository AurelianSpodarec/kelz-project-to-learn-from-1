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

const DeclinePolicy = () => {
  const { viewData, setDeclinePolicyModal, onDeclinePolicy, declinePolicyLoading } =
    React.useContext(PoliciesContext)
  const name = getName({ data: get(viewData, "client") })
  const providerName = get(viewData, "provider.name")
  const monthly = get(viewData, "monthly_premium", "")
  const monthsOfCover = get(viewData, "months_of_cover", "")
  const reference = get(viewData, "reference", "-")
  const salesAgentParent = get(viewData, "sales_agent.parent.name")

  const declinePolicyFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      declined_reason: ""
    },
    onSubmit: body => onDeclinePolicy({ body })
  })

  const { handleSubmit } = declinePolicyFormik
  const formik = { ...declinePolicyFormik }

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
        isLoadingCancel={declinePolicyLoading}
        onClose={() => {
          setDeclinePolicyModal(false)
        }}
        onConfirm={() => {
          setDeclinePolicyModal(false)
        }}
        onCancel={handleSubmit}
      >
        <H2 margin="0 0 1rem" fontSize="22px">
          {`Decline quote ${reference.toLocaleUpperCase()}`}
        </H2>
        <P margin="0 0 1rem">{`This action will decline the quote by ${salesAgentParent} for:`}</P>
        <P margin="0">{name}</P>
        <P margin="0">{providerName}</P>
        <P margin="0">£{monthly}</P>
        <P margin="0">{monthsOfCover} months</P>

        <TextArea
          name="declined_reason"
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

export default DeclinePolicy
