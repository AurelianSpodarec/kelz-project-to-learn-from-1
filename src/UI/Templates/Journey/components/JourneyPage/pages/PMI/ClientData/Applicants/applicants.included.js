import React, { useContext, useEffect } from "react"
import { get, capitalize, isEmpty } from "lodash"
import moment from "moment"
import { Table } from "@4cplatform/elements/Organisms"

// Helpers
import { JourneyContext } from "../../../../../../journey.context"
import { ApplicantsContext } from "./applicants.context"
import { getName } from "../../../../../../../../Helpers"

const IncludedTable = () => {
  const { formik } = useContext(JourneyContext)
  const { included, setIncludedPerPage, setIncludedPage, includedPagination, includedLoading } =
    useContext(ApplicantsContext)

  useEffect(() => {
    if (!isEmpty(included)) {
      const applicants = included.map(applicant => ({
        name: getName({ data: applicant }),
        age: moment().diff(moment(get(applicant, "date_of_birth"), "YYYY-MM-DD HH:mm"), "years"),
        type: capitalize(get(applicant, "type", "-"))
      }))
      formik.setFieldValue("applicants", applicants)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [included])

  return (
    <Table
      data={included}
      type="no-lines"
      isLoading={includedLoading}
      name="included"
      columns={[
        {
          label: "Name",
          data: "first_name",
          minWidth: "180px",
          render: row => getName({ data: get(row, "data") })
        },
        {
          label: "Age",
          data: "date_of_birth",
          minWidth: "80px",
          render: row =>
            moment().diff(moment(get(row, "data.date_of_birth"), "YYYY-MM-DD HH:mm"), "years")
        },
        {
          label: "Type",
          data: "type",
          minWidth: "100px",
          render: row => capitalize(get(row, "data.type", "-"))
        }
      ]}
      hasActions={false}
      pagination={includedPagination}
      changePage={e => setIncludedPerPage(e)}
      changePerPage={setIncludedPage}
      perPageOptions={{ max: 20, interval: 5 }}
      hasPerPage={false}
    />
  )
}

export default IncludedTable
