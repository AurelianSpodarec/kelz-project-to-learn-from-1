/**
 * Mock /journeys/:slug/client-details GET response
 */
export const fakeClientDetailsGetResponse = {
  data: {
    page: {
      key: "CLIENT_DETAILS",
      stage: "FACT_FIND",
      route: "/journeys/mfltv-24907/client-details",
      conditionals: {
        has_access_to_axa_agency_codes: true
      },
      data: []
    },
    journey: {
      id: 1006,
      slug: "mfltv-24907",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "MFLTV-24907",
      product_type: "PMI",
      current_page: "CLIENT_DETAILS",
      simulation_mode: false,
      locked: false,
      status: "IN_PROGRESS",
      client: {
        id: 999,
        first_name: "John",
        middle_names: "Apple",
        last_name: "Doe",
        date_of_birth: "1986-09-21T00:00:00.000000Z",
        gender_at_birth: "Male",
        email_address: "john.doe@example.test",
        occupation: null,
        created_at: "2021-09-21T09:34:43.000000Z",
        updated_at: null,
        deleted_at: null,
        address: {
          id: 6,
          type: "PRIMARY",
          line_one: "456 Ox Street",
          line_two: null,
          city: "Oxford",
          county: "Oxfordshire",
          postcode: "OX53 2KF",
          created_at: "2021-09-21T09:34:44.000000Z",
          updated_at: "2021-09-21T09:34:44.000000Z",
          deleted_at: null
        },
        phone_numbers: [
          {
            id: 999,
            number: "123456789",
            type: "PRIMARY"
          }
        ]
      },
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/eyykf-07331/consent"
          },
          CLIENT_DETAILS: {
            stage: "FACT_FIND",
            order: 1,
            route: "/journeys/eyykf-07331/client-details"
          }
        }
      },
      created_at: "2021-09-22T10:00:22.000000Z",
      updated_at: "2021-09-22T10:01:29.000000Z",
      deleted_at: null
    }
  }
}
