/**
 * Mock response for /agency-codes GET
 */
export const fakeAgencyCodesGetResponse = {
  data: [
    {
      id: 999,
      slug: "agency-code-one",
      product_type: "PMI",
      product: "Product One",
      owner_id: 999,
      provider_id: 999,
      owner_type: "App\\Models\\Network",
      agency_code: "4C0043",
      status: "ACTIVE",
      activated_at: "2021-08-23T15:22:28.000000Z",
      primary_commission_rate: "0.20",
      shared_with_count: 1,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1000,
      slug: "agency-code-two",
      product_type: "PMI",
      product: "Product Two",
      owner_id: 999,
      provider_id: 1000,
      owner_type: "App\\Models\\Organisation",
      agency_code: "FT134",
      status: "ACTIVE",
      activated_at: "2021-08-23T15:22:28.000000Z",
      primary_commission_rate: "0.50",
      shared_with_count: 1,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1001,
      slug: "agency-code-three",
      product_type: "PMI",
      product: "Product Three",
      owner_id: 1005,
      provider_id: 1001,
      owner_type: "App\\Models\\User",
      agency_code: "873423",
      status: "ACTIVE",
      activated_at: "2021-08-23T15:22:28.000000Z",
      primary_commission_rate: "2.00",
      shared_with_count: 0,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1002,
      slug: "healthiersolutions-4c0043",
      product_type: "PMI",
      product: "HEALTHIERSOLUTIONS",
      owner_id: 999,
      provider_id: 999,
      owner_type: "App\\Models\\Organisation",
      agency_code: "4C0043",
      status: "ACTIVE",
      activated_at: null,
      primary_commission_rate: null,
      shared_with_count: 0,
      created_at: "2021-08-23T15:22:35.000000Z",
      updated_at: "2021-08-23T15:22:35.000000Z",
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1003,
      slug: "healthiersolutions-4c00123",
      product_type: "PMI",
      product: "HEALTHIERSOLUTIONS",
      owner_id: 999,
      provider_id: 999,
      owner_type: "App\\Models\\Organisation",
      agency_code: "4C00123",
      status: "PENDING",
      activated_at: null,
      primary_commission_rate: null,
      shared_with_count: 0,
      created_at: "2021-08-23T15:22:35.000000Z",
      updated_at: "2021-08-23T15:22:35.000000Z",
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1004,
      slug: "healthiersolutions-4c0043-2",
      product_type: "PMI",
      product: "HEALTHIERSOLUTIONS",
      owner_id: 1000,
      provider_id: 999,
      owner_type: "App\\Models\\Organisation",
      agency_code: "4C0043",
      status: "ACTIVE",
      activated_at: null,
      primary_commission_rate: null,
      shared_with_count: 0,
      created_at: "2021-08-23T15:22:35.000000Z",
      updated_at: "2021-08-23T15:22:35.000000Z",
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1005,
      slug: "healthiersolutions-4c00123-2",
      product_type: "PMI",
      product: "HEALTHIERSOLUTIONS",
      owner_id: 1000,
      provider_id: 999,
      owner_type: "App\\Models\\Organisation",
      agency_code: "4C00123",
      status: "PENDING",
      activated_at: null,
      primary_commission_rate: null,
      shared_with_count: 0,
      created_at: "2021-08-23T15:22:35.000000Z",
      updated_at: "2021-08-23T15:22:35.000000Z",
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1006,
      slug: "healthiersolutions-4c0043-3",
      product_type: "PMI",
      product: "HEALTHIERSOLUTIONS",
      owner_id: 1001,
      provider_id: 999,
      owner_type: "App\\Models\\Organisation",
      agency_code: "4C0043",
      status: "ACTIVE",
      activated_at: null,
      primary_commission_rate: null,
      shared_with_count: 0,
      created_at: "2021-08-23T15:22:35.000000Z",
      updated_at: "2021-08-23T15:22:35.000000Z",
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    },
    {
      id: 1007,
      slug: "healthiersolutions-4c00123-3",
      product_type: "PMI",
      product: "HEALTHIERSOLUTIONS",
      owner_id: 1001,
      provider_id: 999,
      owner_type: "App\\Models\\Organisation",
      agency_code: "4C00123",
      status: "PENDING",
      activated_at: null,
      primary_commission_rate: null,
      shared_with_count: 0,
      created_at: "2021-08-23T15:22:35.000000Z",
      updated_at: "2021-08-23T15:22:35.000000Z",
      deleted_at: null,
      user: {
        id: 90,
        slug: "robert-smith",
        title: "Mr",
        role: {
          name: "SALES_ADVISER"
        },
        email: "rjsmith@gmail.com",
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
      }
    }
  ]
}
/**
 * Mock response for /agency-codes/:slug GET
 */
