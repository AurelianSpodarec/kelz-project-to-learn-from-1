/**
 * Mock response for /journeys/:journey/aviva-renewal-commission GET
 */
export const fakeAvivaRenewalCommissionResponse = {
  data: {
    page: {
      key: "AVIVA_RENEWAL_COMMISSION",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-renewal-commission",
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
      reference: "KXABB-95656",
      product_type: "PMI",
      current_page: "CLIENT_DETAILS",
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
      created_at: "2021-12-02T11:43:00.000000Z",
      updated_at: "2021-12-02T11:48:40.000000Z",
      deleted_at: null
    }
  }
}
