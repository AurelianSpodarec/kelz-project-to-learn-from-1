/**
 * This is a sample data structure for use in building the Storybook story for User Admin
 */
export const testData = [
  {
    id: 90,
    slug: "james-kirk",
    title: {
      label: "Mr",
      key: "MR"
    },
    role: {
      id: 9,
      name: "PROVIDER_ADMIN",
      guard_name: "web"
    },
    parent: {
      id: 45,
      name: "Test Insurance Provider",
      type: "PROVIDER",
      parent: {
        id: 46,
        name: "Original Enterprise Network",
        type: "NETWORK"
      }
    },
    first_name: "James",
    middle_names: "Tiberius",
    last_name: "Kirk",
    mobile: 98676876,
    email: "jamest@outlook.com",
    two_factor_auth: "authenticator",
    google_2fa_secret: "5VQUV6K5SEJZLWQ",
    email_verified_at: "2018-02-10T09:30Z",
    password_expires_at: "2018-02-10T09:30Z",
    simulation_mode: true,
    active: false,
    locked: false,
    created_at: "2018-02-10T09:30Z",
    deleted_at: null
  },
  {
    id: 91,
    slug: "jean-luc-picard",
    title: {
      label: "Mr",
      key: "MR"
    },
    role: {
      id: 9,
      name: "UNDERWRITER",
      guard_name: "web"
    },
    parent: {
      id: 45,
      name: "Test Insurance Provider",
      type: "PROVIDER"
    },
    first_name: "Jean Luc",
    middle_names: null,
    last_name: "Picard",
    mobile: 7732445678,
    email: "captainP@gmail.com",
    two_factor_auth: "none",
    google_2fa_secret: "5VQUV6K5SEJZLWQ",
    email_verified_at: "2018-02-10T09:30Z",
    password_expires_at: "2018-02-10T09:30Z",
    simulation_mode: true,
    active: true,
    locked: false,
    created_at: "2018-02-10T09:30Z",
    deleted_at: null
  },
  {
    id: 92,
    slug: "benjamin-sisko",
    title: {
      label: "Mr",
      key: "MR"
    },
    role: {
      id: 9,
      name: "ORG_ADMIN",
      guard_name: "web"
    },
    parent: {
      id: 45,
      name: "Test Corp",
      type: "ORGANISATION"
    },
    first_name: "Benjamin",
    middle_names: "Lafayette",
    last_name: "Sisko",
    mobile: 7854669335,
    email: "ds9@yahoo.co.uk",
    two_factor_auth: "authenticator",
    google_2fa_secret: "5VQUV6K5SEJZLWQ",
    email_verified_at: "2018-02-10T09:30Z",
    password_expires_at: "2018-02-10T09:30Z",
    simulation_mode: true,
    active: true,
    locked: false,
    created_at: "2018-02-10T09:30Z",
    deleted_at: null
  },
  {
    id: 93,
    slug: "kathryn-janeway",
    title: {
      label: "Ms",
      key: "MS"
    },
    role: {
      id: 9,
      name: "SALES_ADVISER",
      guard_name: "web"
    },
    parent: {
      id: 45,
      name: "Test Corp",
      type: "ORGANISATION"
    },
    first_name: "Kathryn",
    middle_names: null,
    last_name: "Janeway",
    mobile: 7855441278,
    email: "janeway@btinternet.co.uk",
    two_factor_auth: "authenticator",
    google_2fa_secret: "5VQUV6K5SEJZLWQ",
    email_verified_at: "2018-02-10T09:30Z",
    password_expires_at: "2018-02-10T09:30Z",
    simulation_mode: true,
    active: true,
    locked: false,
    created_at: "2018-02-10T09:30Z",
    deleted_at: null
  },
  {
    id: 94,
    slug: "johnathan-archer",
    title: {
      label: "Mr",
      key: "MR"
    },
    role: {
      id: 9,
      name: "NETWORK_ADMIN",
      guard_name: "web"
    },
    parent: {
      id: 45,
      name: "Test Network",
      type: "NETWORK"
    },
    first_name: "Johnathan",
    middle_names: null,
    last_name: "Archer",
    mobile: 98676876,
    email: "jarcher@aol.com",
    two_factor_auth: "authenticator",
    google_2fa_secret: "5VQUV6K5SEJZLWQ",
    email_verified_at: "2018-02-10T09:30Z",
    password_expires_at: "2018-02-10T09:30Z",
    simulation_mode: true,
    active: true,
    locked: false,
    created_at: "2018-02-10T09:30Z",
    deleted_at: null
  }
]
