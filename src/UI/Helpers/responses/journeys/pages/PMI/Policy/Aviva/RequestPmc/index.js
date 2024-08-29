/**
 * Mock /journeys/:slug/consent response
 */
export const fakeAvivaRequestPmcGetResponse = {
  data: {
    page: {
      key: "AVIVA_INSURER_REQUEST_CERTIFICATE_OF_INSURANCE",
      stage: "POLICY",
      route: "/journeys/abcde-11111/aviva-insurer-request-certificate-of-insurance",
      conditionals: [],
      data: {
        pmc_received_and_meets_criteria: false
      }
    },
    journey: {
      id: 999,
      slug: "abcde-11111",
      organisation_id: 999,
      network_id: 999,
      user_id: 1005,
      client_id: 999,
      reference: "MZA2T-30819",
      product_type: "PMI",
      current_page: "AVIVA_INSURER_REQUEST_CERTIFICATE_OF_INSURANCE",
      simulation_mode: 1,
      locked: false,
      status: "IN_PROGRESS",
      pmc: {
        id: 1000,
        url: "https://storage.googleapis.com/fcng-local-private/journey/MZA2T-30819/PMC/AVj51gizfYwpBOMhWmP5YOdEPUJ0OoklEONHjqLO.pdf?GoogleAccessId=david-s-sa%40fcng-local.iam.gserviceaccount.com&Expires=1643723198&Signature=hBFzqr3tTuS1IJv8BpOuHNX95iOKrk2x1K0SCoAEvx5PwRGdAuBZNNCc4fFIWtW9BtkxzFVgGXDLu2vEp%2BtMUJX4Zz4aVPzXlfeQ%2FZCoh%2BZEdFudlZRhiAkVKNw82o%2FnPFCyFXbiG%2Fq%2FLs9wi3kyyvMxhSlsgk4%2BThu%2BA3CnHVhZFdVvfMMn47QB0U5nSAZhoLaKsfPqFmY2WwMBuhWttKfmG9kfJ40EUXyabFipYqdXCPxTACogyurnR1RB8vXIvxTj44nhlK8%2BNHedpLYppDWi2MZxmV5Z%2Fm1GLBG6uDKFTb4RoELUW4kT%2F5vLcm99jsaul8u1uq059%2F0AVYct5w%3D%3D",
        type: "PMC",
        file_path: "journey/MZA2T-30819/PMC/AVj51gizfYwpBOMhWmP5YOdEPUJ0OoklEONHjqLO.pdf",
        size: 226173,
        created_at: "2022-01-31T13:44:30.000000Z",
        updated_at: "2022-01-31T13:44:30.000000Z",
        deleted_at: null
      },
      meta: {
        pages: {
          CONSENT_TO_PERSONAL_INFO: {
            stage: "FACT_FIND",
            order: 0,
            route: "/journeys/abcde-11111/consent"
          }
        }
      },
      created_at: "2022-01-31T13:41:32.000000Z",
      updated_at: "2022-01-31T13:44:55.000000Z",
      deleted_at: null
    }
  }
}
