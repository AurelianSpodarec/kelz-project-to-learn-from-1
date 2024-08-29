/**
 * Mock response for /lead-config GET
 */
export const fakeLeadConfigGetResponse = {
  data: {
    type: {
      PMI: "PMI"
    },
    disposition: {
      NEW: "New",
      VALID_PROSPECT: "Valid Prospect",
      MED_INTEREST: "Medium Interest",
      LOW_INTEREST: "Low Interest",
      NO_INTEREST: "No Interest",
      NO_CONTACT: "Asked to not be contacted",
      FUTURE_PROSPECT: "Future Prospect"
    },
    source: {
      INTERNAL: "Internal",
      EXTERNAL: "External",
      REFER_FRIEND: "Refer-a-friend",
      REFER_STAFF: "Staff Referral"
    }
  }
}

/**
 * Mock response for /leads GET
 */
export const fakeLeadsGetResponse = {
  data: [
    {
      slug: "john-doe",
      type: "PMI",
      lead_source: "EXTERNAL",
      disposition: {
        id: 1001,
        lead_id: 999,
        user_id: 1003,
        disposition: "MED_INTEREST",
        note: "Expressed some interest.",
        created_at: "2022-02-02T18:28:33.000000Z",
        updated_at: "2022-02-02T18:28:33.000000Z",
        deleted_at: null
      },
      first_name: "John",
      last_name: "Doe",
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
        mobile: "07777123456",
        email_verified_at: "2022-02-02T18:27:33.000000Z",
        active: true,
        locked: false,
        created_at: "2022-02-02T18:27:33.000000Z",
        deleted_at: null,
        last_logged_in_at: "2022-01-28T15:22:05.000000Z"
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
        joined_network_at: "2022-02-02T18:27:33.000000Z",
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: "2022-02-03T13:50:41.000000Z",
        deleted_at: null,
        last_logged_in_at: "2022-02-02T18:27:52.000000Z"
      },
      created_at: "2022-02-02T18:27:33.000000Z",
      updated_at: null,
      deleted_at: null
    },
    {
      slug: "jane-doe",
      type: "PMI",
      lead_source: "INTERNAL",
      disposition: {
        id: 1000,
        lead_id: 1000,
        user_id: 1003,
        disposition: "VALID_PROSPECT",
        note: "New",
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: "2022-02-02T18:27:33.000000Z",
        deleted_at: null
      },
      first_name: "Jane",
      last_name: "Doe",
      sales_agent: {
        id: 1006,
        slug: "sales-adviser-2",
        title: {
          key: "LADY",
          label: "Lady",
          gender: "Female"
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
        last_name: "Adviser 2",
        email: "salesadviser2@test.com",
        mobile: null,
        email_verified_at: "2022-02-02T18:27:33.000000Z",
        active: true,
        locked: false,
        created_at: "2022-02-02T18:27:33.000000Z",
        deleted_at: null,
        last_logged_in_at: null
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
        joined_network_at: "2022-02-02T18:27:33.000000Z",
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: "2022-02-03T13:50:41.000000Z",
        deleted_at: null,
        last_logged_in_at: "2022-02-02T18:27:52.000000Z"
      },
      created_at: "2022-02-02T18:27:33.000000Z",
      updated_at: null,
      deleted_at: null
    },
    {
      slug: "jane-appleseed",
      type: "PMI",
      lead_source: "INTERNAL",
      disposition: {
        id: 1002,
        lead_id: 1001,
        user_id: 1003,
        disposition: "MED_INTEREST",
        note: "Expressed some interest.",
        created_at: "2022-02-02T18:28:33.000000Z",
        updated_at: "2022-02-02T18:28:33.000000Z",
        deleted_at: null
      },
      first_name: "Jane",
      last_name: "Appleseed",
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
        mobile: "07777123456",
        email_verified_at: "2022-02-02T18:27:33.000000Z",
        active: true,
        locked: false,
        created_at: "2022-02-02T18:27:33.000000Z",
        deleted_at: null,
        last_logged_in_at: "2022-01-28T15:22:05.000000Z"
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
        joined_network_at: "2022-02-02T18:27:33.000000Z",
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: "2022-02-03T13:50:41.000000Z",
        deleted_at: null,
        last_logged_in_at: "2022-02-02T18:27:52.000000Z"
      },
      created_at: "2022-02-02T18:27:33.000000Z",
      updated_at: null,
      deleted_at: null
    }
  ]
}

