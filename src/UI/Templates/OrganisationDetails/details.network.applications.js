import React from "react"
import moment from "moment"
import { get, isEmpty } from "lodash"
import { H4, P, SmallText } from "@4cplatform/elements/Typography"
import { Pagination } from "@4cplatform/elements/Molecules"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { OrganisationDetailsContext } from "./details.context"

// Components
import { SidebarSection, ButtonsWrapper, OrgNetworkButton } from "./details.styles"
import { ConfirmationModal } from "../../Molecules"

const MyApplications = () => {
  const {
    data,
    applications,
    withdraw,
    setWithdraw,
    onWithdrawApplication,
    withdrawLoading,
    applicationsLoading,
    applicationsPagination,
    changeApplicationsPage
  } = React.useContext(OrganisationDetailsContext)
  const network = get(data, "network", {})
  const hasNetwork = !isEmpty(network)

  // If no applications are present, do not display the component
  if (isEmpty(applications) || hasNetwork) return null

  return (
    <>
      <H4>Network applications</H4>
      {applications.map((app, i) => (
        <React.Fragment key={app.id}>
          <SidebarSection
            isLast={applications.length - 1 === i}
            data-testid={`my_applications-section_${i}`}
          >
            <P margin="0 0 0.5rem" isLoading={applicationsLoading}>
              {get(app, "network.name", "-")}
            </P>
            <SmallText margin="0 0 0.5rem" isLoading={applicationsLoading}>
              Requested: {moment(get(app, "created_at")).format("DD/MM/YYYY HH:mm")}
            </SmallText>
            <ButtonsWrapper>
              <SmallText
                margin="0"
                colour={get(colours, "tints.secondary.darkBlue.t70")}
                isLoading={applicationsLoading}
              >
                Pending
              </SmallText>
              <OrgNetworkButton
                type="inline-button"
                appearance="errorInline"
                leadingIcon="email-off"
                iconSize="1.5rem"
                hasIconFill={false}
                onClick={() => setWithdraw({ isOpen: true, application: app })}
                name={`my_applications-withdraw_${i}`}
              >
                Withdraw
              </OrgNetworkButton>
            </ButtonsWrapper>
          </SidebarSection>
          {/* Withdraw application modal */}
          {withdraw.isOpen && get(withdraw, "application.id") === get(app, "id") && (
            <ConfirmationModal
              confirmIcon="email-off"
              confirmText="Withdraw application"
              confirmAppearance="error"
              cancelAppearance="errorGhost"
              onClose={() => setWithdraw({ isOpen: false, application: null })}
              onConfirm={() => onWithdrawApplication(get(app, "id", null))}
              isLoadingConfirm={withdrawLoading}
            >
              <P>Are you sure you want to withdraw your application to join the network?</P>
            </ConfirmationModal>
          )}
        </React.Fragment>
      ))}
      <Pagination
        {...applicationsPagination}
        name="my_applications"
        changePage={e => changeApplicationsPage(e)}
        hasPerPage={false}
        hasPageButtons={false}
      />
    </>
  )
}

export default MyApplications
