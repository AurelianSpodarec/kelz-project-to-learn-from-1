/**
 * Mock response for /networks POST
 */
export const fakeNetworksPostResponse = {
  message: "OK"
}

/**
 * Mock response for /networks/:slug GET
 */
export const fakeNetworkGetResponse = {
  data: {
    id: 90,
    slug: "network-1",
    name: "Network One",
    description: "This is a description of the network",
    company_registration_number: "abc123",
    fca_reference: "876645",
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

/**
 * Mock response for /networks GET
 */
export const fakeNetworksGetResponse = {
  data: [
    {
      id: 90,
      slug: "network-1",
      name: "Network One",
      description: "This is a description of the network",
      company_registration_number: "abc123",
      fac_reference: "abc123",
      phone_number: "07967876545",
      contact_first_name: "Joe",
      contact_last_name: "Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      logo_file_path: "/path/to/file",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: null,
      last_logged_in_at: "2018-02-10T09:30Z",
      address: {
        line_one: "The Address",
        line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 90,
      slug: "network-2",
      name: "Network Two",
      description: "This is a description of the network",
      company_registration_number: "abc123",
      fac_reference: "abc123",
      phone_number: "07967876545",
      contact_first_name: "Martin",
      contact_last_name: "Tremwell",
      contact_email_address: "m.trem@gmail.com",
      logo_file_path: "/path/to/file",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: null,
      last_logged_in_at: "2018-02-10T09:30Z",
      address: {
        line_one: "The Address",
        line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 90,
      slug: "network-3",
      name: "Network Three",
      description: "This is a description of the network",
      company_registration_number: "abc123",
      fac_reference: "abc123",
      phone_number: "07967876545",
      contact_first_name: "Simon",
      contact_last_name: "Sayre",
      contact_email_address: "simonsays@mail.com",
      logo_file_path: "/path/to/file",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: null,
      last_logged_in_at: "2018-02-10T09:30Z",
      address: {
        line_one: "The Address",
        line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 90,
      slug: "network-4",
      name: "Network Four",
      description: "This is a description of the network",
      company_registration_number: "abc123",
      fac_reference: "abc123",
      phone_number: "07967876545",
      contact_first_name: "Michael",
      contact_last_name: "Angelino",
      contact_email_address: "michaelangelo@gmail.com",
      logo_file_path: "/path/to/file",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      last_logged_in_at: "2018-02-10T09:30Z",
      address: {
        line_one: "The Address",
        line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 90,
      slug: "network-5",
      name: "Network Five",
      description: "This is a description of the network",
      company_registration_number: "abc123",
      fac_reference: "abc123",
      phone_number: "07967876545",
      contact_first_name: "Frederic",
      contact_last_name: "Bolmere",
      contact_email_address: "fbolmy@gmail.com",
      logo_file_path: "/path/to/file",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: null,
      last_logged_in_at: null,
      address: {
        line_one: "The Address",
        line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    }
  ]
}

/*
 * Mock response for /networks/:slug/invitations GET
 */
export const fakeNetworkInvitationsGetResponse = {
  data: [
    {
      id: 90,
      email_address: "organisation1@gmail.com",
      organisation_id: 2,
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      organisation: {
        slug: "organisation-1",
        name: "Test Organisation 1",
        registration_number: "CDE456",
        fca_reference: "876645",
        website: "https://www.4cplatform.co.uk",
        description: "Test organisation 1",
        approved: true,
        active: false,
        created_at: "2021-02-12T11:38:00.000000Z",
        updated_at: "2021-02-12T12:52:05.000000Z",
        deleted_at: "2018-02-10T09:30Z"
      },
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
        first_name: "Joe",
        middle_names: "James",
        last_name: "Bloggs",
        mobile: 98676876,
        email_verified_at: "2018-02-10T09:30Z",
        simulation_mode: true,
        active: true,
        locked: false,
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z"
      }
    }
  ]
}

/**
 * Mock response for /networks/:slug/documents GET
 */
export const fakeNetworkDocumentsGetResponse = {
  data: [
    {
      id: 92,
      created_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      slug: "documentname",
      name: "some text",
      shared_with_count: 2,
      share_to_all: true,
      display_point: "both",
      network_id: 41,
      network: {
        id: 84,
        slug: "some text",
        created_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        name: "some text",
        updated_at: "2018-02-10T09:30Z",
        description: "some text",
        fca_reference: "876645",
        phone_number: "some text",
        contact_name: "some text",
        contact_email_address: "some text",
        company_registration_number: "some text",
        last_logged_in_at: "2018-02-10T09:30Z"
      },
      shared_with: [
        {
          id: 93,
          slug: "some text",
          created_at: "2018-02-10T09:30Z",
          deleted_at: "2018-02-10T09:30Z",
          name: "some text",
          updated_at: "2018-02-10T09:30Z",
          fca_reference: "876645",
          active: true,
          approved: true,
          contact_email_address: "some text",
          phone_number: "some text",
          website: "some text",
          logo_file_path: "some text",
          bypass_due_diligence: true,
          last_logged_in: "2018-02-10T09:30Z",
          network_id: 12,
          joined_network_at: "2018-02-10T09:30Z",
          deletable: true,
          company_registration_number: "some text",
          contact_first_name: "some text",
          contact_last_name: "some text",
          last_logged_in_at: "2018-02-10T09:30Z",
          description: "some text"
        },
        {
          id: 99,
          slug: "some text",
          created_at: "2018-02-10T09:30Z",
          deleted_at: "2018-02-10T09:30Z",
          name: "some text",
          updated_at: "2018-02-10T09:30Z",
          fca_reference: "876645",
          active: true,
          approved: true,
          contact_email_address: "some text",
          phone_number: "some text",
          website: "some text",
          logo_file_path: "some text",
          bypass_due_diligence: true,
          last_logged_in: "2018-02-10T09:30Z",
          network_id: 26,
          joined_network_at: "2018-02-10T09:30Z",
          deletable: true,
          company_registration_number: "some text",
          contact_first_name: "some text",
          contact_last_name: "some text",
          last_logged_in_at: "2018-02-10T09:30Z",
          description: "some text"
        }
      ],
      document_versions: [
        {
          id: 1,
          version_number: 1,
          active: false,
          file_name: "some text",
          mime_type: "some text",
          real_path: "some text",
          size_bytes: 10,
          created_at: "2018-02-10T09:30Z",
          deleted_at: "2018-02-10T09:30Z",
          updated_at: "2018-02-10T09:30Z"
        },
        {
          id: 2,
          version_number: 2,
          active: true,
          file_name: "some text",
          mime_type: "some text",
          real_path: "some text",
          size_bytes: 33,
          created_at: "2018-02-10T09:30Z",
          deleted_at: "2018-02-10T09:30Z",
          updated_at: "2018-02-10T09:30Z"
        }
      ],
      current_active_version: {
        id: 2,
        version_number: 2,
        active: true,
        file_name: "some text",
        mime_type: "some text",
        real_path: "some text",
        size_bytes: 33,
        created_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z"
      }
    }
  ]
}

/*
 * Mock response for /networks/:network/applications GET
 */
export const fakeNetworkApplicationsGetResponse = {
  data: [
    {
      id: 51,
      created_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      organisation: {
        id: 90,
        slug: "organisation-1",
        name: "Organisation One",
        contact_first_name: "Joe",
        contact_last_name: "Bloggs",
        contact_email_address: "joebloggs@gmail.com",
        phone_number: "07967876545",
        registration_number: "abc123",
        fca_reference: "876645",
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
        first_name: "Joe",
        middle_names: "James",
        last_name: "Bloggs",
        mobile: 98676876,
        email_verified_at: "2018-02-10T09:30Z",
        simulation_mode: true,
        active: true,
        locked: false,
        last_logged_in_at: "2018-02-10T09:30Z",
        created_at: "2018-02-10T09:30Z"
      }
    }
  ]
}

/**
 * Mock response for /networks/:slug/documents/:id GET
 */
export const fakeNetworkDocumentGetResponse = {
  data: {
    id: 92,
    created_at: "2018-02-10T09:30Z",
    deleted_at: "2018-02-10T09:30Z",
    updated_at: "2018-02-10T09:30Z",
    slug: "some text",
    name: "some text",
    shared_with_count: 2,
    share_to_all: true,
    display_point: "both",
    network_id: 41,
    network: {
      id: 84,
      slug: "some text",
      created_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      name: "some text",
      updated_at: "2018-02-10T09:30Z",
      description: "some text",
      fca_reference: "876645",
      phone_number: "some text",
      contact_name: "some text",
      contact_email_address: "some text",
      company_registration_number: "some text",
      last_logged_in_at: "2018-02-10T09:30Z"
    },
    shared_with: [
      {
        id: 93,
        slug: "some text",
        created_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        name: "some text",
        updated_at: "2018-02-10T09:30Z",
        fca_reference: "876645",
        active: true,
        approved: true,
        contact_email_address: "some text",
        phone_number: "some text",
        website: "some text",
        logo_file_path: "some text",
        bypass_due_diligence: true,
        last_logged_in: "2018-02-10T09:30Z",
        network_id: 12,
        joined_network_at: "2018-02-10T09:30Z",
        deletable: true,
        company_registration_number: "some text",
        contact_first_name: "some text",
        contact_last_name: "some text",
        last_logged_in_at: "2018-02-10T09:30Z",
        description: "some text"
      },
      {
        id: 99,
        slug: "some text",
        created_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        name: "some text",
        updated_at: "2018-02-10T09:30Z",
        fca_reference: "876645",
        active: true,
        approved: true,
        contact_email_address: "some text",
        phone_number: "some text",
        website: "some text",
        logo_file_path: "some text",
        bypass_due_diligence: true,
        last_logged_in: "2018-02-10T09:30Z",
        network_id: 26,
        joined_network_at: "2018-02-10T09:30Z",
        deletable: true,
        company_registration_number: "some text",
        contact_first_name: "some text",
        contact_last_name: "some text",
        last_logged_in_at: "2018-02-10T09:30Z",
        description: "some text"
      }
    ],
    document_versions: [
      {
        id: 1,
        version_number: 1,
        active: false,
        file_name: "some text",
        mime_type: "some text",
        real_path: "some text",
        size_bytes: 10,
        created_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z"
      },
      {
        id: 2,
        version_number: 2,
        active: true,
        file_name: "some text",
        mime_type: "some text",
        real_path: "some text",
        size_bytes: 33,
        created_at: "2018-02-10T09:30Z",
        deleted_at: "2018-02-10T09:30Z",
        updated_at: "2018-02-10T09:30Z"
      }
    ],
    current_active_version: {
      id: 2,
      version_number: 2,
      active: true,
      file_name: "some text",
      mime_type: "some text",
      real_path: "some text",
      size_bytes: 33,
      created_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z"
    }
  }
}

/**
 * Mock response for /networks/:network/documents/:document/organisations GET
 */
export const fakeNetworkDocumentsOrganisationsGetResponse = {
  data: [
    {
      id: 90,
      slug: "organisation-1",
      name: "Organisation One",
      contact_name: "Joe Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "876645",
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
      address: {
        address_line_one: "The Address",
        address_line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 91,
      slug: "organisation-2",
      name: "Organisation Two",
      contact_name: "Joe Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "876645",
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
      address: {
        address_line_one: "The Address",
        address_line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
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
      fca_reference: "876645",
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
      address: {
        address_line_one: "The Address",
        address_line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 93,
      slug: "organisation-4",
      name: "Organisation Four",
      contact_name: "Joe Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "876645",
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
      address: {
        address_line_one: "The Address",
        address_line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    },
    {
      id: 94,
      slug: "organisation-5",
      name: "Organisation Five",
      contact_first_name: "Joe",
      contact_last_name: "Bloggs",
      contact_email_address: "joebloggs@gmail.com",
      phone_number: "07967876545",
      registration_number: "abc123",
      fca_reference: "876645",
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
      address: {
        address_line_one: "The Address",
        address_line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    }
  ]
}

/**
 * Mock response for /networks/:slug/organisations GET
 */
export const fakeNetworkOrganisationsGetResponse = {
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
      fca_reference: "876645",
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
      address: {
        address_line_one: "The Address",
        address_line_two: "Two Lines",
        city: "InACity",
        county: "TheCounty",
        postcode: "GL7 5XZ"
      }
    }
  ]
}
