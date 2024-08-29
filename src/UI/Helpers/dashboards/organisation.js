import { colours } from "@4cplatform/elements/Helpers"

export const getOrganisationAdminDash = slug => [
  {
    title: "Leads",
    links: [
      {
        title: "Quick quote",
        description: "Create a quick quote based on the date of birth and postcode",
        route: null
      },
      {
        title: "Create new lead",
        description: "Create new leads for this account",
        route: "/leads/add"
      },
      {
        title: "Manage leads",
        description: "Manage leads for this account",
        route: "/leads"
      },
      {
        title: "Reports",
        description: "Manage information, screen, print and download",
        route: null
      }
    ],
    colour: colours.blue,
    icon: "clipboard-account-outline",
    route: "/leads"
  },
  {
    title: "Quotes",
    links: [
      {
        title: "Journeys in progress",
        description: "Journeys in progress",
        route: "/journeys?status=IN_PROGRESS"
      },
      {
        title: "Quotes completed",
        description: "Quotes completed",
        route: `/organisations/${slug}?manage=client_journeys&status=COMPLETE`
      },
      {
        title: "Manage clients",
        description: "View all clients in this account",
        route: "/clients"
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: null
  },
  {
    title: "Policies",
    links: [
      {
        title: "All policies",
        description: "All policies sold to date",
        route: "/policies?status=SOLD"
      },
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
    title: "Admin",
    links: [
      {
        title: "My account",
        description: "Manage your account username and password, etc",
        route: "/my-account?my-account=details"
      },
      {
        title: "Manage my organisation",
        description: "Configure your organisation's settings",
        route: `/organisations/${slug}?manage=details`
      },
      {
        title: "User administration",
        description: "Manage and view team members for your organisation",
        route: `/organisations/${slug}?manage=users`
      },
      {
        title: "Mail log",
        description: "View mail sent from this domain",
        route: null
      },
      {
        title: "Commission rates",
        description: "Commission rates for Organisations",
        route: null
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]

export const getSalesAdviserDash = slug => [
  {
    title: "Leads",
    links: [
      {
        title: "Quick quote",
        description: "Create a quick quote based on the date of birth and postcode",
        route: null
      },
      {
        title: "Create new lead",
        description: "Create new leads for this account",
        route: "/leads/add"
      },
      {
        title: "Manage leads",
        description: "Manage leads for this account",
        route: "/leads"
      },
      {
        title: "Reports",
        description: "Manage information, screen, print and download",
        route: null
      }
    ],
    colour: colours.blue,
    icon: "clipboard-account-outline",
    route: "/leads"
  },
  {
    title: "Quotes",
    links: [
      {
        title: "Journeys in progress",
        description: "Journeys in progress",
        route: "/journeys?status=IN_PROGRESS"
      },
      {
        title: "Quotes completed",
        description: "Quotes completed",
        route: `/organisations/${slug}?manage=client_journeys&status=COMPLETE`
      },
      {
        title: "Manage clients",
        description: "View all clients in this account",
        route: "/clients"
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: null
  },
  {
    title: "Policies",
    links: [
      {
        title: "All policies",
        description: "All policies sold to date",
        route: "/policies?status=SOLD"
      },
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
    title: "Admin",
    links: [
      {
        title: "My account",
        description: "Manage your account username and password, etc",
        route: "/my-account?my-account=details"
      },
      {
        title: "Mail log",
        description: "View mail sent from this domain",
        route: null
      },
      {
        title: "Commission rates",
        description: "Commission rates for Organisations",
        route: null
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]
