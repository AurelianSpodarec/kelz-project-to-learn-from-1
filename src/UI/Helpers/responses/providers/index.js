export const fakeProvidersGetResponse = {
  data: [
    {
      id: 999,
      slug: "aviva",
      provider_key: "AVIVA",
      name: "Aviva",
      registration_number: "10342",
      abbreviation: "avi",
      description: "Description of the provider",
      website: "www.testprovider.co.uk",
      last_logged_in_at: null,
      logo_file_path: null,
      created_at: "2021-09-15T13:18:21.000000Z",
      updated_at: null,
      deleted_at: null,
      products: {
        healthiersolutions: "HEALTHIERSOLUTIONS"
      }
    },
    {
      id: 1000,
      slug: "bupa",
      provider_key: "BUPA",
      name: "Bupa",
      registration_number: "14866",
      abbreviation: "bup",
      description: "Description of the provider",
      website: "www.testprovider2.co.uk",
      last_logged_in_at: null,
      logo_file_path:
        "https://storage.googleapis.com/fcng-local-public/george-a/storage/providers/provider-logo.jpg",
      created_at: "2021-09-15T13:18:21.000000Z",
      updated_at: null,
      deleted_at: null,
      products: {
        bupabyyou: "BUPABYYOU",
        fundamentals: "FUNDAMENTALS"
      }
    },
    {
      id: 1001,
      slug: "the-exeter",
      provider_key: "EXETER",
      name: "The Exeter",
      registration_number: "10194",
      abbreviation: "ext",
      description: "Description of the provider",
      website: "www.testprovider3.co.uk",
      last_logged_in_at: null,
      logo_file_path: null,
      created_at: "2021-09-15T13:18:21.000000Z",
      updated_at: null,
      deleted_at: null,
      products: {
        healthplus: "HEALTHPLUS"
      }
    },
    {
      id: 1002,
      slug: "axa",
      provider_key: "AXA",
      name: "AXA",
      registration_number: "12285",
      abbreviation: "axa",
      description: "Description of the provider",
      website: "www.testprovider4.co.uk",
      last_logged_in_at: null,
      logo_file_path: null,
      created_at: "2021-09-15T13:18:21.000000Z",
      updated_at: null,
      deleted_at: null,
      products: {
        axapersonalhealth: "AXAPERSONALHEALTH",
        inspire: "INSPIRE",
        healthforyou: "HEALTHFORYOU"
      }
    }
  ]
}

/**
 * Mock response for /provider/:slug GET
 */
export const fakeProviderGetResponse = {
  data: {
    id: 90,
    slug: "aviva",
    provider_key: "AVIVA",
    name: "Aviva",
    abbreviation: "AVI",
    description: "This is a description of Aviva",
    registration_number: "123456rthrth",
    website: "www.aviva.com",
    primary_contact_email: "primary@aviva.test",
    created_at: "2018-02-10T09:30Z",
    updated_at: "2018-02-10T09:30Z"
  }
}

/**
 * Mock response for /available-providers GET
 */
export const fakeAvailableProvidersGetResponse = {
  data: ["EXETER"]
}
