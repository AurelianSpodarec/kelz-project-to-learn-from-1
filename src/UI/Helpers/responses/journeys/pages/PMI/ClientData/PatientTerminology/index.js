/**
 * Mock response for /journeys/:journey/explain-inpatient-outpatient GET
 */
export const fakePatientTerminologyGetResponse = {
  data: {
    page: {
      key: "INPATIENT_OUTPATIENT",
      stage: "FACT_FIND",
      route: "/journeys/eyykf-07331/explain-inpatient-outpatient",
      conditionals: [],
      data: [],
      title: "Explain patient terminology",
      navTitle: "Explain patient terminology"
    },
    journey: {
      id: 1007,
      slug: "eyykf-07331",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "EYYKF-07331",
      product_type: "PMI",
      current_page: "INPATIENT_OUTPATIENT",
      simulation_mode: false,
      locked: false,
      status: "IN_PROGRESS",
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/eyykf-07331/consent"
          },
          CLIENT_DETAILS: {
            stage: "FACT_FIND",
            order: 1,
            route: "/journeys/eyykf-07331/client-details"
          },
          APPLICANTS: {
            stage: "FACT_FIND",
            order: 2,
            route: "/journeys/eyykf-07331/applicant-details"
          },
          CURRENT_POLICY_DETAILS: {
            stage: "FACT_FIND",
            order: 3,
            route: "/journeys/eyykf-07331/current-policy-details"
          },
          CURRENT_POLICY_OPTIONS: {
            stage: "FACT_FIND",
            order: 4,
            route: "/journeys/eyykf-07331/current-policy-options"
          },
          CLAIMS_HISTORY: {
            stage: "FACT_FIND",
            order: 5,
            route: "/journeys/eyykf-07331/claims-history"
          },
          MEDICAL_HISTORY: {
            stage: "FACT_FIND",
            order: 6,
            route: "/journeys/eyykf-07331/medical-history"
          },
          INPATIENT_OUTPATIENT: {
            stage: "FACT_FIND",
            order: 6,
            route: "/journeys/eyykf-07331/explain-inpatient-outpatient"
          }
        }
      },
      created_at: "2021-10-12T20:18:19.000000Z",
      updated_at: "2021-10-13T16:10:37.000000Z",
      deleted_at: null
    }
  }
}
