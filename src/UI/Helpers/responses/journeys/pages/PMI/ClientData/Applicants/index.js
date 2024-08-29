/**
 * Mock response for /journeys/:journey/applicant-details GET
 */
export const fakeApplicantsPageGetResponse = {
  data: {
    page: {
      key: "APPLICANTS",
      stage: "FACT_FIND",
      route: "/journeys/abcde-11111/applicant-details",
      conditionals: {
        has_access_to_axa_agency_codes: true
      },
      data: []
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "EPQEC-91037",
      product_type: "PMI",
      current_page: "CONSENT_TO_PERSONAL_INFO",
      simulation_mode: true,
      locked: true,
      status: "IN_PROGRESS",
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111/consent"
          },
          CLIENT_DETAILS: {
            stage: "FACT_FIND",
            order: 1,
            route: "/journeys/abcde-11111/client-details"
          },
          APPLICANTS: {
            stage: "FACT_FIND",
            order: 2,
            route: "/journeys/abcde-11111/applicant-details"
          }
        }
      },
      created_at: "2021-09-22T12:04:18.000000Z",
      updated_at: null,
      deleted_at: null
    }
  }
}

/**
 * Mock response for /journeys/:journey/applicants GET
 */
export const fakeApplicantsGetResponse = {
  data: [
    {
      title: "CAPT",
      first_name: "James",
      middle_names: "Tiberius",
      last_name: "Kirk",
      gender_at_birth: "MALE",
      email_address: "OGCAP@yahoo.com",
      occupation: "Other",
      date_of_birth: "1998-02-10T09:30Z",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      included: true,
      slug: "james-t",
      type: "primary"
    },
    {
      title: "CAPT",
      first_name: "Jean Luc",
      middle_names: "",
      last_name: "Picard",
      gender_at_birth: "MALE",
      email_address: "boldly_go@gmail.com",
      occupation: "Other",
      date_of_birth: "1959-02-10T09:30Z",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      included: false,
      slug: "jl-picard",
      type: "partner"
    }
  ],
  pagination: {
    limit: 88,
    totalItems: 21,
    totalPages: 47,
    currentPage: 95
  }
}

/**
 * Mock response for /journeys/:journey/aliases GET
 */
export const fakeAliasGetResponse = {
  data: [
    {
      id: 999,
      slug: "john-doe",
      title: "MR",
      first_name: "John",
      middle_names: "Apple",
      last_name: "Doe",
      created_at: "2021-09-24T10:57:42.000000Z",
      updated_at: "2021-09-24T10:57:42.000000Z",
      address: {
        id: 8,
        type: "PRIMARY",
        line_one: "456 Bleaker Street",
        line_two: null,
        city: "Oxford",
        county: "Oxfordshire",
        postcode: "OX53 2KF",
        created_at: "2021-09-24T10:57:43.000000Z",
        updated_at: "2021-09-24T10:57:43.000000Z",
        deleted_at: null
      }
    }
  ],
  pagination: {
    limit: 25,
    totalItems: 1,
    totalPages: 1,
    currentPage: 1
  }
}
