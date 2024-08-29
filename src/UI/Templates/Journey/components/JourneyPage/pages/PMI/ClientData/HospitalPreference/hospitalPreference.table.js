import React from "react"
import { H4, SmallText } from "@4cplatform/elements/Typography"
import { Table } from "@4cplatform/elements/Organisms"
import { Checkbox } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"
import { HospitalPreferenceContext } from "./hospitalPreference.context"

// Components
import { PreferedHospital, PreferedHospitalContenct } from "./hospitalPreference.styles"

const HospitalPreferenceTable = () => {
  const {
    onHospitalPreferenceSelect,
    selectedHospital,
    pagination,
    setPerPage,
    setPage,
    tablePaginatedData
  } = React.useContext(HospitalPreferenceContext)

  return (
    <>
      <H4 margin="4rem 0 2rem" name="your_preferred_hospital">
        Your preferred hospital
      </H4>
      {selectedHospital && (
        <PreferedHospital>
          <PreferedHospitalContenct>
            <H4 margin="0.5rem 0 1.5rem" colour={colours.blue}>
              {selectedHospital.name}
            </H4>
            <SmallText margin="0 0 0.5rem">
              {`${selectedHospital.address_line_one}, ${selectedHospital.address_line_two},`}
            </SmallText>
            <SmallText margin="0 0 0">{`${selectedHospital.city}, ${selectedHospital.postcode}`}</SmallText>
          </PreferedHospitalContenct>

          <Button
            onClick={() => onHospitalPreferenceSelect(null)}
            appearance="errorInline"
            trailingIcon="delete"
            type="inline-button"
            name="delete_selected_hospital"
            margin="0 1rem 0"
          />
        </PreferedHospital>
      )}

      <Table
        data={tablePaginatedData}
        isLoading={false}
        name="agency_codes"
        columns={[
          {
            label: "Hospital",
            dataKey: "name",
            minWidth: "300px"
          },
          {
            label: "Distance (miles)",
            dataKey: "distance",
            minWidth: "100px"
          },
          {
            label: "Choose",
            minWidth: "20px",
            render: row => (
              <Checkbox
                key={row.data.id}
                name="style_new"
                onChange={() => onHospitalPreferenceSelect(row.data)}
                margin="0 2rem 0 0"
                value={selectedHospital && selectedHospital.id === row.data.id}
              />
            )
          }
        ]}
        hasActions={false}
        isClosed
        pagination={pagination}
        changePage={e => setPage(e)}
        changePerPage={setPerPage}
        hasPerPage
      />
    </>
  )
}

export default HospitalPreferenceTable
