import React, { useEffect } from "react"
import moment from "moment"
import { DatePicker } from "@4cplatform/elements/Forms"
import SmallText from "@4cplatform/elements/Typography/SmallText"

// Helpers
import { JourneyContext } from "../../../../../../journey.context"

const StartDatePicker = () => {
  const {
    formik,
    data: {
      page: { conditionals, data }
    }
  } = React.useContext(JourneyContext)
  const invalidAvivaDate = ["29", "30", "31"]

  useEffect(() => {
    if (formik.values && !formik.values.start_date && data.recommended_style === "SWITCH")
      formik.setFieldValue("start_date", data.cp_renewal_date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getHelperText = () => {
    if (data.recommended_style === "SWITCH") {
      return (
        <SmallText margin="0 30rem 0" width="100%">
          The policy start date has been automatically set to the renewal date for the client's
          current policy.
        </SmallText>
      )
    }
    if (
      conditionals.access_to_aviva_agency_code &&
      formik.values.start_date &&
      invalidAvivaDate.includes(formik.values.start_date.split("-")[2])
    ) {
      return (
        <SmallText margin="0 30rem 0" padding="0 26rem 0 0" width="100%">
          Aviva policies cannot start on the 29th, 30th or 31st of the month. If you continue with
          the selected date, any quotes from Aviva in the Quote Comparison page will be for policies
          commencing on{" "}
          {moment(formik.values.start_date).add(1, "M").startOf("month").format("DD/MM/YYYY")}
        </SmallText>
      )
    }
    if (
      data.recommended_style === "NEW" &&
      (data.recommended_underwriting === "MORI" || data.recommended_underwriting === "FMU")
    ) {
      return (
        <SmallText margin="0 30rem 0" width="100%">
          The start date cannot be back-dated. The start date cannot be future-dated by more than 30
          days.
        </SmallText>
      )
    }
  }

  return (
    <>
      <DatePicker
        name="start_date"
        label="Start date"
        margin="0"
        dateRangeMin={moment().format("DD/MM/YYYY")}
        dateRangeMax={moment().add(30, "days").format("DD/MM/YYYY")}
        isHorizontal
        isRequired
        formik={formik}
        isDisabled={data.recommended_style === "SWITCH"}
      />
      {getHelperText()}
    </>
  )
}

export default StartDatePicker
