/**
 * Mock response for /organisations GET
 */
export const fakeOrganisationsGetResponse = {
  data: [
    {
      id: 999,
      slug: "organisation-1",
      name: "Organisation 1",
      logo_file_path: null,
      company_registration_number: "111111",
      fca_reference: "123456",
      website: "http://website1.com",
      description: "Test organisation 1",
      approved: true,
      bypass_due_diligence: true,
      active: true,
      contact_title: "MR",
      contact_first_name: "John",
      contact_last_name: "Apple",
      contact_email_address: "john@apple.com",
      phone_number: "07777777777",
      privacy_policy_agreed: false,
      terms_and_conditions_agreed: false,
      completed_due_diligence_at: null,
      joined_network_at: "2022-02-08T09:18:28.000000Z",
      created_at: "2022-02-08T09:18:28.000000Z",
      updated_at: "2022-02-08T09:29:48.000000Z",
      deleted_at: null,
      last_logged_in_at: "2022-02-08T09:29:44.000000Z"
    },
    {
      id: 1000,
      slug: "organisation-2",
      name: "Organisation 2",
      logo_file_path: null,
      company_registration_number: "222222",
      fca_reference: "987654",
      website: "http://website2.com",
      description: "Test organisation 2",
      approved: true,
      bypass_due_diligence: false,
      active: true,
      contact_title: "MRS",
      contact_first_name: "Jane",
      contact_last_name: "Apple",
      contact_email_address: "jane@apple.com",
      phone_number: "01234 778866",
      privacy_policy_agreed: false,
      terms_and_conditions_agreed: false,
      completed_due_diligence_at: null,
      joined_network_at: "2022-02-08T09:18:28.000000Z",
      created_at: "2022-02-08T09:18:28.000000Z",
      updated_at: null,
      deleted_at: null,
      last_logged_in_at: "2022-02-04T17:00:25.000000Z"
    },
    {
      id: 1001,
      slug: "organisation-3",
      name: "Organisation 3",
      logo_file_path: null,
      company_registration_number: "333333",
      fca_reference: "091283",
      website: "http://website3.com",
      description: "Test organisation 3",
      approved: true,
      bypass_due_diligence: false,
      active: true,
      contact_title: "MRS",
      contact_first_name: "Sarah",
      contact_last_name: "Appleseed",
      contact_email_address: "sarah@appleseed.com",
      phone_number: "01234 334455",
      privacy_policy_agreed: false,
      terms_and_conditions_agreed: false,
      completed_due_diligence_at: "2022-02-08T09:41:32.000000Z",
      joined_network_at: null,
      created_at: "2022-02-08T09:18:28.000000Z",
      updated_at: null,
      deleted_at: null,
      last_logged_in_at: "2022-02-04T17:00:25.000000Z"
    },
    {
      id: 1002,
      slug: "organisation-4",
      name: "Organisation 4",
      logo_file_path: null,
      company_registration_number: "dada555",
      fca_reference: "123456",
      website: "https://website.com",
      description: "Test organisation 4",
      approved: true,
      bypass_due_diligence: false,
      active: true,
      contact_title: "MR",
      contact_first_name: "Test",
      contact_last_name: "Testb",
      contact_email_address: "test12@test123.com",
      phone_number: "+447715344056",
      privacy_policy_agreed: true,
      terms_and_conditions_agreed: true,
      completed_due_diligence_at: "2022-02-09T09:21:26.000000Z",
      joined_network_at: null,
      created_at: "2022-02-09T09:20:06.000000Z",
      updated_at: "2022-02-09T09:21:41.000000Z",
      deleted_at: null,
      last_logged_in_at: "2022-02-04T17:00:25.000000Z"
    },
    {
      id: 1003,
      slug: "organisation-5",
      name: "Organisation 5",
      logo_file_path: null,
      company_registration_number: "123456",
      fca_reference: "124567",
      website: "https://usaycompare.com",
      description: "Test organisation 5",
      approved: true,
      bypass_due_diligence: true,
      active: false,
      contact_title: "MR",
      contact_first_name: "Test",
      contact_last_name: "Test",
      contact_email_address: "test@testco.com",
      phone_number: "+447735555546",
      privacy_policy_agreed: true,
      terms_and_conditions_agreed: true,
      completed_due_diligence_at: "2022-02-09T11:44:41.000000Z",
      joined_network_at: null,
      created_at: "2022-02-09T11:20:18.000000Z",
      updated_at: "2022-02-09T11:44:41.000000Z",
      deleted_at: null,
      last_logged_in_at: "2022-02-04T17:00:25.000000Z"
    }
  ]
}

