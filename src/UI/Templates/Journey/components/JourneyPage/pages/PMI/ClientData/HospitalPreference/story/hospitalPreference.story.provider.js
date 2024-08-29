import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"

// Components
import { colours } from "@4cplatform/elements/Helpers"
import { Provider } from ".."

// Helpers
import reducer from "./hospitalPreference.story.reducer"
import {
  fakeHospitalPreferenceClientDetailsGetResponse,
  fakeHospitalsGetResponse
} from "../../../../../../../../../Helpers"

const HospitalPreferenceProvider = ({ children }) => {
  // State
  const [
    {
      hospitals,
      selectedHospital,
      centrePoint,
      clientAddress,
      clientGeoAddress,
      hospitalsWithDistance,
      tablePaginatedData,
      isMapLoading,
      isMapsApiLoaded,
      isDataLoading,
      mapData,
      total,
      page,
      perPage,
      mapApi,
      mapsApi,
      zoomPosition
    },
    dispatch
  ] = React.useReducer(reducer, {
    hospitals: get(fakeHospitalsGetResponse, "data", ""),
    selectedHospital: null,
    clientAddress: get(
      fakeHospitalPreferenceClientDetailsGetResponse,
      "data.journey.client.address",
      ""
    ),
    clientGeoAddress: {},
    centrePoint: {
      lat: 51.5072,
      lng: 0.1276
    },
    hospitalsWithDistance: [],
    tablePaginatedData: [],
    isMapLoading: true,
    isMapsApiLoaded: false,
    mapData: null,
    isDataLoading: true,
    page: 1,
    perPage: 10,
    total: get(fakeHospitalsGetResponse, "data", "").length,
    mapApi: null,
    mapsApi: null,
    zoomPosition: null,
    hospitalsGeoAddressesArray: []
  })

  const getDistance = (originLat1, originLon1, destinationLat2, destinationLon2) => {
    const p = 0.017453292519943295 // Math.PI / 180
    const c = Math.cos
    const a =
      0.5 -
      c((destinationLat2 - originLat1) * p) / 2 +
      (c(originLat1 * p) * c(destinationLat2 * p) * (1 - c((destinationLon2 - originLon1) * p))) / 2
    const distance = Math.round(7917.5117 * Math.asin(Math.sqrt(a)) * 100) / 100 // 2 * R; R = 7917.5117 miles
    return distance
  }

  React.useEffect(() => {
    // initialize services
    if (mapData && clientAddress.postcode) {
      dispatch({
        type: "UPDATE_VALUE",
        key: "mapsApi",
        value: mapData.maps
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "mapApi",
        value: mapData.map
      })
      const zoomPositionObj = mapData.maps.ControlPosition

      dispatch({
        type: "UPDATE_VALUE",
        key: "zoomPosition",
        value: zoomPositionObj
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "centrePoint",
        value: {
          lat: 51.6562001,
          lng: -1.0698764
        }
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "clientGeoAddress",
        value: {
          lat: 51.6562001,
          lng: -1.0698764
        }
      })
    }
  }, [isMapsApiLoaded, mapData, clientAddress])

  React.useEffect(() => {
    if (!isEmpty(clientGeoAddress) && !isEmpty(hospitals)) {
      const withDistance = hospitals
        .map(hospital => ({
          ...hospital,
          distance: getDistance(
            clientGeoAddress.lat,
            clientGeoAddress.lng,
            hospital.latitude,
            hospital.longitude
          )
        }))
        .sort((a, b) => a.distance - b.distance)

      withDistance[0].rowBackground = colours.blue
      withDistance[0].textColor = colours.white

      dispatch({
        type: "UPDATE_VALUE",
        key: "isDataLoading",
        value: false
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "hospitalsWithDistance",
        value: withDistance
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientGeoAddress, hospitals])

  React.useEffect(() => {
    if (!isEmpty(hospitalsWithDistance)) {
      let start = 0
      let end = perPage
      if (page === 1) {
        start = 0
        end = perPage
      } else if (hospitalsWithDistance.length - page * perPage >= perPage) {
        start = (page - 1) * perPage
        end = page * perPage
      } else {
        start = (page - 1) * perPage
        end = hospitalsWithDistance.length
      }
      const val = hospitalsWithDistance.slice(start, end)
      dispatch({ type: "UPDATE_VALUE", key: "tablePaginatedData", value: val })
    }
  }, [page, perPage, hospitalsWithDistance])

  React.useEffect(() => {
    // initialize services
    if (selectedHospital) {
      // checking if the selected hospital is on a different page in table
      let newPage = Math.abs(Math.ceil(hospitalsWithDistance.indexOf(selectedHospital) / perPage))
      newPage = newPage === 0 ? 1 : newPage
      if (newPage !== page) dispatch({ type: "UPDATE_VALUE", key: "page", value: newPage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHospital])

  return (
    <Provider
      value={{
        hospitals,
        selectedHospital,
        centrePoint,
        clientAddress,
        clientGeoAddress,
        hospitalsWithDistance,
        hospitalsLoading: false,
        clientDataLoading: false,
        isDataLoading,
        total,
        page,
        perPage,
        tablePaginatedData,
        mapApi,
        zoomPosition,
        mapsApi,
        handleApiLoaded: (map, maps) => {
          dispatch({ type: "UPDATE_VALUE", key: "mapData", value: { map, maps } })
          dispatch({ type: "UPDATE_VALUE", key: "isMapLoading", vale: !isMapLoading })
        },
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        onHospitalPreferenceSelect: row => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedHospital", value: row })
        },
        onHospitalPreferenceDeselect: () => {
          dispatch({ type: "UPDATE_VALUE", key: "selectedHospital", value: null })
        }
      }}
    >
      {children}
    </Provider>
  )
}

HospitalPreferenceProvider.defaultProps = {
  children: null
}

HospitalPreferenceProvider.propTypes = {
  children: PropTypes.any
}

export default HospitalPreferenceProvider
