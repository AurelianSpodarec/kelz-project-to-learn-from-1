import React from "react"
import { get } from "lodash"

// Components
import JourneyForm from "../../../JourneyForm"

// Helpers
import { JourneyContext } from "../../../../journey.context"

const DynamicPage = () => {
  const { data } = React.useContext(JourneyContext)

  const sections = get(data, "page.sections")
  return <JourneyForm sections={sections} />
}

export default DynamicPage
