/**
 * Mock response for /policies GET
 */
export const fakePoliciesGetResponse = {
  data: [
    {
      id: 999,
      slug: "john-apple-doe",
      reference: "reference-1",
      status: "AWAITING_TERMS",
      policy_number: "123",
      product_name: "Product One",
      monthly_premium: "74.23",
      annual_premium: "890.76",
      applicants: [
        {
          type: "partner",
          title: "MRS",
          first_name: "Jane",
          middle_names: null,
          last_name: "Appleseed",
          date_of_birth: "1994-04-28",
          answers: {
            permission_to_add_member: true,
            permanent_uk_resident: true,
            covered_with_a_gp_and_access_to_medical_records: true,
            pmi_required_to_fulfil_reqs_or_visa: false,
            tobacco_products_within_last_2_years: true,
            last_5_years_heart_condition_or_heart_problem: false,
            last_5_years_stroke: false,
            last_5_years_cancer: false,
            last_5_years_diabetes: false,
            last_5_years_mental_illness: false,
            axa_anyone_planned_or_pending: false,
            axa_anyone_received_treatment_or_consultation_in_last_12_months: false
          }
        }
      ],
      months_of_cover: 3,
      underwriting_declined_reason: null,
      declined_reason: null,
      created_at: "2021-08-16T11:07:40.000000Z",
      updated_at: null,
      deleted_at: null,
      client: {
        id: 999,
        first_name: "John",
        middle_names: "Apple",
        last_name: "Doe",
        created_at: "2021-08-16T11:07:40.000000Z",
        updated_at: null,
        deleted_at: null
      },
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
        joined_network_at: "2021-08-16T11:07:39.000000Z",
        created_at: "2021-08-16T11:07:39.000000Z",
        updated_at: null,
        deleted_at: null,
        last_logged_in_at: null
      },
      sales_agent: {
        id: 1005,
        slug: "sales-adviser-1",
        title: {
          key: "LORD",
          label: "Lord",
          gender: "Male"
        },
        role: {
          id: 2,
          name: "SALES_ADVISER"
        },
        parent: {
          id: 999,
          name: "Organisation 1",
          slug: "organisation-1",
          parent: {
            id: 999,
            name: "Network 1",
            slug: "network-1",
            parent: null,
            type: "NETWORK"
          },
          type: "ORGANISATION"
        },
        first_name: "Sales",
        middle_names: null,
        last_name: "Adviser 1",
        email: "salesadviser1@test.com",
        mobile: null,
        email_verified_at: "2021-08-16T11:07:40.000000Z",
        active: true,
        locked: false,
        created_at: "2021-08-16T11:07:40.000000Z",
        deleted_at: null,
        last_logged_in_at: null
      },
      provider: {
        id: 999,
        slug: "provider-1",
        provider_key: "AVIVA",
        name: "Provider 1",
        registration_number: "10342",
        abbreviation: "avi",
        description: "Description of the provider",
        website: "www.testprovider.co.uk",
        last_logged_in_at: null,
        logo_file_path: null,
        created_at: "2021-08-16T11:07:39.000000Z",
        updated_at: null,
        deleted_at: null
      },
      exclusions: [
        {
          id: 999,
          applicant_name: "John Doe",
          exclusion: "Exclusion Example",
          created_at: "2021-08-16T11:07:40.000000Z",
          updated_at: null,
          deleted_at: null
        },
        {
          id: 1000,
          applicant_name: "John Doe",
          exclusion: "Test",
          created_at: "2021-08-16T21:27:00.000000Z",
          updated_at: "2021-08-16T21:27:00.000000Z",
          deleted_at: null
        },
        {
          id: 1001,
          applicant_name: "John Doe",
          exclusion: "Test",
          created_at: "2021-08-19T16:23:59.000000Z",
          updated_at: "2021-08-19T16:23:59.000000Z",
          deleted_at: null
        }
      ]
    }
  ],
  pagination: {
    totalItems: 15
  }
}

/**
 * Mock response for /policies/:slug GET
 */
export const fakePolicyGetResponse = {
  data: {
    id: 999,
    slug: "john-apple-doe",
    reference: "reference-1",
    status: "AWAITING_TERMS",
    policy_number: "123",
    product_name: "Product One",
    monthly_premium: "74.23",
    annual_premium: "890.76",
    applicants: [
      {
        type: "partner",
        title: "MRS",
        first_name: "Jane",
        middle_names: null,
        last_name: "Appleseed",
        date_of_birth: "1994-04-28",
        answers: {
          permission_to_add_member: true,
          permanent_uk_resident: true,
          covered_with_a_gp_and_access_to_medical_records: true,
          pmi_required_to_fulfil_reqs_or_visa: false,
          tobacco_products_within_last_2_years: true,
          last_5_years_heart_condition_or_heart_problem: false,
          last_5_years_stroke: false,
          last_5_years_cancer: false,
          last_5_years_diabetes: false,
          last_5_years_mental_illness: false,
          axa_anyone_planned_or_pending: false,
          axa_anyone_received_treatment_or_consultation_in_last_12_months: false
        }
      }
    ],
    months_of_cover: 3,
    underwriting_declined_reason: null,
    declined_reason: null,
    created_at: "2021-08-16T11:07:40.000000Z",
    updated_at: null,
    deleted_at: null,
    client: {
      id: 999,
      first_name: "John",
      middle_names: "Apple",
      last_name: "Doe",
      created_at: "2021-08-16T11:07:40.000000Z",
      updated_at: null,
      deleted_at: null
    },
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
      joined_network_at: "2021-08-16T11:07:39.000000Z",
      created_at: "2021-08-16T11:07:39.000000Z",
      updated_at: null,
      deleted_at: null,
      last_logged_in_at: null
    },
    sales_agent: {
      id: 1005,
      slug: "sales-adviser-1",
      title: {
        key: "LORD",
        label: "Lord",
        gender: "Male"
      },
      role: {
        id: 2,
        name: "SALES_ADVISER"
      },
      parent: {
        id: 999,
        name: "Organisation 1",
        slug: "organisation-1",
        parent: {
          id: 999,
          name: "Network 1",
          slug: "network-1",
          parent: null,
          type: "NETWORK"
        },
        type: "ORGANISATION"
      },
      first_name: "Sales",
      middle_names: null,
      last_name: "Adviser 1",
      email: "salesadviser1@test.com",
      mobile: null,
      email_verified_at: "2021-08-16T11:07:40.000000Z",
      active: true,
      locked: false,
      created_at: "2021-08-16T11:07:40.000000Z",
      deleted_at: null,
      last_logged_in_at: null
    },
    provider: {
      id: 999,
      slug: "provider-1",
      provider_key: "AVIVA",
      name: "Provider 1",
      registration_number: "10342",
      abbreviation: "avi",
      description: "Description of the provider",
      website: "www.testprovider.co.uk",
      last_logged_in_at: null,
      logo_file_path: null,
      created_at: "2021-08-16T11:07:39.000000Z",
      updated_at: null,
      deleted_at: null
    }
  }
}

/**
 * Mock response for `/policies/:slug/exclusions` GET
 */
export const fakePolicyExclusionsGetResponse = {
  data: [
    {
      id: 90,
      slug: "john_apple_doe",
      aplicant_name: "Joe Bloggs",
      exclusion: "This is an example exclusion",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z"
    }
  ]
}
