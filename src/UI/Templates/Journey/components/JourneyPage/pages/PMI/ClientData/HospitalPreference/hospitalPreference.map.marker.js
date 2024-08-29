import React from "react"
import PropTypes from "prop-types"
import { Icon } from "@4cplatform/elements/Atoms"
import { H4, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { colours } from "@4cplatform/elements/Helpers"

// Components
import { PinWrapper, Pin, Tooltip } from "./hospitalPreference.styles"
import { HospitalPreferenceContext } from "./hospitalPreference.context"

const HospitalPreferenceMapMarker = ({ type, lat, lng, data, index }) => {
  const { onHospitalPreferenceSelect, selectedHospital } =
    React.useContext(HospitalPreferenceContext)
  const [isHover, setIsHover] = React.useState(false)
  return (
    <PinWrapper key={data.name}>
      <Pin
        onClick={() => {
          if (type === "client") return

          onHospitalPreferenceSelect(data)
        }}
        onMouseEnter={() => {
          if (type === "client" || isHover) return

          setIsHover(true)
        }}
        onMouseLeave={() => {
          if (type === "client") return

          setIsHover(false)
        }}
        lat={lat}
        lng={lng}
        type={type}
        zIndex={
          (selectedHospital && selectedHospital.id === data.id) ||
          (index === 0 && !selectedHospital) ||
          index === 0
            ? 1
            : 0
        }
      >
        <Icon icon={type !== "client" ? "hospital-building" : "account"} colour={colours.white} />
      </Pin>
      {data && (
        <Tooltip
          isHover={
            isHover ||
            (selectedHospital && selectedHospital.id === data.id) ||
            (index === 0 && !selectedHospital)
          }
          type={type}
        >
          <H4 appearance="light" margin="0 0 0.7rem 0" color>
            {data ? data.name : ""}
          </H4>
          <SmallText appearance="light" margin="0 0 0.7rem 0">
            {data ? [data.address_line_one, data.city, data.postcode].join(", ") : ""}
          </SmallText>
          <SmallText appearance="light" margin="0 0.7rem 0 0">
            {data ? data.distance : ""} miles
          </SmallText>
        </Tooltip>
      )}
    </PinWrapper>
  )
}
export default HospitalPreferenceMapMarker

HospitalPreferenceMapMarker.defaultProps = {
  type: "avaliable",
  index: 1,
  lat: 0,
  lng: 0,
  data: {}
}

HospitalPreferenceMapMarker.propTypes = {
  data: PropTypes.any,
  index: PropTypes.any,
  type: PropTypes.string,
  lat: PropTypes.any,
  lng: PropTypes.any
}
