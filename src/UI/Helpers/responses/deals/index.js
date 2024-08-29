/**
 * Mock response for /deal-codes GET
 */
export const fakeDealCodesGetResponse = {
  data: [
    {
      id: 97,
      provider_id: 82,
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: null,
      product_type: "PMI",
      deal_code: "03492",
      name: "Deal Code name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start_date: "2018-02-10T09:30Z",
      end_date: "2018-02-10T09:30Z",
      style_new: true,
      style_switch: true,
      underwriting_fmu: true,
      underwriting_mori: true,
      quoting: true,
      onboarding: true,
      product: "Health Plus",
      active: true,
      slug: "deal-code-1",
      provider: {
        id: 75,
        name: "Aviva"
      }
    },
    {
      id: 98,
      provider_id: 82,
      created_at: "2018-02-10T09:30Z",
      updated_at: "2018-02-10T09:30Z",
      deleted_at: null,
      product_type: "PMI",
      deal_code: "39943223B",
      name: "Deal Code 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start_date: "2018-02-10T09:30Z",
      end_date: "2018-02-10T09:30Z",
      style_new: true,
      style_switch: true,
      underwriting_fmu: true,
      underwriting_mori: true,
      quoting: true,
      onboarding: true,
      product: "Health Plus",
      active: true,
      slug: "deal-code-2",
      provider: {
        id: 75,
        name: "Aviva"
      }
    }
  ]
}
