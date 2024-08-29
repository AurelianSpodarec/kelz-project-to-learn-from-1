import React from "react"
import { get } from "lodash"

// Components
import JourneyForm from "../../../../../JourneyForm"
import MedicalHistoryProvider from "./context/medicalHistory.provider"
import MedicalNotes from "./medicalHistory.notes"
// Helpers
import { JourneyContext } from "../../../../../../journey.context"

const MedicalHistory = () => {
  const { data } = React.useContext(JourneyContext)

  const sections = get(data, "page.sections")

  return (
    <MedicalHistoryProvider>
      <JourneyForm sections={sections} />
      <MedicalNotes />
    </MedicalHistoryProvider>
  )
}

export default MedicalHistory
