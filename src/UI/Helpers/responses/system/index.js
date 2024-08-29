/**
 * Mock /system-settings GET response
 */
export const fakeSystemSettingsGetResponse = {
  data: {
    id: 1,
    maintenance_mode: true,
    created_at: "2018-02-10T09:30Z",
    updated_at: "2018-02-10T09:30Z"
  }
}

/**
 * Mock /due-diligences GET response
 */
export const fakeDueDiligencesGetResponse = {
  data: [
    {
      id: 1,
      slug: "test-title-1",
      title: "Test Title 1",
      description: "This is a description of a due diligence item",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z"
    },
    {
      id: 2,
      slug: "test-title-2",
      title: "Test Title 2",
      description: "This is a description of a due diligence item",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z"
    },
    {
      id: 3,
      slug: "test-title-3",
      title: "Test Title 3",
      description: "This is a description of a due diligence item",
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: "2018-02-10T09:30Z"
    }
  ]
}

/**
 * Mock /api-status GET response
 */
export const fakeApiStatusGetResponse = {
  data: [
    {
      api_provider: "AVIVA",
      friendly_name: "Aviva",
      status: true,
      message: "OK",
      last_updated: 1630419685,
      duration: 0
    },
    {
      api_provider: "AXA",
      friendly_name: "AXA",
      status: true,
      message: "OK",
      last_updated: 1630419687,
      duration: 2
    },
    {
      api_provider: "BUPA",
      friendly_name: "Bupa",
      status: true,
      message: "OK",
      last_updated: 1630419689,
      duration: 2
    },
    {
      api_provider: "THE_EXETER",
      friendly_name: "The Exeter",
      status: false,
      message: "TIMED_OUT",
      last_updated: 1630419700,
      duration: 30
    }
  ]
}
