/**
 * Mock /journeys/:slug/consent response
 */
export const fakeAvivaHealthDeclarationPageGetResponse = {
  data: {
    page: {
      key: "AVIVA_HEALTH_DECLARATION",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-health-declaration",
      conditionals: [],
      data: []
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "SYNPH-96666",
      product_type: "PMI",
      current_page: "UNDERWRITING_STYLE",
      simulation_mode: 1,
      locked: true,
      status: "IN_PROGRESS",
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
          },
          INPATIENT_OUTPATIENT: {
            stage: "FACT_FIND",
            order: 5,
            route: "/journeys/abcde-11111/explain-inpatient-outpatient"
          },
          HOSPITAL_PREFERENCE: {
            stage: "FACT_FIND",
            order: 6,
            route: "/journeys/abcde-11111/hospital-preference"
          },
          UNDERWRITING_STYLE: {
            stage: "FACT_FIND",
            order: 7,
            route: "/journeys/abcde-11111/underwriting-style"
          },
          START_DATE_AND_BUDGET: {
            stage: "FACT_FIND",
            order: 8,
            route: "/journeys/abcde-11111/start-date-and-budget"
          }
        }
      },
      created_at: "2022-01-14T07:14:31.000000Z",
      updated_at: "2022-01-17T09:00:09.000000Z",
      deleted_at: null
    }
  }
}
