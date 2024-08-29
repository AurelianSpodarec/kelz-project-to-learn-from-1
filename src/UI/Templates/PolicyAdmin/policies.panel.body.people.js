import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { v4 as uuid } from "uuid"
import moment from "moment"
import { capitalize } from "lodash"
import SmallText from "@4cplatform/elements/Typography/SmallText"
import { H4, H3 } from "@4cplatform/elements/Typography"
import Container from "@4cplatform/elements/Atoms/Container"

// Components
import { Divider, TableWrapper, ApplicantsTableWrapper } from "./policies.styles"

const People = ({ data }) => (
  <ApplicantsTableWrapper data-testid="people-tab-wrapper">
    {data?.map(applicant => (
      <Fragment key={uuid()}>
        <H3 data-testid="people-tab-applicant-name" margin="1rem 0" appearance="light">{`${
          applicant.first_name
        } ${applicant.last_name}, ${moment().diff(applicant.date_of_birth, "years")}`}</H3>
        <TableWrapper>
          <Container margin="0" padding="0" width="auto">
            <H4 appearance="light" margin="0rem 0rem 0.25rem 0rem">
              Type
            </H4>
            <SmallText appearance="light"> {capitalize(applicant.type)}</SmallText>
          </Container>
          <Container margin="0" padding="0" width="auto">
            <H4 appearance="light" margin="0rem 0rem 0.25rem 0rem">
              Smoker
            </H4>
            <SmallText appearance="light">
              {applicant.answers?.tobacco_products_within_last_2_years ? "Yes" : "No"}
            </SmallText>
          </Container>
          <Container margin="0" padding="0" width="auto">
            <H4 appearance="light" margin="0rem 0rem 0.25rem 0rem">
              UK Resident
            </H4>
            <SmallText appearance="light">
              {applicant.answers?.permanent_uk_resident ? "Yes" : "No"}
            </SmallText>
          </Container>
          <Container margin="0" padding="0" width="auto">
            <H4 appearance="light" margin="0rem 0rem 0.25rem 0rem">
              Visa
            </H4>
            <SmallText appearance="light">
              {applicant.answers?.pmi_required_to_fulfil_reqs_or_visa ? "Yes" : "No"}
            </SmallText>
          </Container>
        </TableWrapper>
        {data?.length > 1 && <Divider />}
      </Fragment>
    ))}
  </ApplicantsTableWrapper>
)

People.defaultProps = {
  data: []
}

People.propTypes = {
  data: PropTypes.array
}
export default People
