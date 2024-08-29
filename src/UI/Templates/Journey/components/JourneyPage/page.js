import React from "react"
import { get, isNull } from "lodash"
import { H2, P } from "@4cplatform/elements/Typography"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { getJourneyPageComponent } from "./page.helpers"
import { JourneyContext } from "../../journey.context"

// Components
import { PageWrapper, LockedWrapper, LockedIcon } from "./page.styles"

const JourneyPage = () => {
  const { data, isLoading } = React.useContext(JourneyContext)
  const isLocked = get(data, "journey.locked", false)
  const page = get(data, "page", null)
  const title = get(page, "title")
  const subtitle = get(page, "subtitle")
  const key = get(page, "key")
  const PageComponent = getJourneyPageComponent(key)

  return (
    <PageWrapper>
      {isLocked && (
        <LockedWrapper>
          <P fontSize="1.6rem" appearance="light" margin="0.5rem 0.5rem 1rem">
            Journey locked
          </P>
          <P fontSize="1.4rem" appearance="light" margin="0 0.5rem 0.5rem">
            The journey is locked and cannot be changed.
          </P>
          <LockedIcon>
            <Icon icon="lock" colour={colours.white} />
          </LockedIcon>
        </LockedWrapper>
      )}
      <H2
        margin="0 0 1rem"
        data-testid="journey_page-title"
        isLoading={isNull(get(data, "page")) || isLoading}
      >
        {title}
      </H2>
      <P
        data-testid="journey_page-subtitle"
        isLoading={isNull(get(data, "page")) || isLoading}
        loadingLines={24}
      >
        {subtitle}
      </P>
      {!isLoading && <PageComponent />}
    </PageWrapper>
  )
}

export default JourneyPage
