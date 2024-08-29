/**
 * Mock response for /journeys/:journey/medical-history GET
 */
export const fakeMedicalHistoryGetResponse = {
  data: {
    page: {
      key: "MEDICAL_HISTORY",
      stage: "FACT_FIND",
      route: "/journeys/eyykf-07331/medical-history",
      conditionals: [],
      data: [],
      title: "Medical history",
      navTitle: "Medical history"
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
      current_page: "MEDICAL_HISTORY",
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
          }
        }
      },
      created_at: "2021-10-12T20:18:19.000000Z",
      updated_at: "2021-10-13T16:10:37.000000Z",
      deleted_at: null
    }
  }
}

/**
 * Mock response for /journeys/:journey/medical-notes GET
 */
export const fakeMedicalHistoryNotesGetResponse = {
  data: [
    {
      id: 0,
      slug: "test",
      journey_id: 0,
      journey_applicant_id: 0,
      condition: "Example",
      applicantName: "John Doe",
      note: "Example medical condition",
      created_at: "2021-11-21T08:08:35.000000Z",
      updated_at: "2021-12-21T10:00:35.000000Z",
      deleted_at: null
    }
  ],
  pagination: { limit: 25, totalItems: 1, totalPages: 1, currentPage: 1 }
}

/**
 * Mock response for /journeys/:journey/applicants GET
 */
export const fakeMedicalHistoryApplicantsResponse = { data: [{ id: 0 }] }
