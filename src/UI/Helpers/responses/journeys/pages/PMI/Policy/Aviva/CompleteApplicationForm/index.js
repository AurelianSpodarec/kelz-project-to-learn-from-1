/**
 * Mock response for /journeys/:journey/aviva-complete-application-form GET
 */
export const fakeAvivaCompleteApplicationFormGetResponse = {
  data: {
    page: {
      key: "AVIVA_COMPLETE_APPLICATION_FORM",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-complete-application-form",
      conditionals: [],
      data: []
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "CDRWS-39058",
      product_type: "PMI",
      current_page: "AVIVA_START_APPLICATION_FORM",
      simulation_mode: 1,
      locked: false,
      status: "IN_PROGRESS",
      paper_application_form: {
        id: 1026,
        url: "https://storage.googleapis.com/fcng-local-private/journey/CDRWS-39058/PAPER_APPLICATION_FORM/2PhFZ9AILJaXcf5PxEqmh97bE2gsrP7KWmPqGA2d.pdf?GoogleAccessId=david-s-sa%40fcng-local.iam.gserviceaccount.com&Expires=1643187494&Signature=NH%2Btr9TxUMwdNT3WVb8rplNqtRgZ0DhF%2BzdxIuA5zZUh7okQ62x3PFRAdmmjvSJi2eJ3djYTjh%2FwKwSKmE4Oh2tH29HwB4OkfRc6h4IvnfQ6y5Y4H0xSGGjE3wVTKqNk4RKhkV8WgkQsjEbxNHlGbnNwKlMhRXyOJHbFI3xMYLkUdqus%2FL7WwzQIvlx0oGPmfu%2Bccv62aJSsaJ32X9XAq2F%2FybR69w3mQ%2B8gIqFv6NZhEqI5%2F1%2BV%2F2h2aVgkVN3ED3tUKvB5SPJ4oqOfU2sOaB9D7VIVY0t6S4N9jR3rVJeDH2jOMPbY1FRUmCWuPpvOXTWtp952tPg9XTRgz7WE4Q%3D%3D",
        type: "PAPER_APPLICATION_FORM",
        file_path:
          "journey/CDRWS-39058/PAPER_APPLICATION_FORM/2PhFZ9AILJaXcf5PxEqmh97bE2gsrP7KWmPqGA2d.pdf",
        size: 226173,
        created_at: "2022-01-25T07:57:18.000000Z",
        updated_at: "2022-01-25T07:57:18.000000Z",
        deleted_at: null
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
          AVIVA_PMI_POLICY_WITHIN_PAST_YEAR: {
            stage: "POLICY",
            order: 11,
            route: "/journeys/abcde-11111/aviva-pmi-policy-within-past-year"
          },
          AVIVA_RENEWAL_COMMISSION: {
            stage: "POLICY",
            order: 12,
            route: "/journeys/abcde-11111/aviva-renewal-commission"
          },
          AVIVA_POLICY_DETAILS: {
            stage: "POLICY",
            order: 13,
            route: "/journeys/abcde-11111/aviva-policy-details"
          },
          AVIVA_UNDERWRITING_SUMMARY: {
            stage: "POLICY",
            order: 14,
            route: "/journeys/abcde-11111/aviva-underwriting-summary"
          },
          AVIVA_PAYMENT_SETUP: {
            stage: "POLICY",
            order: 15,
            route: "/journeys/abcde-11111/aviva-payment-set-up"
          },
          AVIVA_DIRECT_DEBIT_GUARANTEE: {
            stage: "POLICY",
            order: 16,
            route: "/journeys/abcde-11111/aviva-direct-debit-guarantee"
          }
        }
      },
      created_at: "2022-01-25T05:13:53.000000Z",
      updated_at: null,
      deleted_at: null
    }
  }
}
