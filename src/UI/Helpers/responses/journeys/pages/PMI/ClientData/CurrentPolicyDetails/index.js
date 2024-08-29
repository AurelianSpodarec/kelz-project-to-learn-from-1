/**
 * Mock response for /journeys/:journey/current-policy-details GET
 */
export const fakeCurrentPolicyDetailsGetResponse = {
  data: {
    page: {
      key: "CURRENT_POLICY_DETAILS",
      stage: "FACT_FIND",
      route: "/journeys/kresb-91199/current-policy-details",
      conditionals: [],
      data: {
        cp_current_policy: true,
        cp_company_or_group_policy: false,
        cp_current_insurer: "AVIVA",
        cp_current_product_name: "PMI",
        cp_renewal_date: "2021-10-14",
        cp_underwritten_in_uk: true,
        cp_monthly_cost: "500",
        visited: true
      },
      title: "Current policy",
      navTitle: "Current policy",
      subtitle:
        "Does the client have an existing live PMI policy in place or one that has lapsed in the past 30 days?",
      sections: [
        {
          key: "current_policy",
          components: [
            {
              key: "cp_current_policy",
              initialValue: true,
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {
                  required: true
                },
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [null],
                transforms: [null],
                type: "boolean",
                _type: "boolean"
              },
              label: "Client has a current policy",
              componentProps: {
                helperText:
                  "By clicking 'YES' and confirming the client has a live PMI policy in place you will be presented with the option of switching to other providers on the same underwriting terms. By clicking on 'NO' you will only have the underwriting options available for people who are currently uninsured.",
                options: [
                  {
                    order: 0,
                    label: "No",
                    value: false
                  },
                  {
                    order: 1,
                    label: "Yes",
                    value: true
                  }
                ],
                isHorizontal: true
              }
            }
          ]
        },
        {
          key: "current_policy_details",
          components: [
            {
              componentProps: {
                children: {
                  key: null,
                  ref: null,
                  props: {
                    children: [
                      {
                        key: null,
                        ref: null,
                        props: {
                          margin: "0 0 1rem",
                          children: "Compliance Note",
                          width: null,
                          colour: "",
                          align: "left",
                          fontSize: null,
                          lineHeight: null,
                          padding: "0",
                          minFont: 12,
                          maxFont: 16,
                          minLine: 16,
                          maxLine: 20,
                          appearance: "dark",
                          isLoading: false,
                          loadingWidth: "20rem",
                          helperText: "",
                          helperPosition: "right",
                          helperTitle: ""
                        },
                        _owner: null,
                        _store: {}
                      },
                      {
                        key: null,
                        ref: null,
                        props: {
                          children:
                            "You need to prompt the client that they would need to cancel their existing policy or wait until the term end to start this policy, which will start from the date their cancellation/term ends.",
                          width: null,
                          colour: "",
                          align: "left",
                          fontSize: "",
                          lineHeight: "",
                          margin: "0 0 2rem",
                          padding: "0",
                          minFont: 14,
                          maxFont: 16,
                          minLine: 16,
                          maxLine: 20,
                          appearance: "dark",
                          isLoading: false,
                          loadingLines: 3,
                          loadingMargin: "0 0 1rem"
                        },
                        _owner: null,
                        _store: {}
                      }
                    ]
                  },
                  _owner: null,
                  _store: {}
                },
                type: "error"
              },
              skipDataMap: true
            },
            {
              componentProps: {
                children: "Current policy details"
              },
              skipDataMap: true
            },
            {
              componentProps: {
                children:
                  "This information can be found on the renewal documents from your existing insurer or certificate of insurance."
              },
              skipDataMap: true
            },
            {
              key: "cp_company_or_group_policy",
              initialValue: false,
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {
                  required: true
                },
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [null],
                transforms: [null],
                type: "boolean",
                _type: "boolean"
              },
              label: "Group/company policy",
              componentProps: {
                options: [
                  {
                    order: 0,
                    label: "No",
                    value: false
                  },
                  {
                    order: 1,
                    label: "Yes",
                    value: true
                  }
                ],
                isHorizontal: true
              }
            },
            {
              key: "cp_current_insurer",
              initialValue: "AVIVA",
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {
                  required: true
                },
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [null],
                transforms: [null],
                type: "string",
                _type: "string"
              },
              label: "Current insurer",
              componentProps: {
                name: "provider_option",
                isHorizontal: true,
                labelWidth: "24rem",
                isRequired: true,
                margin: "0 0 2rem",
                noun: {
                  singular: "insurer",
                  plural: "insurers"
                },
                endpoint: "/providers"
              }
            },
            {
              key: "cp_current_product_name",
              initialValue: "PMI",
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {
                  required: true
                },
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [null],
                transforms: [null],
                type: "string",
                _type: "string"
              },
              label: "Current product",
              componentProps: {
                name: "product_type",
                isHorizontal: true,
                labelWidth: "24rem",
                isRequired: true,
                margin: "0 0 2rem",
                noun: {
                  singular: "product",
                  plural: "products"
                },
                endpoint: "/product-types"
              }
            },
            {
              key: "cp_renewal_date",
              initialValue: "2021-10-14",
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {
                  required: true
                },
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [null],
                transforms: [null],
                type: "string",
                _type: "string"
              },
              label: "Renewal date of existing policy",
              componentProps: {
                isHorizontal: true,
                labelWidth: "24rem",
                isRequired: true,
                margin: "0 0 1rem"
              }
            },
            {
              key: "cp_underwritten_in_uk",
              initialValue: true,
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {
                  required: true
                },
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [null],
                transforms: [null],
                type: "boolean",
                _type: "boolean"
              },
              label: "Current policy underwritten in the UK?",
              componentProps: {
                options: [
                  {
                    order: 0,
                    label: "No",
                    value: false
                  },
                  {
                    order: 1,
                    label: "Yes",
                    value: true
                  }
                ],
                isHorizontal: true
              }
            },
            {
              key: "cp_monthly_cost",
              initialValue: "500",
              validationSchema: {
                _deps: [],
                _conditions: [],
                _options: {
                  abortEarly: true,
                  recursive: true
                },
                _exclusive: {},
                _whitelist: {
                  list: {},
                  refs: {}
                },
                _blacklist: {
                  list: {},
                  refs: {}
                },
                tests: [],
                transforms: [null],
                type: "string",
                _type: "string",
                _nullable: true
              },
              label: "Current monthly cost",
              componentProps: {
                leadingIcon: "currency-gbp",
                leadingIconType: "prepend",
                placeholder: "Amount",
                isHorizontal: true,
                labelWidth: "24rem",
                margin: "0 0 2rem"
              }
            }
          ]
        }
      ]
    },
    journey: {
      id: 1006,
      slug: "kresb-91199",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "KRESB-91199",
      product_type: "PMI",
      current_page: "CURRENT_POLICY_OPTIONS",
      simulation_mode: false,
      locked: false,
      status: "IN_PROGRESS",
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/kresb-91199/consent"
          },
          CLIENT_DETAILS: {
            stage: "FACT_FIND",
            order: 1,
            route: "/journeys/kresb-91199/client-details"
          },
          APPLICANTS: {
            stage: "FACT_FIND",
            order: 2,
            route: "/journeys/kresb-91199/applicant-details"
          },
          CURRENT_POLICY_DETAILS: {
            stage: "FACT_FIND",
            order: 3,
            route: "/journeys/kresb-91199/current-policy-details"
          }
        }
      },
      created_at: "2021-10-12T16:18:02.000000Z",
      updated_at: "2021-10-12T19:25:45.000000Z",
      deleted_at: null
    }
  }
}
