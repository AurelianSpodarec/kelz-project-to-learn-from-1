/**
 * Mock response for /journeys/:journey/aviva-underwriting-summary GET
 */
export const fakeAvivaUnderwritingSummaryGetResponse = {
  data: {
    page: {
      key: "AVIVA_UNDERWRITING_SUMMARY",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-underwriting-summary",
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
      reference: "MZA2T-30819",
      product_type: "PMI",
      current_page: "AVIVA_UNDERWRITING_SUMMARY",
      simulation_mode: 1,
      locked: false,
      status: "IN_PROGRESS",
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111/consent"
          }
        }
      },
      created_at: "2022-01-31T13:41:32.000000Z",
      updated_at: "2022-01-31T13:44:55.000000Z",
      deleted_at: null
    }
  }
}
