import React from "react"
import GoogleMapReact from "google-map-react"

// Helpers
import { HospitalPreferenceContext } from "./hospitalPreference.context"
import CONFIG from "../../../../../../../../../config"

// Components
import { GoogleMapsWrapper, Skeleton } from "./hospitalPreference.styles"
import HospitalPreferenceMapMarker from "./hospitalPreference.map.marker"
import ZoomButtons from "./hospitalPreference.map.zoom"

const HospitalPreferenceMap = () => {
  const {
    centrePoint,
    clientGeoAddress,
    hospitalsWithDistance,
    handleApiLoaded,
    selectedHospital,
    isDataLoading
  } = React.useContext(HospitalPreferenceContext)

  const getType = hospital => {
    if (hospital.hospital_provider_name === null) {
      return "disabled"
    }
    if (
      hospitalsWithDistance.indexOf(hospital) === 0 &&
      (!selectedHospital || (selectedHospital && selectedHospital.id !== hospital.id))
    ) {
      return "closest"
    }
    if (
      hospitalsWithDistance.indexOf(hospital) === 0 &&
      selectedHospital &&
      selectedHospital.id === hospital.id
    ) {
      return "selected"
    }
    if (selectedHospital && selectedHospital.id === hospital.id) {
      return "selected"
    }
    return "avaliable"
  }

  const renderMarkers = () =>
    hospitalsWithDistance.map((hospital, index) => {
      if (hospital.distance <= 30)
        return (
          <HospitalPreferenceMapMarker
            key={`hospital-${hospital.id}_marker`}
            type={getType(hospital)}
            lat={hospital.latitude}
            lng={hospital.longitude}
            data={hospital}
            index={index}
          />
        )

      return null
    })

  return (
    <GoogleMapsWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: CONFIG.GOOGLE_MAPS_KEY }}
        center={centrePoint}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        defaultZoom={9}
        options={{
          scrollwheel: false,
          fullscreenControl: false,
          zoomControl: false
        }}
        unitSystem="IMPERIAL"
      >
        <HospitalPreferenceMapMarker
          key="client-address_marker"
          lat={clientGeoAddress.lat}
          lng={clientGeoAddress.lng}
          type="client"
        />
        {renderMarkers()}
      </GoogleMapReact>
      {!isDataLoading && <ZoomButtons />}
      {isDataLoading && <Skeleton borderRadius="0" />}
    </GoogleMapsWrapper>
  )
}
export default HospitalPreferenceMap
