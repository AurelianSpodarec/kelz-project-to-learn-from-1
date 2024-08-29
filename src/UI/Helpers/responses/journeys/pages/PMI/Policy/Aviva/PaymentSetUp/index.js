/**
 * Mock response for /journeys/:journey/aviva-payment-set-up GET
 */
export const fakeAvivaPaymentSetUpGetResponse = {
  data: {
    page: {
      key: "AVIVA_PAYMENT_SETUP",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-payment-set-up",
      conditionals: [],
      data: {
        visited: true,
        policy_holder_paying: true
      }
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "RKSHD-24074",
      product_type: "PMI",
      current_page: "AVIVA_PAYMENT_SETUP",
      simulation_mode: 1,
      locked: false,
      status: "IN_PROGRESS",
      selected_quote: {
        id: 999,
        slug: "john-apple-doe",
        reference: "reference-1",
        product_name: "HEALTHIERSOLUTIONS",
        underwriting_style: "NEW",
        underwriting_type: "MORI",
        monthly_premium: "74.23",
        annual_premium: "890.76",
        months_of_cover: 3,
        created_at: "2022-03-22T18:22:57.000000Z",
        updated_at: null,
        deleted_at: null,
        sent_to_client: 0,
        invalid: 0,
        start_date: "2022-04-21T00:00:00.000000Z",
        expiry_date: "2022-04-21T00:00:00.000000Z",
        payment_frequency: "monthly",
        options: [
          {
            name: "Hospital Option",
            value: "Trust"
          },
          {
            name: "Dental and Optical",
            value: "No"
          },
          {
            name: "GP Referred Services",
            value: "No"
          },
          {
            name: "Outpatient Limit",
            value: "£500"
          },
          {
            name: "Excess",
            value: "£1000"
          },
          {
            name: "Protected NCD",
            value: "No"
          },
          {
            name: "Psychiatric",
            value: "No"
          }
        ],
        brochure_path: "",
        demands_and_needs_path: "",
        demands_and_needs_custom_text: "",
        reasons_for_recommendation_custom_text: "",
        advantages_and_disadvantages_custom_text: "",
        excess: "£1000",
        outpatient_limit: "£500",
        hospital_list: "Trust",
        cancer_cover: "N/A",
        dental_cover: "No",
        therapies_cover: "N/A",
        psychiatric_cover: "No",
        provider: {
          id: 999,
          slug: "aviva",
          provider_key: "AVIVA",
          name: "Aviva",
          registration_number: "10342",
          primary_contact_email: "primary@aviva.test",
          risk_email: "risk@aviva.test",
          underwriting_email: "underwriting@aviva.test",
          onboarding_email: "onboarding@aviva.test",
          agency_codes_email: "agency@aviva.test",
          abbreviation: "avi",
          description: "Description of the provider",
          website: "www.testprovider.co.uk",
          last_logged_in_at: null,
          logo_file_path: null,
          created_at: "2022-03-22T18:22:57.000000Z",
          updated_at: null,
          deleted_at: null,
          products: {
            healthiersolutions: "HEALTHIERSOLUTIONS"
          }
        }
      },
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111/consent"
          },
          CLIENT_DETAILS: {
            stage: "FACT_FIND",
            order: 1,
            route: "/journeys/abcde-11111/client-details"
          },
          APPLICANTS: {
            stage: "FACT_FIND",
            order: 2,
            route: "/journeys/abcde-11111/applicant-details"
          },
          CURRENT_POLICY_DETAILS: {
            stage: "FACT_FIND",
            order: 3,
            route: "/journeys/abcde-11111/current-policy-details"
          },
          MEDICAL_HISTORY: {
            stage: "FACT_FIND",
            order: 4,
            route: "/journeys/abcde-11111/medical-history"
          },
          INPATIENT_OUTPATIENT: {
            stage: "FACT_FIND",
            order: 5,
            route: "/journeys/abcde-11111/explain-inpatient-outpatient"
          },
          HOSPITAL_PREFERENCE: {
            stage: "FACT_FIND",
            order: 6,
            route: "/journeys/abcde-11111/hospital-preference"
          },
          UNDERWRITING_STYLE: {
            stage: "FACT_FIND",
            order: 7,
            route: "/journeys/abcde-11111/underwriting-style"
          },
          START_DATE_AND_BUDGET: {
            stage: "FACT_FIND",
            order: 8,
            route: "/journeys/abcde-11111/start-date-and-budget"
          },
          QUOTE_COMPARISON: {
            stage: "QUOTE",
            order: 9,
            route: "/journeys/abcde-11111/quote-comparison"
          },
          QUOTATION_SUMMARY: {
            stage: "QUOTE",
            order: 10,
            route: "/journeys/abcde-11111/quotation-summary"
          },
          HOSPITAL_LIST_CONFIRMATION: {
            stage: "QUOTE",
            order: 11,
            route: "/journeys/abcde-11111/hospital-list-confirmation"
          },
          AVIVA_PMI_POLICY_WITHIN_PAST_YEAR: {
            stage: "POLICY",
            order: 12,
            route: "/journeys/abcde-11111/aviva-pmi-policy-within-past-year"
          },
          AVIVA_RENEWAL_COMMISSION: {
            stage: "POLICY",
            order: 13,
            route: "/journeys/abcde-11111/aviva-renewal-commission"
          },
          AVIVA_POLICY_DETAILS: {
            stage: "POLICY",
            order: 14,
            route: "/journeys/abcde-11111/aviva-policy-details"
          },
          AVIVA_UNDERWRITING_SUMMARY: {
            stage: "POLICY",
            order: 15,
            route: "/journeys/abcde-11111/aviva-underwriting-summary"
          },
          AVIVA_PAYMENT_SETUP: {
            stage: "POLICY",
            order: 16,
            route: "/journeys/abcde-11111/aviva-payment-set-up"
          }
        }
      },
      created_at: "2022-03-22T18:22:57.000000Z",
      updated_at: "2022-03-22T18:56:18.000000Z",
      deleted_at: null
    }
  }
}
