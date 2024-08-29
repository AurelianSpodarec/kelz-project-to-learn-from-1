export const testData = [
  {
    id: 1000,
    slug: "jane-apple-doe",
    user_id: 1006,
    organisation_id: 999,
    lead_id: 1000,
    title: "MRS",
    first_name: "Jane",
    middle_names: "Apple",
    last_name: "Doe",
    gender_at_birth: "female",
    date_of_birth: "2003-08-04T00:00:00.000000Z",
    email_address: "jane.doe@example4.com",
    phone_numbers: [
      {
        id: 1012,
        number: "7707123456",
        type: "WORK"
      }
    ],
    notes: [
      {
        id: null,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        created_at: "2021-08-04T14:59:06.000000Z",
        updated_at: null,
        deleted_at: null
      }
    ],
    onboarded_policies_count: 1,
    quotes_in_progress_count: 1,
    address: {
      id: 7,
      type: "PRIMARY",
      line_one: "456 Ox Street",
      line_two: null,
      city: "Oxford",
      county: "Oxfordshire",
      postcode: "OX53 2KF",
      created_at: "2021-08-04T14:59:07.000000Z",
      updated_at: "2021-08-04T14:59:07.000000Z",
      deleted_at: null
    },
    created_at: "2021-08-04T14:59:06.000000Z",
    updated_at: null,
    deleted_at: null
  },
  {
    id: 999,
    slug: "john-apple-doe",
    user_id: 1005,
    organisation_id: 999,
    lead_id: 999,
    title: "MR",
    first_name: "John",
    middle_names: "Apple",
    last_name: "Doe",
    gender_at_birth: "male",
    date_of_birth: "2003-08-04T00:00:00.000000Z",
    email_address: "john.doe@example.test",
    phone_numbers: [
      {
        id: 999,
        number: "123456789",
        type: "PRIMARY"
      }
    ],
    notes: [
      {
        id: null,
        body: "",
        created_at: "2021-08-04T14:59:06.000000Z",
        updated_at: null,
        deleted_at: null
      },
      {
        id: null,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        created_at: "2021-08-04T14:59:06.000000Z",
        updated_at: null,
        deleted_at: null
      }
    ],
    onboarded_policies_count: 0,
    quotes_in_progress_count: 1,
    address: {
      id: 6,
      type: "PRIMARY",
      line_one: "456 Ox Street",
      line_two: null,
      city: "Oxford",
      county: "Oxfordshire",
      postcode: "OX53 2KF",
      created_at: "2021-08-04T14:59:07.000000Z",
      updated_at: "2021-08-04T14:59:07.000000Z",
      deleted_at: null
    },
    created_at: "2021-08-04T14:59:06.000000Z",
    updated_at: null,
    deleted_at: null
  }
]

export const testClientNotes = [
  {
    id: 1001,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    created_at: "2021-08-10T20:28:10.000000Z",
    updated_at: null,
    deleted_at: null
  }
]
