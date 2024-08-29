/**
 * Mock response for /journeys/:journey/aviva-switch-declaration GET
 */
export const fakeAvivaSwitchDeclarationConfirmationGetResponse = {
  data: {
    page: {
      key: "AVIVA_SWITCH_DECLARATION",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-switch-declaration",
      conditionals: [],
      data: {
        client_consents_to_obtaining_medical_report: true,
        do_any_members_wish_to_see_medical_report: true,
        client_consents_to_communications_about_other_products: true,
        client_consents_to_marketing: true,
        client_compiles_with_the_declaration: true
      }
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
      current_page: "AVIVA_SWITCH_DISCLOSURES",
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
      updated_at: null,
      deleted_at: null
    }
  }
}
