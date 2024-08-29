/**
 * Mock response for /journeys/:journey/hospital-list-confirmation GET
 */
export const fakeHospitalListConfirmationGetResponse = {
  data: {
    page: {
      key: "HOSPITAL_LIST_CONFIRMATION",
      stage: "QUOTE",
      route: "/journeys/abcde-11111-2/hospital-list-confirmation",
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
      reference: "MWB3M-89850",
      product_type: "PMI",
      current_page: "QUOTE_OVER_BUDGET",
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
      created_at: "2022-02-10T18:28:27.000000Z",
      updated_at: "2022-02-15T00:56:00.000000Z",
      deleted_at: null
    }
  }
}