export const fakeAgencyCodeGetResponse = {
  data: {
    id: 999,
    slug: "agency-code-one",
    product_type: "PMI",
    product: "Product One",
    owner_id: 999,
    provider_id: 999,
    owner_type: "App\\Models\\Network",
    agency_code: "4C0043",
    status: "ACTIVE",
    activated_at: "2021-08-23T15:22:28.000000Z",
    primary_commission_rate: "0.20",
    shared_with_count: 1,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    user: {
      id: 90,
      slug: "robert-smith",
      title: "Mr",
      role: {
        name: "SALES_ADVISER"
      },
      email: "rjsmith@gmail.com",
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
    }
  }
}
/**
 * Mock response for /users/:slug/inherited-agency-codes GET
 */
export const fakeSharedAgencyCodesGetResponse = {
  data: [
    {
      id: 1000,
      owner_id: 999,
      owner_type: "App\\Models\\Organisation",
      product_type: "PMI",
      provider_id: 1000,
      agency_code: "FT134",
      status: "ACTIVE",
      secondary_commission_rate: "10.00",
      shared_at: 1630423097,
      created_at: null,
      updated: null,
      deleted_at: null,
      provider: {
        id: 1000,
        slug: "provider-2",
        provider_key: "BUPA",
        name: "Provider 2",
        registration_number: "14866",
        abbreviation: "bup",
        description: "Description of the provider",
        website: "www.testprovider2.co.uk",
        last_logged_in_at: null,
        logo_file_path:
          "https://storage.googleapis.com/fcng-local-public/kimberlie-u/storage/providers/provider-logo.jpg",
        created_at: "2021-08-31T15:18:16.000000Z",
        updated_at: null,
        deleted_at: null,
        products: {
          bupabyyou: "BUPABYYOU",
          fundamentals: "FUNDAMENTALS"
        }
      },
      owner: {
        id: 999,
        type: "ORGANISATION",
        attributes: {
          id: 999,
          slug: "organisation-1",
          name: "Organisation 1",
          logo_file_path: null,
          company_registration_number: "111111",
          fca_reference: "796787",
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
          joined_network_at: "2021-08-31T15:18:16.000000Z",
          created_at: "2021-08-31T15:18:16.000000Z",
          updated_at: "2021-08-31T23:59:03.000000Z",
          deleted_at: null,
          last_logged_in_at: "2021-08-31T23:59:00.000000Z"
        }
      }
    }
  ]
}

export const fakeAgencyCodesRequestsGetResponse = {
  data: [
    {
      id: 999,
      slug: "apple-pmi",
      product_type: "PMI",
      product: "Apple",
      status: "PENDING",
      created_at: "2021-08-30T17:33:26.000000Z",
      updated_at: null,
      deleted_at: null,
      provider: {
        name: "Provider 1"
      },
      owner: {
        name: "Network 1"
      }
    }
  ]
}

export const fakeOrganisationsSharedWithResponse = {
  data: [
    {
      id: 90,
      slug: "organisation-1",
      name: "Organisation One",
      contact_first_name: "Joe",
      contact_last_name: "Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "796787",
      description: "Test description of an organisation",
      website: "www.testorganisation.com",
      logo_file_path: "/path/to/file",
      active: true,
      approved: true,
      bypass_due_diligence: false,
      last_logged_in: "2018-02-10T09:30Z",
      network_id: 1,
      joined_network_at: "2018-02-10T09:30Z",
      deletable: false,
      last_logged_in_at: "2018-02-10T09:30Z",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      shared_at: "2018-02-10T09:30Z"
    },
    {
      id: 91,
      slug: "organisation-2",
      name: "Organisation Two",
      contact_first_name: "Joe",
      contact_last_name: "Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "796787",
      description: "Test description of an organisation",
      website: "www.testorganisation.com",
      logo_file_path: "/path/to/file",
      active: true,
      approved: true,
      bypass_due_diligence: false,
      last_logged_in: "2018-02-10T09:30Z",
      network_id: 1,
      joined_network_at: "2018-02-10T09:30Z",
      deletable: false,
      last_logged_in_at: "2018-02-10T09:30Z",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      shared_at: "2018-02-11T09:30Z"
    },
    {
      id: 92,
      slug: "organisation-3",
      name: "Organisation Three",
      contact_first_name: "Joe",
      contact_last_name: "Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "796787",
      description: "Test description of an organisation",
      website: "www.testorganisation.com",
      logo_file_path: "/path/to/file",
      active: true,
      approved: true,
      bypass_due_diligence: false,
      last_logged_in: "2018-02-10T09:30Z",
      network_id: 1,
      joined_network_at: "2018-02-10T09:30Z",
      deletable: false,
      last_logged_in_at: "2018-02-10T09:30Z",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      shared_at: "2018-02-12T09:30Z"
    }
  ]
}

export const fakeUsersSharedWithResponse = {
  data: [
    {
      id: 92,
      slug: "robert-smith",
      title: "MR",
      role: {
        id: 10,
        name: "SYS_ADMIN"
      },
      parent: {
        id: 12,
        name: "Provider Name",
        type: "PROVIDER"
      },
      first_name: "Robert",
      middle_names: "James",
      last_name: "Smith",
      mobile: 98676876,
      email_verified_at: "2018-02-10T09:30Z",
      simulation_mode: true,
      active: true,
      locked: false,
      last_logged_in_at: "2018-02-10T09:30Z",
      created_at: "2018-02-10T09:30Z"
    }
  ]
}
