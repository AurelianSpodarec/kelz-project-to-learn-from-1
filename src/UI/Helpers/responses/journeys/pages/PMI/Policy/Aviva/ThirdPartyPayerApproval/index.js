/**
 * Mock response for /journeys/:journey/aviva-third-party-payer-approval GET
 */
export const fakeAvivaThirdPartyPayerApprovalGetResponse = {
  data: {
    page: {
      key: "AVIVA_THIRD_PARTY_PAYER_APPROVAL",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-third-party-payer-approval",
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
      reference: "MKR4L-71365",
      product_type: "PMI",
      current_page: "AVIVA_THIRD_PARTY_PAYER_ACCOUNT_TYPE",
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
      created_at: "2022-02-02T14:31:47.000000Z",
      updated_at: "2022-02-08T02:13:37.000000Z",
      deleted_at: null
    }
  }
}
