/**
 * Mock response for /quotes GET
 */
export const fakeQuotesGetResponse = {
  data: [
    {
      id: 999,
      slug: "john-apple-doe",
      reference: "reference-1",
      product_name: "Product One",
      monthly_premium: "74.23",
      annual_premium: "890.76",
      months_of_cover: 3,
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
      }
    },
    {
      id: 1000,
      slug: "jane-apple-doe",
      reference: "reference-2",
      product_name: "Product Two",
      monthly_premium: "51.15",
      annual_premium: "613.80",
      months_of_cover: 6,
      created_at: "2021-08-16T11:07:40.000000Z",
      updated_at: null,
      deleted_at: null,
      client: {
        id: 1000,
        first_name: "Jane",
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
      }
    }
  ]
}

/**
 * Mock response for /quotes/:slug GET
 */
export const fakeQuoteGetResponse = {
  data: {
    id: 999,
    slug: "john-apple-doe",
    reference: "reference-1",
    product_name: "Product One",
    monthly_premium: "74.23",
    annual_premium: "890.76",
    months_of_cover: 3,
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
