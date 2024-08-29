import { colours } from "@4cplatform/elements/Helpers"

export const getSystemAdminDash = () => [
  [
    {
      title: "Providers",
      links: [
        {
          title: "Add provider",
          description: "Add a provider to the platform",
          route: "/providers/add"
        },
        {
          title: "Manage providers",
          description: "Manage all providers on the platform",
          route: "/providers"
        }
      ],
      colour: colours.providersTeal,
      icon: "hospital-building",
      route: "/providers"
    },
    {
      title: "Networks",
      links: [
        {
          title: "Add network",
          description: "Add a network to the platform",
          route: "/networks/add"
        },
        {
          title: "Manage networks",
          description: "Manage all networks on the platform",
          route: "/networks"
        }
      ],
      colour: colours.networksRed,
      icon: "domain",
      route: "/networks"
    },
    {
      title: "Organisations",
      links: [
        {
          title: "Manage organisations",
          description: "Manage all organisations on the platform",
          route: "/organisations"
        }
      ],
      colour: colours.organisationsOrange,
      icon: "office-building-outline",
      route: "/organisations"
    },
    {
      title: "People",
      links: [
        {
          title: "Manage leads",
          description: "Manage all leads on the platform",
          route: "/leads"
        },
        {
          title: "Manage clients",
          description: "Manage all clients on the platform",
          route: "/clients"
        }
      ],
      colour: colours.peopleGreen,
      icon: "account-group",
      route: null
    }
  ],
  {
    title: "Policies",
    links: [
      {
        title: "Awaiting terms",
        description: "All quotes awaiting terms",
        route: "/policies?status=AWAITING_TERMS"
      },
      {
        title: "Awaiting terms",
        description: "All simulated quotes awaiting terms",
        route: "/policies?status=AWAITING_TERMS&simulated=true",
        isSimulated: true
      },
      {
        title: "Awaiting acceptance",
        description: "All policies awaiting final terms and policy numbers",
        route: "/policies?status=AWAITING_ACCEPTANCE"
      },
      {
        title: "Awaiting acceptance",
        description: "All simulated policies awaiting final terms and policy numbers",
        route: "/policies?status=AWAITING_ACCEPTANCE&simulated=true",
        isSimulated: true
      },
      {
        title: "Failed to onboard",
        description: "All policies that failed onboarding",
        route: "/policies?status=FAILED_ONBOARDING"
      },
      {
        title: "Failed to onboard",
        description: "All simulated policies that failed onboarding",
        route: "/policies?status=FAILED_ONBOARDING&simulated=true",
        isSimulated: true
      }
    ],
    colour: colours.policiesPurple,
    icon: "format-list-checks",
    route: "/policies"
  },
  {
    title: "Sales",
    links: [
      {
        title: "Journeys in progress",
        description: "Incomplete quotes",
        route: "/journeys?status=IN_PROGRESS"
      },
      {
        title: "Quotes completed",
        description: "Completed quotes",
        route: "/journeys?status=COMPLETE"
      },
      {
        title: "Policies sold",
        description: "All policies sold to date",
        route: "/policies?status=SOLD"
      },
      {
        title: "Reports",
        description: "Manage information, screen, print and download",
        route: null
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: null
  },
  {
    title: "Admin",
    links: [
      {
        title: "System settings",
        description: "Manage system wide settings",
        route: "/system-settings"
      },
      {
        title: "User administration",
        description: "Manage all users on the platform",
        route: "/users"
      },
      {
        title: "Agency codes",
        description: "Manage and view agency codes and commission rates",
        route: "/agency-codes?agency_codes_type=agency_codes"
      },
      {
        title: "Deal codes",
        description: "Manage and view deal codes and assignments",
        route: "/deal-codes"
      },
      {
        title: "My account",
        description: "Manage your account, username and password, etc.",
        route: "/my-account?my-account=details"
      },
      {
        title: "Mail log",
        description: "View mail sent from this domain",
        route: null
      },
      {
        title: "Quote API Status",
        description: "Current status of all product APIs available on the platform",
        route: "/api-status"
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]

export const getSystemSupportAdminDash = () => [
  [
    {
      title: "Providers",
      links: [
        {
          title: "Add provider",
          description: "Add a provider to the platform",
          route: "/providers/add"
        },
        {
          title: "Manage providers",
          description: "Manage all providers on the platform",
          route: "/providers"
        }
      ],
      colour: colours.providersTeal,
      icon: "hospital-building",
      route: "/providers"
    },
    {
      title: "Networks",
      links: [
        {
          title: "Add network",
          description: "Add a network to the platform",
          route: "/networks/add"
        },
        {
          title: "Manage networks",
          description: "Manage all networks on the platform",
          route: "/networks"
        }
      ],
      colour: colours.networksRed,
      icon: "domain",
      route: "/networks"
    },
    {
      title: "Organisations",
      links: [
        {
          title: "Manage organisations",
          description: "Manage all organisations on the platform",
          route: "/organisations"
        }
      ],
      colour: colours.organisationsOrange,
      icon: "office-building-outline",
      route: "/organisations"
    },
    {
      title: "People",
      links: [
        {
          title: "Manage leads",
          description: "Manage all leads on the platform",
          route: "/leads"
        },
        {
          title: "Manage clients",
          description: "Manage all clients on the platform",
          route: "/clients"
        }
      ],
      colour: colours.peopleGreen,
      icon: "account-group",
      route: null
    }
  ],
  {
    title: "Policies",
    links: [
      {
        title: "Awaiting terms",
        description: "All quotes awaiting terms",
        route: "/policies?status=AWAITING_TERMS"
      },
      {
        title: "Awaiting terms",
        description: "All simulated quotes awaiting terms",
        route: "/policies?status=AWAITING_TERMS&simulated=true",
        isSimulated: true
      },
      {
        title: "Awaiting acceptance",
        description: "All policies awaiting final terms and policy numbers",
        route: "/policies?status=AWAITING_ACCEPTANCE"
      },
      {
        title: "Awaiting acceptance",
        description: "All simulated policies awaiting final terms and policy numbers",
        route: "/policies?status=AWAITING_ACCEPTANCE&simulated=true",
        isSimulated: true
      },
      {
        title: "Failed to onboard",
        description: "All policies that failed onboarding",
        route: "/policies?status=FAILED_ONBOARDING"
      },
      {
        title: "Failed to onboard",
        description: "All simulated policies that failed onboarding",
        route: "/policies?status=FAILED_ONBOARDING&simulated=true",
        isSimulated: true
      }
    ],
    colour: colours.policiesPurple,
    icon: "format-list-checks",
    route: "/policies"
  },
  {
    title: "Sales",
    links: [
      {
        title: "Journeys in progress",
        description: "Incomplete quotes",
        route: "/journeys?status=IN_PROGRESS"
      },
      {
        title: "Quotes completed",
        description: "Completed quotes",
        route: "/journeys?status=COMPLETE"
      },
      {
        title: "Policies sold",
        description: "All policies sold to date",
        route: "/policies?status=SOLD"
      },
      {
        title: "Reports",
        description: "Manage information, screen, print and download",
        route: null
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: null
  },
  {
    title: "Admin",
    links: [
      {
        title: "System settings",
        description: "Manage system wide settings",
        route: "/system-settings"
      },
      {
        title: "User administration",
        description: "Manage all users on the platform",
        route: "/users"
      },
      {
        title: "Agency codes",
        description: "Manage and view agency codes and commission rates",
        route: "/agency-codes?agency_codes_type=agency_codes"
      },
      {
        title: "Deal codes",
        description: "Manage and view deal codes and assignments",
        route: "/deal-codes"
      },
      {
        title: "My account",
        description: "Manage your account, username and password, etc.",
        route: "/my-account?my-account=details"
      },
      {
        title: "Mail log",
        description: "View mail sent from this domain",
        route: null
      },
      {
        title: "Quote API Status",
        description: "Current status of all product APIs available on the platform",
        route: "/api-status"
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]
