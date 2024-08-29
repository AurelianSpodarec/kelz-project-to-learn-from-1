export const fakeUsersGetResponse = {
  data: [
    {
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
  ]
}

export const fakeUsersPostResponse = {
  message: "OK"
}

export const fakeAuthSelfServiceResponse = {
  data: {
    id: 1,
    email: "system.admin@usaycompare.com",
    password_expires_at: "2022-02-20T13:31:57.000000Z",
    two_factor_auth: "TWO_FA_NONE",
    two_factor_auth_pending: null,
    mobile: null,
    google_authenticator_secret: null,
    maintenance_mode_accessible: true,
    locked: false,
    active: true,
    login_attempts: 0,
    last_logged_in_at: "2022-01-26T18:08:12.000000Z",
    created_at: "2022-01-21T13:31:57.000000Z",
    updated_at: "2022-01-26T18:08:12.000000Z",
    deleted_at: null
  }
}

export const fakeSelfServiceResponse = {
  data: {
    id: 1,
    slug: "system-admin",
    title: {
      key: "MR",
      label: "Mr",
      gender: "male"
    },
    role: {
      id: 9,
      name: "SYS_ADMIN"
    },
    parent: null,
    first_name: "System",
    middle_names: null,
    last_name: "Admin",
    email: "system.admin@usaycompare.com",
    mobile: null,
    email_verified_at: "2022-02-02T18:27:33.000000Z",
    active: true,
    locked: false,
    created_at: null,
    deleted_at: null,
    last_logged_in_at: "2022-02-03T13:58:19.000000Z",
    settings: [
      {
        id: 1,
        group: "NOTIFICATIONS",
        key: "RECEIVE_PASSWORD_EXPIRY_EMAIL",
        data: {
          value: true
        }
      }
    ]
  }
}

export const fakeUnreadNotificationsGetResponse = {
  data: [
    {
      id: 1,
      subject: "User created",
      body: "<h1>A user has been created</h1>",
      read: 1,
      sent_at: "2019-01-01T12:00:00.000Z"
    }
  ]
}

export const fakeTitlesResponse = {
  data: {
    MR: {
      title: "Mr",
      gender: "male"
    },
    MRS: {
      title: "Mrs",
      gender: "female"
    },
    SER: {
      title: "Ser",
      gender: "none"
    }
  }
}

export const fakeOccupationsResponse = {
  data: {
    OTHER: "Other",
    CLIENT: "Client",
    STUDENT_FULL_TIME: "Student (Full Time)",
    DOCTOR: "Doctor",
    DOCTOR_RETIRED: "Doctor \u2013 Retired",
    MEDICAL_PRACTITIONER_GP: "Medical Practitioner \u2013 GP",
    MEDICAL_PRACTITIONER_SURGEON: "Medical Practitioner \u2013 surgeon",
    DENTIST: "Dentist",
    DENTIST_RETIRED: "Dentist \u2013 Retired",
    DENTAL_ASSISTANT: "Dental Assistant",
    DENTAL_HYGIENIST: "Dental Hygienist"
  }
}

export const fakeRolesResponse = {
  data: [
    {
      id: 2,
      name: "SALES_ADVISER"
    },
    {
      id: 3,
      name: "UNDERWRITER"
    },
    {
      id: 4,
      name: "ORG_ADMIN"
    },
    {
      id: 5,
      name: "PROVIDER_ADMIN"
    },
    {
      id: 6,
      name: "NETWORK_MEMBER_ADMIN"
    },
    {
      id: 7,
      name: "NETWORK_ADMIN"
    },
    {
      id: 8,
      name: "SUPPORT_ADMIN"
    },
    {
      id: 9,
      name: "SYS_ADMIN"
    }
  ]
}