/**
 * Mock response for /organisations/:slug GET
 */
export const fakeOrganisationGetResponse = {
  data: {
    slug: "organisation-1",
    name: "Organisation 1",
    company_registration_number: "111111",
    fca_reference: "123456",
    phone_number: "07777777777",
    website: "http://website1.com",
    description: "Test organisation 1",
    approved: false,
    active: true,
    bypass_due_diligence: false,
    completed_due_diligence_at: null,
    created_at: "2021-03-25T12:18:37.000000Z",
    updated_at: "2021-03-25T14:29:01.000000Z",
    deleted_at: null,
    address: {
      id: 1,
      type: "primary",
      line_one: "Address Line One",
      line_two: "Address Line Two",
      city: "City",
      county: "County",
      postcode: "GL7 5XZ",
      created_at: "2022-02-04T13:28:47.000000Z",
      updated_at: "2022-02-04T13:28:47.000000Z",
      deleted_at: null
    },
    notes: [
      {
        id: 1,
        note: "Test Note",
        created_at: "2021-03-30T14:03:42.000000Z",
        updated_at: "2021-03-30T14:03:42.000000Z",
        deleted_at: null
      }
    ],
    contact_first_name: "Joe",
    contact_last_name: "Bloggs",
    contact_email_address: "test@test.com",
    joined_network_at: "2018-02-10T09:30Z",
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
      last_logged_in_at: "2021-07-20T14:24:23.000000Z",
      created_at: "2021-07-20T14:24:23.000000Z",
      updated_at: null,
      deleted_at: null
    },
    id: 999,
    logo_file_path: null,
    contact_title: "MR",
    privacy_policy_agreed: false,
    terms_and_conditions_agreed: false,
    last_logged_in_at: "2022-02-04T17:00:25.000000Z"
  }
}

/**
 * Mock response for /organisations/:slug/notes GET
 */
export const fakeOrganisationNotesGetResponse = {
  data: [
    {
      id: 1,
      body: "In animi neque porro ratione eos animi. Illo consequuntur et est optio ullam sint dolor.",
      created_by: {
        first_name: "Org",
        last_name: "Admin 1"
      },
      created_at: "2021-08-23T15:22:34.000000Z",
      updated_at: "2021-08-23T15:22:34.000000Z",
      deleted_at: null
    }
  ],
  pagination: {
    limit: 25,
    totalItems: 1,
    totalPages: 1,
    currentPage: 1
  }
}

/**
 * Mock response for /organisations/:slug/sales-preferences GET
 */

export const fakeOrganisationSalesSettingsGetResponse = {
  data: {
    id: 999,
    buy_sales_leads: false,
    critical_illness_cover: false,
    general_insurance: false,
    income_protection_insurance: false,
    investments: false,
    life_insurance: false,
    mortgages: false,
    pensions: false,
    group_pmi: false,
    individual_pmi: false
  }
}

/**
 * Mock response for /organisations/:slug/journey-settings GET
 */
export const fakeOrganisationJourneySettingsGetResponse = {
  data: {
    id: 999,
    consent_text: "Some consent text here",
    exclusion_text: "Some exclusion text here",
    skip_affordable_budget: true
  }
}

/**
 * Mock response for /organisations/:slug/due-diligences GET
 */
export const fakeOrganisationDueDiligencesGetResponse = {
  data: [
    {
      id: 999,
      title: "Completed online application received",
      description: "Confirm that the online application is complete.",
      complete: false,
      created_at: "2021-08-02T14:22:06.000000Z",
      updated_at: null,
      deleted_at: null
    },
    {
      id: 1000,
      title: "Companies House check",
      description:
        "Confirm the applicant company is registered at Companies House, and that the supplied registration number is correct.",
      complete: false,
      created_at: "2021-08-02T14:22:06.000000Z",
      updated_at: null,
      deleted_at: null
    }
  ]
}

