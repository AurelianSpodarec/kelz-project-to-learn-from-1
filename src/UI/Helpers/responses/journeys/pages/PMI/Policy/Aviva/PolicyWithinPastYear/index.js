/**
 * Mock response for /journeys/:journey/aviva-pmi-policy-within-past-year GET
 */
export const fakeAvivaPolicyWithinPastYearGetResponse = {
  data: {
    page: {
      key: "AVIVA_PMI_POLICY_WITHIN_PAST_YEAR",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-pmi-policy-within-past-year",
      conditionals: [],
      data: {
        anyone_covered_insured_under_an_aviva_pmi_policy_within_the_past_twelve_months: true,
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
      reference: "PQZM3-87015",
      product_type: "PMI",
      current_page: "AVIVA_RENEWAL_COMMISSION",
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
      created_at: "2021-11-29T11:09:09.000000Z",
      updated_at: "2021-12-01T15:14:37.000000Z",
      deleted_at: null
    }
  }
}
