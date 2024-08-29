import React from "react"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { P, H3, H4 } from "@4cplatform/elements/Typography"

// Components
import ApplicantsTable from "./applicants.table"
import Actions from "./applicants.actions"
import Alias from "./applicants.alias"
import IncludedTable from "./applicants.included"

const Body = () => (
  <>
    <ComplianceNote type="error">
      <H4 margin="0 0 1rem">Compliance note</H4>
      <P margin="0">
        You need to confirm with the client that you have permission to add the additional member(s)
        and they also have permission to discuss the quote on their behalf.
      </P>
    </ComplianceNote>
    <H3 margin="0 0 2rem">Collect details of all persons to be quoted</H3>
    <ApplicantsTable />
    <Actions />
    <Alias />
    <H3>Applicants to be quoted</H3>
    <IncludedTable />
  </>
)

export default Body
