import React, { useContext } from "react"
import { get } from "lodash"
import { H2, H3, P } from "@4cplatform/elements/Typography"
import { Toggle } from "@4cplatform/elements/Forms"
import { Skeleton } from "@4cplatform/elements/Molecules"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { OrganisationOnboardingContext } from "./organisationOnboarding.context"

// Components
import { IconWithText } from "../../Atoms"
import { DiligenceWrapper, DiligenceBodyWrapper } from "./organisationOnboarding.styles"

const DueDiligence = () => {
  const { organisation, organisationLoading, data, loading, onComplete, completeLoading } =
    useContext(OrganisationOnboardingContext)
  const isLoading = loading || organisationLoading

  const isApproved = get(organisation, "approved", false)
  const bypassDueDiligence = get(organisation, "bypass_due_diligence", false)

  return (
    <DiligenceWrapper>
      <H2 margin={isLoading ? "0 0 3rem" : "0"} isLoading={isLoading}>
        Due Diligence Checklist
      </H2>
      {!isLoading &&
        data.map(item => {
          const value = get(item, "complete", false)

          return (
            <div key={item.id}>
              <H3 isLoading={isLoading}>{get(item, "title", "-")}</H3>
              <DiligenceBodyWrapper>
                <IconWithText
                  icon={item.complete ? "check-circle" : "close-circle"}
                  iconColour={item.complete ? colours.green : colours.lightGrey}
                  margin="0 0.8rem 0 0"
                />

                <Toggle
                  label={get(item, "description", "-")}
                  name={`due_diligence_item_${get(item, "id")}`}
                  options={[
                    { label: "", value: false },
                    { label: "", value: true }
                  ]}
                  labelWidth="70rem"
                  value={!!value}
                  isDisabled={
                    completeLoading || isLoading || isApproved || !!bypassDueDiligence || !!value
                  }
                  onChange={() => onComplete(item)}
                  isHorizontal
                />
              </DiligenceBodyWrapper>
            </div>
          )
        })}
      {isLoading && <Skeleton wrapper={P} count={8} lineHeight="10rem" />}
    </DiligenceWrapper>
  )
}

export default DueDiligence
