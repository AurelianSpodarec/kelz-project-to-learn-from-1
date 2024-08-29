import React from "react"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { P, H3, H4 } from "@4cplatform/elements/Typography"
import HospitalPreferenceMap from "./hospitalPreference.map"
import HospitalPreferenceTable from "./hospitalPreference.table"
import { HospitalPreferenceContext } from "./hospitalPreference.context"
import { Typeahead } from "../../../../../../../../Forms"

const Body = () => {
  const {
    clientAddress,
    hospitalsLoading,
    isDataLoading,
    onHospitalPreferenceSelect,
    hospitalsWithDistance
  } = React.useContext(HospitalPreferenceContext)
  const [searchValue, setSearchValue] = React.useState()

  return (
    <>
      <ComplianceNote type="error">
        <H4 margin="0 0 1rem">Compliance note</H4>
        <P>The three hospitals closest to the client’s residential address need to be read out.</P>
        <P>
          Ask the client if they have any preference when it comes to private hospitals and whether
          they require these to be covered on their chosen hospital list. If a preference is
          provided,ensure this is covered.
        </P>
        <P>
          Should it not be beneficial for the client to have access to these hospitals or if they
          are not included on the clients chosen hospital list, this needs to be explained to the
          client and alternatives provided.{" "}
        </P>
      </ComplianceNote>
      {!isDataLoading && (
        <Typeahead
          name="search_hospitals"
          label="Search hospitals"
          onSelect={opt => {
            if (opt.hospital_provider_name !== null) onHospitalPreferenceSelect(opt.data)
          }}
          onChange={val => setSearchValue(val)}
          val={searchValue}
          suggestions={hospitalsWithDistance.map(hospital => {
            const { id, name } = hospital
            return {
              id,
              label: name,
              data: hospital,
              subHeader: `${hospital.distance} Miles`,
              helperText:
                hospital.hospital_provider_name === null ? "Not avaliable with any provider" : null
            }
          })}
          hasSearch
          hasCancel={!!searchValue}
          onCancel={() => setSearchValue("")}
          isLoading={hospitalsLoading}
          shouldClearOnSubmit
        />
      )}

      <H3 margin="0 0 2rem">These are the closest hospitals to {clientAddress.postcode}</H3>

      <HospitalPreferenceMap />
      <HospitalPreferenceTable />
    </>
  )
}

export default Body
