/**
 * Mock response for /journeys GET
 */
export const fakeJourneysGetResponse = {
  data: [
    {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "WZAD9-87375",
      product_type: "PMI",
      current_page: "CONSENT_TO_PERSONAL_INFO",
      simulation_mode: true,
      locked: true,
      status: "IN_PROGRESS",
      sales_agent: {
        first_name: "Sales",
        middle_names: null,
        last_name: "Adviser 1"
      },
      client: {
        first_name: "John",
        middle_names: "Apple",
        last_name: "Doe"
      },
      created_at: "2021-08-16T11:07:40.000000Z",
      updated_at: null,
      deleted_at: null
    },
    {
      id: 1000,
      slug: "abcde-22222",
      organisation_id: 1000,
      network_id: 1000,
      user_id: 1006,
      client_id: 999,
      reference: "WWNW4-45793",
      product_type: "PMI",
      current_page: "CONSENT_TO_PERSONAL_INFO",
      simulation_mode: true,
      locked: true,
      status: "QUOTED",
      sales_agent: {
        first_name: "Sales",
        middle_names: null,
        last_name: "Adviser 2"
      },
      client: {
        first_name: "John",
        middle_names: "Apple",
        last_name: "Doe"
      },
      created_at: "2021-08-16T11:07:40.000000Z",
      updated_at: null,
      deleted_at: null
    },
    {
      id: 1001,
      slug: "abcde-33333",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "ESGVY-95955",
      product_type: "PMI",
      current_page: "CONSENT_TO_PERSONAL_INFO",
      simulation_mode: true,
      locked: true,
      status: "COMPLETE",
      sales_agent: {
        first_name: "Sales",
        middle_names: null,
        last_name: "Adviser 1"
      },
      client: {
        first_name: "John",
        middle_names: "Apple",
        last_name: "Doe"
      },
      created_at: "2021-08-16T11:07:40.000000Z",
      updated_at: null,
      deleted_at: null
    }
  ]
}
/**
 * Mock response for /journeys/:slug GET
 */
export const fakeJourneyGetResponse = {
  data: {
    page: {
      key: "CLIENT_DETAILS",
      stage: "FACT_FIND",
      route: "/journeys/abcde-11111/client-details",
      data: []
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "LNDED-37568",
      product_type: "PMI",
      current_page: "CLIENT_DETAILS",
      simulation_mode: true,
      locked: true,
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
        joined_network_at: "2021-08-10T15:50:48.000000Z",
        created_at: "2021-08-10T15:50:48.000000Z",
        updated_at: null,
        deleted_at: null,
        last_logged_in_at: null
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
        last_logged_in_at: "2021-08-10T15:50:48.000000Z",
        created_at: "2021-08-10T15:50:48.000000Z",
        updated_at: null,
        deleted_at: null
      },
      sales_agent: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: "QUEUE_WORKER",
        parent: {
          id: 45,
          name: "The Cure",
          type: "PROVIDER"
        },
        first_name: "Robert",
        middle_names: "James",
        last_name: "Smith",
        mobile: 98676876,
        two_factor_auth: "authenticator",
        google_2fa_secret: "5VQUV6K5SEJZLWQ",
        email_verified_at: "2018-02-10T09:30Z",
        password_expires_at: "2018-02-10T09:30Z",
        simulation_mode: true,
        active: true,
        locked: false,
        created_at: "2018-02-10T09:30Z"
      },
      client: {
        id: 999,
        first_name: "John",
        middle_names: "Apple",
        last_name: "Doe",
        created_at: "2021-08-10T15:50:50.000000Z",
        updated_at: null,
        deleted_at: null
      },
      data: {
        consent_to_personal_information: true
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
      created_at: "2021-08-10T15:50:50.000000Z",
      updated_at: "2021-08-11T13:38:12.000000Z",
      deleted_at: null
    }
  }
}
