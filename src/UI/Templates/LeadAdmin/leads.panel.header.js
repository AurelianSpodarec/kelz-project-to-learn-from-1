import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { get, upperFirst, capitalize } from "lodash"
import moment from "moment"
import { Button } from "@4cplatform/elements/Molecules"
import { H2, SmallText } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { ConfigContext } from "@4cplatform/elements/Config"

// Components
import { IconWithText, LabelWithText } from "../../Atoms"
import {
  HeaderContentWrapper,
  UserInfoWrapper,
  DispositionWrapper,
  EditButtonsWrapper
} from "./leads.styles"
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import DeleteLead from "./leads.panel.header.delete"
import TransferLead from "./leads.panel.header.transfer"
import Disposition from "./leads.panel.header.disposition"

// Helpers
import { PageContext } from "../../Organisms"
import { getName } from "../../Helpers"
import { LeadsContext } from "./leads.context"
import { getTypeIcon, getGenderIcon } from "./leads.helpers"

const LeadsPanelHeader = ({ selectedLead, context }) => {
  const [title, setTitle] = useState("")
  const { GLOBAL_TITLES } = useContext(ConfigContext)
  const { setPanelStatus } = useContext(PageContext)
  const { selectLoading, config, users } = useContext(LeadsContext)
  const leadName = getName({ data: { ...selectedLead, title }, hasTitle: true })

  const sources = get(config, "source", {})
  const dispositions = get(config, "disposition", {})
  const disposition = dispositions[get(selectedLead, "disposition.disposition")]
  const note = get(selectedLead, "disposition.note")
  const isLeadDeleted = !!get(selectedLead, "deleted_at")

  useEffect(() => {
    setTitle({ label: GLOBAL_TITLES?.data?.[selectedLead.title]?.title })
  }, [GLOBAL_TITLES, selectedLead.title])

  return (
    <PanelHeader isDeleted={isLeadDeleted}>
      {/* Title/Subtitle */}
      <H2 margin="1rem 0" appearance="light" isLoading={selectLoading}>
        {leadName}
      </H2>
      <SmallText appearance="light" isLoading={selectLoading}>
        {`Created: ${moment(get(selectedLead, "created_at"), "YYYY-MM-DD HH:mm").format(
          "DD/MM/YY HH:mm"
        )}`}
      </SmallText>

      <HeaderContentWrapper context={context}>
        <UserInfoWrapper>
          {/* User Info */}
          <IconWithText
            icon={getTypeIcon(get(selectedLead, "type", "PMI"))}
            appearance="light"
            content={`${get(selectedLead, "type", "PMI")}, ${
              sources[get(selectedLead, "lead_source")]
            }`}
            margin="0 0 1rem"
            isLoading={selectLoading}
          />
          <IconWithText
            icon={getGenderIcon(get(selectedLead, "gender_at_birth"))}
            appearance="light"
            content={upperFirst(get(selectedLead, "gender_at_birth"))}
            margin="0 0 1rem"
            isLoading={selectLoading}
          />

          {/* Contact Info */}
          <IconWithText
            icon="email"
            appearance="light"
            content={get(selectedLead, "email_address", "-")}
            margin="0 0 1rem"
            isLoading={selectLoading}
          />

          {get(selectedLead, "phone_numbers", []).map((phone, i) => {
            const { type, number } = phone
            return (
              <IconWithText
                key={`${type}-${number}-${i}`}
                icon="phone"
                appearance="light"
                content={`${number} (${capitalize(type)})`}
                margin="0 0 1rem"
                isLoading={selectLoading}
              />
            )
          })}
        </UserInfoWrapper>

        {/* Disposition */}
        {!isLeadDeleted && (
          <DispositionWrapper context={context}>
            <LabelWithText
              label="Disposition"
              content={`${disposition}${note ? `: ${note}` : ""}`}
              appearance="light"
              isLoading={selectLoading}
            />
          </DispositionWrapper>
        )}

        {/* View Actions */}
        {context === "open" && !isLeadDeleted && (
          <div>
            <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN", "SALES_ADVISER"]}>
              <Button
                appearance="whiteGhost"
                margin="0 2rem 0 0"
                trailingIcon="pencil"
                onClick={() => setPanelStatus("wide")}
                isDisabled={selectLoading}
                name="edit_lead"
              >
                Edit lead
              </Button>
              <Disposition />
            </AuthWrapper>
          </div>
        )}
      </HeaderContentWrapper>
      {/* Edit Actions */}
      {context === "wide" && (
        <EditButtonsWrapper>
          <AuthWrapper roles={["SYS_ADMIN", "ORG_ADMIN", "SALES_ADVISER"]}>
            <DeleteLead />
          </AuthWrapper>
          <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]}>
            <TransferLead users={users} />
          </AuthWrapper>
        </EditButtonsWrapper>
      )}
    </PanelHeader>
  )
}

LeadsPanelHeader.propTypes = {
  selectedLead: PropTypes.object,
  context: PropTypes.oneOf(["open", "wide"]).isRequired
}

export default LeadsPanelHeader
