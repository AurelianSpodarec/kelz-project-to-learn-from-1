/**
 * Mock /journeys/:slug/consent response
 */
export const fakeConsentGetResponse = {
  data: {
    page: {
      key: "CONSENT_TO_PERSONAL_INFO",
      stage: "FACT_FIND",
      route: "/journeys/abcde-11111/consent",
      conditionals: [],
      data: {
        consent_to_personal_information: true
      }
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "VQE0M-66475",
      product_type: "PMI",
      current_page: "CONSENT_TO_PERSONAL_INFO",
      simulation_mode: true,
      locked: false,
      status: "IN_PROGRESS",
      organisation: {
        id: 999,
        slug: "organisation-1",
        name: "Organisation 1",
        logo_file_path: null,
        company_registration_number: "111111",
        fca_reference: "123456",
        website: "http://website1.com",
        description: "Test organisation 1",
        approved: true,
        bypass_due_diligence: false,
        active: true,
        contact_title: "MR",
        contact_first_name: "John",
        contact_last_name: "Apple",
        contact_email_address: "john@apple.com",
        phone_number: "01234 556677",
        privacy_policy_agreed: false,
        terms_and_conditions_agreed: false,
        completed_due_diligence_at: null,
        joined_network_at: "2021-09-13T13:04:50.000000Z",
        created_at: "2021-09-13T13:04:50.000000Z",
        updated_at: "2021-09-13T13:18:23.000000Z",
        deleted_at: null,
        last_logged_in_at: "2021-09-13T13:18:22.000000Z",
        journey_setting: {
          id: 999,
          consent_text: "Some consent text here",
          exclusion_text: "Some exclusion text here",
          skip_affordable_budget: true
        }
      },
      network: {
        id: 999,
        slug: "network-1",
        name: "Network 1",
        description: "Test network 1",
        company_registration_number: "123456789",
        fca_reference: "123456",
        phone_number: "555-5555-555",
        contact_first_name: "Rachel",
        contact_last_name: "Haynes",
        contact_email_address: "networkOneContact@test.com",
        logo_file_path: null,
        last_logged_in_at: "2021-09-13T13:04:50.000000Z",
        created_at: "2021-09-13T13:04:50.000000Z",
        updated_at: null,
        deleted_at: null,
        settings: {
          consent_text: "This is an example of some consent text",
          exclusion_text: "This is an example of some exclusion text",
          created_at: "2021-09-13T13:04:50.000000Z",
          updated_at: "2021-09-13T13:04:50.000000Z"
        }
      },
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111/consent"
          }
        }
      },
      created_at: "2021-09-13T13:04:50.000000Z",
      updated_at: null,
      deleted_at: null
    }
  }
}
