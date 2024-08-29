import React, { useContext, useState } from "react"
import { get } from "lodash"
import { H2, H3 } from "@4cplatform/elements/Typography"
import { Checkbox } from "@4cplatform/elements/Forms"
import { Skeleton, Button } from "@4cplatform/elements/Molecules"

// Helpers
import { OrganisationSettingsContext } from "./organisationSettings.context"

// Components
import { SettingsWrapper } from "./organisationSettings.styles"
import { TextSetting } from "../../Organisms"
import {
  Wrapper,
  Header,
  Content,
  LoadingWrapper
} from "../../Organisms/TextSetting/setting.styles"

const JourneySettings = () => {
  const {
    journeyData,
    journeyLoading,
    onJourneyUpdate,
    updateJourneyLoading,
    onRevertConsent,
    revertConsentLoading,
    onRevertExclusion,
    revertExclusionLoading
  } = useContext(OrganisationSettingsContext)
  const [editConsent, setEditConsent] = useState(false)
  const [editExclusion, setEditExclusion] = useState(false)

  const isLoading =
    journeyLoading || updateJourneyLoading || revertConsentLoading || revertExclusionLoading

  return (
    <SettingsWrapper>
      <H2 margin="0 0 3rem">Client Journey</H2>
      <TextSetting
        margin="0"
        name="consent_text"
        title="Consent Text"
        contentLabel="Description"
        content={get(journeyData, "consent_text", "")}
        onSubmit={val => {
          onJourneyUpdate({ ...journeyData, consent_text: get(val, "consent_text", "") })
          setEditConsent(false)
        }}
        helperText="If your organisation has its own script that it would like to be used when confirming that a client has given 'consent to use personal information' then insert it here. This will then be displayed for all users within your organisation when they visit this page and they will need to confirm the client has understood it before they will be able to progress."
        isEdit={editConsent}
        setEdit={setEditConsent}
        isLoading={isLoading}
        hasDelete={false}
      />
      <Button
        isLoading={isLoading}
        margin="0 0 2rem"
        iconSize="1.2rem"
        leadingIcon="undo-variant"
        type="inline-button"
        appearance="primaryInline"
        onClick={onRevertConsent}
        name="revert_consent_text"
      >
        Revert consent text to default
      </Button>
      <TextSetting
        margin="0"
        name="exclusion_text"
        title="Exclusion Text"
        contentLabel="Description"
        content={get(journeyData, "exclusion_text", "")}
        onSubmit={val => {
          onJourneyUpdate({ ...journeyData, exclusion_text: get(val, "exclusion_text", "") })
          setEditExclusion(false)
        }}
        helperText="If your organisation has its own script that it would like to be used when explaining limited product disclosure and general exclusions, you can insert it here. This will then be displayed for all users within your organisation when they visit the final compliance page. They will need to confirm the client has understood them all before they will be able to onboard the policy."
        isEdit={editExclusion}
        setEdit={setEditExclusion}
        isLoading={isLoading}
        hasDelete={false}
      />
      <Button
        isLoading={isLoading}
        margin="0 0 2rem"
        iconSize="1.2rem"
        leadingIcon="undo-variant"
        type="inline-button"
        appearance="primaryInline"
        onClick={onRevertExclusion}
        name="revert_exclusion_text"
      >
        Revert exclusion text to default
      </Button>
      <Wrapper>
        <Header>
          <H3
            helperText="Permit an adviser to skip affordable budget fact-find"
            helperPosition="left"
            margin="0.5rem 0"
            isLoading={isLoading}
          >
            Selling Options
          </H3>
        </Header>
        <Content>
          {isLoading && <Skeleton count={3} wrapper={LoadingWrapper} />}
          {!isLoading && (
            <Checkbox
              name="skip_affordable_budget"
              margin="1rem 0 1rem"
              label="Skip affordable budget fact-find"
              value={get(journeyData, "skip_affordable_budget", false)}
              onChange={val => onJourneyUpdate({ ...journeyData, skip_affordable_budget: val })}
            />
          )}
        </Content>
      </Wrapper>
    </SettingsWrapper>
  )
}

export default JourneySettings