/**
 * Mock response for /quick-quote-defaults GET
 */
export const fakeOrganisationQQSettingsDefaultsGetResponse = {
  data: {
    basic_excess: "DEFAULT_VALUE",
    basic_hospital_list: "DEFAULT_VALUE",
    basic_outpatient: "DEFAULT_VALUE",
    basic_underwriting: "DEFAULT_VALUE",
    standard_excess: "DEFAULT_VALUE",
    standard_hospital_list: "DEFAULT_VALUE",
    standard_outpatient: "DEFAULT_VALUE",
    standard_underwriting: "DEFAULT_VALUE",
    comprehensive_excess: "DEFAULT_VALUE",
    comprehensive_hospital_list: "DEFAULT_VALUE",
    comprehensive_outpatient: "DEFAULT_VALUE",
    comprehensive_underwriting: "DEFAULT_VALUE"
  }
}

/**
 * Mock response for /organisations/:slug/quick-quote-options
 */
export const fakeOrganisationQQSettingsGetResponse = {
  data: {
    id: 999,
    basic_excess: "GLOBAL_EXCESS_250",
    basic_hospital_list: "GLOBAL_HL_STANDARD",
    basic_outpatient: "GLOBAL_OP_ZERO",
    basic_underwriting: "MORI",
    standard_excess: "GLOBAL_EXCESS_1000",
    standard_hospital_list: "GLOBAL_HL_COMPREHENSIVE",
    standard_outpatient: "GLOBAL_OP_MEDIUM",
    standard_underwriting: "MORI",
    comprehensive_excess: "GLOBAL_EXCESS_3000",
    comprehensive_hospital_list: "GLOBAL_HL_COMPREHENSIVE",
    comprehensive_outpatient: "GLOBAL_OP_FULL",
    comprehensive_underwriting: "MORI",
    available_options: {
      excess: [
        "GLOBAL_EXCESS_NIL",
        "GLOBAL_EXCESS_100",
        "GLOBAL_EXCESS_150",
        "GLOBAL_EXCESS_200",
        "GLOBAL_EXCESS_250",
        "GLOBAL_EXCESS_500",
        "GLOBAL_EXCESS_1000",
        "GLOBAL_EXCESS_3000",
        "GLOBAL_EXCESS_5000"
      ],
      outpatient: ["GLOBAL_OP_ZERO", "GLOBAL_OP_LOW", "GLOBAL_OP_MEDIUM", "GLOBAL_OP_FULL"],
      hospital_list: [
        "GLOBAL_HL_REDUCED",
        "GLOBAL_HL_STANDARD",
        "GLOBAL_HL_COMPREHENSIVE",
        "GLOBAL_HL_GUIDED"
      ],
      underwriting: ["MORI", "FMU"]
    }
  }
}

/*
 * Mock response for /organisations/:slug/network-appllications GET
 */
