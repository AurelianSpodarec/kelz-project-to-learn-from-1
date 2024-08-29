import { colours } from "@4cplatform/elements/Helpers"

export const getProviderAdminDash = slug => [
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
    title: "Reports",
    links: [
      {
        title: "Sales premium",
        description: "View sales premium reports",
        route: null
      },
      {
        title: "Conversion rates",
        description: "View conversion rate reports",
        route: null
      },
      {
        title: "Sales by product",
        description: "View sales by product reports",
        route: null
      },
      {
        title: "Commission",
        description: "View commission reports",
        route: null
      }
    ],
    colour: colours.salesGreen,
    icon: "chart-bar",
    route: "/reports"
  },
  {
    title: "Admin",
    links: [
      {
        title: "My account",
        description: "Manage your account username and password, etc.",
        route: "/my-account?my-account=details"
      },
      {
        title: "Manage provider",
        description: "Manage your provider settings",
        route: `/providers/${slug}?manage=details`
      },
      {
        title: "User administration",
        description: "Manage and view users for your organisation",
        route: `/providers/${slug}?manage=users`
      },
      {
        title: "Agency codes",
        description: "Manage and view codes and commission rates",
        route: "/agency-codes?agency_codes_type=agency_codes"
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]

export const getUnderwriterDash = () => [
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
    title: "Reports",
    links: [
      {
        title: "Sales premium",
        description: "View sales premium reports",
        route: null
      },
      {
        title: "Policies sold",
        description: "View policies sold reports",
        route: "/policies?status=SOLD"
      },
      {
        title: "Conversion rates",
        description: "View conversion rate reports",
        route: null
      },
      {
        title: "Sales by product",
        description: "View sales by product reports",
        route: null
      },
      {
        title: "Commission",
        description: "View commission reports",
        route: null
      }
    ],
    colour: colours.salesGreen,
    icon: "chart-bar",
    route: "/reports"
  },
  {
    title: "Admin",
    links: [
      {
        title: "My account",
        description: "Manage your account username and password, etc.",
        route: "/my-account?my-account=details"
      }
    ],
    colour: colours.adminBlue,
    icon: "text-box-multiple-outline",
    route: "/my-account?my-account=details"
  }
]
