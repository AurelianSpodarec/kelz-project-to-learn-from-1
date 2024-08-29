/**
 * Mock response for /journeys/:journey/underwriting-style GET
 */
export const fakeUnderwritingStyleGetResponse = {
  data: {
    page: {
      key: "UNDERWRITING_STYLE",
      stage: "FACT_FIND",
      route: "/journeys/abcde-11111/underwriting-style",
      conditionals: [],
      data: {
        recommended_style: "NEW",
        recommended_underwriting: "MORI",
        recommended_underwriting_note: "some text",
        visited: true
      }
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "WTC71-54312",
      product_type: "PMI",
      current_page: "START_DATE_AND_BUDGET",
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
      created_at: "2022-02-23T17:40:23.000000Z",
      updated_at: "2022-02-28T01:02:14.000000Z",
      deleted_at: null
    }
  }
}