export const fakeOrganisationNetworkApplicationsGetResponse = {
  data: [
    {
      id: 51,
      created_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      status: "PENDING",
      organisation: {
        id: 90,
        slug: "organisation-1",
        name: "Organisation One",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        phone_number: "07967876545",
        registration_number: "abc123",
        fca_reference: "876545",
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
        deleted_at: "2018-02-10T09:30Z"
      },
      organisation_id: 85,
      user_id: 86,
      user: {
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
        email_verified_at: "2018-02-10T09:30Z",
        simulation_mode: true,
        active: true,
        locked: false,
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z"
      },
      network: {
        id: 90,
        slug: "network-1",
        name: "Network Three",
        description: "This is a description of the network",
        company_registration_number: "abc123",
        fca_reference: "876545",
        phone_number: "07967876545",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        logo_file_path: "/path/to/file",
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        address: {
          line_one: "The Address",
          line_two: "Two Lines",
          city: "InACity",
          county: "TheCounty",
          postcode: "GL7 5XZ"
        }
      }
    },
    {
      id: 52,
      created_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      status: "REJECTED",
      organisation: {
        id: 90,
        slug: "organisation-1",
        name: "Organisation One",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        phone_number: "07967876545",
        registration_number: "abc123",
        fca_reference: "876545",
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
        deleted_at: "2018-02-10T09:30Z"
      },
      organisation_id: 85,
      user_id: 86,
      user: {
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
        email_verified_at: "2018-02-10T09:30Z",
        simulation_mode: true,
        active: true,
        locked: false,
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z"
      },
      network: {
        id: 90,
        slug: "network-1",
        name: "Network Four",
        description: "This is a description of the network",
        company_registration_number: "abc123",
        fca_reference: "876545",
        phone_number: "07967876545",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        logo_file_path: "/path/to/file",
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        address: {
          line_one: "The Address",
          line_two: "Two Lines",
          city: "InACity",
          county: "TheCounty",
          postcode: "GL7 5XZ"
        }
      }
    }
  ]
}

/**
 * Mock response for /organisations/:slug/network-invitations GET
 */
export const fakeOrganisationNetworkInvitationsGetResponse = {
  data: [
    {
      id: 90,
      email: "organisation@gmail.com",
      organisation_id: 2,
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      network: {
        id: 90,
        slug: "network-1",
        name: "Network One",
        description: "This is a description of the network",
        company_registration_number: "abc123",
        fca_reference: "876545",
        phone_number: "07967876545",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        logo_file_path: "/path/to/file",
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        address: {
          line_one: "The Address",
          line_two: "Two Lines",
          city: "InACity",
          county: "TheCounty",
          postcode: "GL7 5XZ"
        }
      }
    },
    {
      id: 91,
      email: "organisation@gmail.com",
      organisation_id: 2,
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      network: {
        id: 90,
        slug: "network-1",
        name: "Network Two",
        description: "This is a description of the network",
        company_registration_number: "abc123",
        fca_reference: "876545",
        phone_number: "07967876545",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        logo_file_path: "/path/to/file",
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        address: {
          line_one: "The Address",
          line_two: "Two Lines",
          city: "InACity",
          county: "TheCounty",
          postcode: "GL7 5XZ"
        }
      }
    }
  ]
}

export const fakeOrganisationDocumentsGetResponse = {
  data: [
    {
      id: 999,
      slug: "document-1",
      name: "Network Document One",
      display_point: "policy",
      share_to_all: false,
      shared_with_count: 1,
      network_id: 999,
      created_at: "2021-12-20T09:55:33.000000Z",
      updated_at: "2021-12-21T14:41:18.000000Z",
      deleted_at: null,
      document_versions: [
        {
          id: 1,
          version_number: 1,
          active: 0,
          file_name: "networks/documents/network-document.docx",
          mime_type: "docx",
          real_path: "tmp/123123",
          size_bytes: "894",
          created_at: "2021-12-20T09:55:43.000000Z",
          updated_at: "2021-12-21T14:46:10.000000Z",
          deleted_at: null
        },
        {
          id: 2,
          version_number: 2,
          active: 1,
          file_name: "networks/documents/j6wufZuqWAjy9FSLTLLTZck6FCHr2qKEzPjwWMwF.png",
          mime_type: "image/png",
          real_path: "/tmp/phpAMSbfs",
          size_bytes: "257459",
          created_at: "2021-12-21T14:46:11.000000Z",
          updated_at: "2021-12-21T14:46:11.000000Z",
          deleted_at: null
        }
      ],
      current_active_version: {
        id: 2,
        version_number: 2,
        active: 1,
        file_name: "networks/documents/j6wufZuqWAjy9FSLTLLTZck6FCHr2qKEzPjwWMwF.png",
        mime_type: "image/png",
        real_path: "/tmp/phpAMSbfs",
        size_bytes: "257459",
        created_at: "2021-12-21T14:46:11.000000Z",
        updated_at: "2021-12-21T14:46:11.000000Z",
        deleted_at: null
      }
    }
  ]
}