/**
 * Mock responses for /leads/:slug GET
 */
export const fakeLeadGetResponse = {
  data: {
    slug: "john-doe",
    type: "PMI",
    lead_source: "EXTERNAL",
    date_of_birth: "2004-02-02",
    disposition: {
      id: 1001,
      lead_id: 999,
      user_id: 1003,
      disposition: "MED_INTEREST",
      note: "Expressed some interest.",
      created_at: "2022-02-02T18:28:33.000000Z",
      updated_at: "2022-02-02T18:28:33.000000Z",
      deleted_at: null
    },
    gender_at_birth: "male",
    title: "MR",
    first_name: "John",
    last_name: "Doe",
    email_address: "john.doe@example.test",
    notes: [
      {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        created_by: {
          first_name: "Sales",
          last_name: "Adviser 1"
        },
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: null
      },
      {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        created_by: {
          first_name: "Sales",
          last_name: "Adviser 1"
        },
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: null
      },
      {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        created_by: {
          first_name: "Sales",
          last_name: "Adviser 1"
        },
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: null
      },
      {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        created_by: {
          first_name: "Sales",
          last_name: "Adviser 1"
        },
        created_at: "2022-02-02T18:27:33.000000Z",
        updated_at: null
      }
    ],
    phone_numbers: [
      {
        id: 1001,
        number: "+4407715344054",
        type: "PRIMARY"
      }
    ],
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
      joined_network_at: "2022-02-02T18:27:33.000000Z",
      created_at: "2022-02-02T18:27:33.000000Z",
      updated_at: "2022-02-03T13:50:41.000000Z",
      deleted_at: null,
      last_logged_in_at: "2022-02-02T18:27:52.000000Z"
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
      mobile: "07777123456",
      email_verified_at: "2022-02-02T18:27:33.000000Z",
      active: true,
      locked: false,
      created_at: "2022-02-02T18:27:33.000000Z",
      deleted_at: null,
      last_logged_in_at: "2022-01-28T15:22:05.000000Z"
    },
    client: {
      id: 999,
      first_name: "John",
      middle_names: "Apple",
      last_name: "Doe",
      date_of_birth: "1987-02-02",
      gender_at_birth: "Male",
      email_address: "john.doe@example.test",
      occupation: null,
      created_at: "2022-02-02T18:27:33.000000Z",
      updated_at: null,
      deleted_at: null
    },
    created_at: "2022-02-02T18:27:33.000000Z",
    updated_at: null,
    deleted_at: null,
    has_active_journeys: true
  }
}

/**
 * Mock response for /leads/:slug/notes GET
 */
export const fakeLeadNotesGetResponse = {
  data: [
    {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "GENERAL",
      created_by: {
        first_name: "Sales",
        last_name: "Adviser 1"
      },
      created_at: "2021-08-09T10:12:51.000000Z",
      updated_at: null
    },
    {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "DISPOSITION_CHANGE",
      created_by: {
        first_name: "Sales",
        last_name: "Adviser 1"
      },
      created_at: "2021-08-09T10:12:51.000000Z",
      updated_at: null
    },
    {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "DISPOSITION_CHANGE",
      created_by: {
        first_name: "Sales",
        last_name: "Adviser 1"
      },
      created_at: "2021-08-09T10:12:51.000000Z",
      updated_at: null
    }
  ]
}
