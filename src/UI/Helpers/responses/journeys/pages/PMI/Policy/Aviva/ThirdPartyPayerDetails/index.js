/**
 * Mock response for /journeys/:journey/aviva-third-party-payer-details GET
 */
export const fakeAvivaThirdPartyPayerDetailsGetResponse = {
  data: {
    page: {
      key: "AVIVA_THIRD_PARTY_PAYER_DETAILS",
      stage: "POLICY",
      route: "/journeys/abcde-11111-2/aviva-third-party-payer-details",
      conditionals: [],
      data: []
    },
    journey: {
      id: 999,
      slug: "abcde-11111-2",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "HXKDJ-56732",
      product_type: "PMI",
      current_page: "AVIVA_THIRD_PARTY_PAYER_DETAILS",
      simulation_mode: 1,
      locked: false,
      status: "IN_PROGRESS",
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111-2/consent"
          }
        }
      },
      created_at: "2022-02-08T16:57:21.000000Z",
      updated_at: null,
      deleted_at: null
    }
  }
}
