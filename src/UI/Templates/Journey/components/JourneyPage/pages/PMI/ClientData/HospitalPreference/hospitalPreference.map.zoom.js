import React from "react"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { HospitalPreferenceContext } from "./hospitalPreference.context"

// Components
import { ZoomButtonsWrapper } from "./hospitalPreference.styles"

const ZoomButtons = () => {
  const { mapApi } = React.useContext(HospitalPreferenceContext)

  const handleOnClick = operation => {
    const currentZoomLevel = mapApi.getZoom()
    switch (operation) {
      case "out":
        if (currentZoomLevel !== 0) mapApi.setZoom(currentZoomLevel - 1)
        break
      case "in":
        if (currentZoomLevel !== 21) mapApi.setZoom(currentZoomLevel + 1)
        break
      default:
        break
    }
  }

  return (
    <ZoomButtonsWrapper index="1">
      <Button type="inline-button" leadingIcon="minus" onClick={() => handleOnClick("out")} />
      <Button type="inline-button" leadingIcon="plus" onClick={() => handleOnClick("in")} />
    </ZoomButtonsWrapper>
  )
}

export default ZoomButtons
