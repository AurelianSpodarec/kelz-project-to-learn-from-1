import React, { useContext } from "react"
import { useFormik } from "formik"
import { object, number, string } from "yup"
import { H4 } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"
import { Input } from "@4cplatform/elements/Forms"

// Helpers
import { alphanumericRegex } from "../../../../Helpers"
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ButtonsWrapper } from "./requestAcceptance.styles"
import AcceptRequest from "./requestAcceptance.accept"
import DeclineRequest from "./requestAcceptance.decline"

const RequestAcceptance = () => {
  const { acceptModal, setAcceptModal, declineModal, setDeclineModal } =
    useContext(AgencyCodesContext)

  const validationSchema = object({
    agency_code: string()
      .matches(alphanumericRegex, "INVALID_ALPHANUMERIC")
      .required("MISSING_REQUIRED_FIELD"),
    primary_commission_rate: number()
      .min(0)
      .max(100)
      .test("maxTwoDecimals", "MAX_TWO_DECIMALS", no => /^\d+(\.\d{1,2})?$/.test(no))
      .required("MISSING_REQUIRED_FIELD")
  })

  const requestAcceptanceFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      agency_code: "",
      primary_commission_rate: 0
    },
    validationSchema,
    onSubmit: () => setAcceptModal(true)
  })

  const formik = { ...requestAcceptanceFormik, validationSchema }
  const { handleSubmit } = formik

  return (
    <>
      <H4 appearance="light" margin="1rem 0 2rem">
        Agency code details
      </H4>
      <Input
        name="agency_code"
        formik={formik}
        label="Agency code"
        appearance="light"
        leadingIconType="prepend"
        leadingIcon="pound"
      />
      <Input
        min={0}
        max={100}
        step={0.01}
        type="number"
        name="primary_commission_rate"
        formik={formik}
        label="Primary commision rate"
        appearance="light"
        leadingIconType="prepend"
        leadingIcon="percent-outline"
      />
      <ButtonsWrapper>
        <Button
          appearance="success"
          onClick={handleSubmit}
          trailingIcon="check"
          name="accept_request"
        >
          Activate
        </Button>
        {acceptModal && <AcceptRequest formik={formik} />}
        <Button
          appearance="error"
          trailingIcon="close"
          onClick={() => setDeclineModal(true)}
          name="decline_request"
        >
          Decline
        </Button>
        {declineModal && <DeclineRequest />}
      </ButtonsWrapper>
    </>
  )
}

export default RequestAcceptance
