import { colours } from "@4cplatform/elements/Helpers"

export const getNetworkAdminDash = slug => [
  {
    title: "Organisations",
    links: [
      {
        title: "Send invitation",
        description: "Invite an organisation to your network",
        route: `/networks/${slug}?manage=invitations&send_open=true`
      },
      {
        title: "Active organisations",
        description: "Manage all active organisations in your network",
        route: `/networks/${slug}?manage=members`
      },
      {
        title: "Pending invitations",
        description: "View all pending organisation invitations in your network",
        route: `/networks/${slug}?manage=invitations`
      },
      {
        title: "Pending applications",
        description: "View all pending organisation applications in your network",
        route: `/networks/${slug}?manage=applications`
      }
    ],
    colour: colours.networksRed,
    icon: "office-building-outline",
    route: `/networks/${slug}?manage=members`
  },
  {
    title: "Quotes",
    links: [
      {
        title: "Quotes",
        description: "All quotes to date",
        route: `/networks/${slug}?manage=quotes`
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: `/networks/${slug}?manage=quotes`
  },
  {
    title: "Policies",
    links: [
      {
        title: "Policies sold",
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
        description: "Manage your account, username and password, etc.",
        route: "/my-account?my-account=details"
      },
      {
        title: "Manage Network",
        description: "Configure your network's settings",
        route: `/networks/${slug}?manage=details`
      },
      {
        title: "User administration",
        description: "Manage all users on the platform",
        route: `/networks/${slug}?manage=users`
      },
      {
        title: "Documents",
        description: "View all documents from your network",
        route: `/networks/${slug}?manage=documents`
      },
      {
        title: "Reports",
        description: "Manage information, screen, print and download",
        route: null
      },
      {
        title: "Mail log",
        description: "View mail sent from this domain",
        route: null
      },
      {
        title: "Commission rates",
        description: "Commission rates for organisations",
        route: null
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]

export const getNetworkMemberAdminDash = slug => [
  {
    title: "Quotes",
    links: [
      {
        title: "Quotes completed",
        description: "All quotes completed to date",
        route: `/networks/${slug}?manage=quotes`
      }
    ],
    colour: colours.quotesBlue,
    icon: "map-marker-path",
    route: `/networks/${slug}?manage=quotes`
  },
  {
    title: "Policies",
    links: [
      {
        title: "Policies sold",
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
        title: "Manage Network",
        description: "Configure your network's settings",
        route: `/networks/${slug}?manage=details`
      },
      {
        title: "My account",
        description: "Manage your account, username and password, etc.",
        route: "/my-account?my-account=details"
      },
      {
        title: "Documents",
        description: "View all documents from your network",
        route: `/networks/${slug}?manage=documents`
      },
      {
        title: "Reports",
        description: "Manage information, screen, print and download",
        route: null
      },
      {
        title: "Mail log",
        description: "View mail sent from this domain",
        route: null
      },
      {
        title: "Commission rates",
        description: "Commission rates for organisations",
        route: null
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]
