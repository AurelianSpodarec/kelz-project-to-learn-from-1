/**
 * Mock response for /journeys/:journey/claims-history GET
 */
export const fakeClaimsHistoryGetResponse = {
  data: {
    page: {
      key: "CLAIMS_HISTORY",
      stage: "FACT_FIND",
      route: "/journeys/abcde-11111/claims-history",
      conditionals: {
        has_access_to_axa_agency_codes: true
      },
      data: {
        years_covered: 8,
        claims_last_five_years: "1 Claim",
        date_of_last_claim: "Within 5 Years",
        visited: true,
        axa_anyone_planned_or_pending: false,
        axa_anyone_received_treatment_or_consultation_in_last_12_months: true
      }
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "BSXG4-59627",
      product_type: "PMI",
      current_page: "CLAIMS_HISTORY",
      simulation_mode: 1,
      locked: false,
      status: "IN_PROGRESS",
      applicants: [
        {
          id: 999,
          slug: "john-doe",
          journey_id: 999,
          type: "primary",
          included: true,
          policy_holder: true,
          title: "MR",
          first_name: "John",
          middle_names: "Apple",
          email_address: "test1@test.com",
          last_name: "Doe",
          gender_at_birth: "male",
          child: 0,
          date_of_birth: "1992-03-11T00:00:00.000000Z",
          data: {
            permission_to_add_member: true,
            permanent_uk_resident: true,
            covered_with_a_gp_and_access_to_medical_records: true,
            pmi_required_to_fulfil_reqs_or_visa: false,
            tobacco_products_within_last_2_years: true,
            last_5_years_heart_condition_or_heart_problem: false,
            last_5_years_stroke: false,
            last_5_years_cancer: false,
            last_5_years_diabetes: false,
            last_5_years_mental_illness: false,
            axa_anyone_planned_or_pending: false,
            axa_anyone_received_treatment_or_consultation_in_last_12_months: false,
            years_covered: 8,
            claims_last_five_years: "1 Claim",
            date_of_last_claim: "Within 5 Years",
            visited: true
          }
        }
      ],
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111/consent"
          },
          CLIENT_DETAILS: {
            stage: "FACT_FIND",
            order: 1,
            route: "/journeys/abcde-11111/client-details"
          },
          APPLICANTS: {
            stage: "FACT_FIND",
            order: 2,
            route: "/journeys/abcde-11111/applicant-details"
          },
          CURRENT_POLICY_DETAILS: {
            stage: "FACT_FIND",
            order: 3,
            route: "/journeys/abcde-11111/current-policy-details"
          },
          MEDICAL_HISTORY: {
            stage: "FACT_FIND",
            order: 4,
            route: "/journeys/abcde-11111/medical-history"
          }
        }
      },
      created_at: "2022-03-11T09:07:16.000000Z",
      updated_at: "2022-03-11T11:26:33.000000Z",
      deleted_at: null
    }
  }
}
