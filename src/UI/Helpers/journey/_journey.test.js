import { get } from "lodash"
import { object } from "yup"
import { testData, testData1 } from "../../Templates/Journey/story/journey.story.helpers.js"

import { mapDataToFormik, mapDataToYup, getNavigation, getStageParam, getPreviousStage } from "."

describe("Journey helpers", () => {
  test("mapDataToFormik helper function", async () => {
    expect(mapDataToFormik(testData)).toEqual({ consent_to_personal_information: false })
    expect(mapDataToFormik(testData1)).toEqual({
      address: {
        city: "",
        county: "",
        line_one: "",
        line_two: "",
        postcode: ""
      },
      axa_questions_had_or_received_treatment_for_heart_condition: false,
      email_address: "",
      permanent_uk_resident: false
    })
    expect(mapDataToFormik({})).toEqual({})
    expect(mapDataToFormik(12323)).toEqual({})
    expect(mapDataToFormik("Excelsior")).toEqual({})
    expect(mapDataToFormik([{}])).toEqual({})
    expect(mapDataToFormik(undefined)).toEqual({})
    expect(mapDataToFormik(null)).toEqual({})
  })

  test("mapDataToYup helper function", async () => {
    expect(JSON.stringify(mapDataToYup({})) === JSON.stringify(object())).toBe(true)
    expect(JSON.stringify(mapDataToYup(12323)) === JSON.stringify(object())).toBe(true)
    expect(JSON.stringify(mapDataToYup("Excelsior")) === JSON.stringify(object())).toBe(true)
    expect(JSON.stringify(mapDataToYup([{}])) === JSON.stringify(object())).toBe(true)
    expect(JSON.stringify(mapDataToYup(undefined)) === JSON.stringify(object())).toBe(true)
    expect(JSON.stringify(mapDataToYup(null)) === JSON.stringify(object())).toBe(true)
  })

  test("getNavigation", async () => {
    expect(getNavigation(testData)).toEqual([
      [
        {
          title: "Consent",
          key: "CONSENT_TO_PERSONAL_INFO",
          order: 0,
          route: "/journeys/ABC0M-19796/consent",
          stage: "FACT_FIND"
        }
      ],
      [],
      []
    ])
    expect(getNavigation(null)).toEqual([[], [], []])
    expect(getNavigation(12323)).toEqual([[], [], []])
    expect(getNavigation("Excelsior")).toEqual([[], [], []])
    expect(getNavigation([{}])).toEqual([[], [], []])
    expect(getNavigation(undefined)).toEqual([[], [], []])
    expect(getNavigation(null)).toEqual([[], [], []])
  })

  test("getStageParam", async () => {
    expect(getStageParam(get(testData, "page"))).toBe("consent")
    expect(getStageParam(get(testData1, "page"))).toBe("client-details")
    expect(getStageParam(null)).toEqual("")
    expect(getStageParam(12323)).toEqual("")
    expect(getStageParam("Excelsior")).toEqual("")
    expect(getStageParam([{}])).toEqual("")
    expect(getStageParam(undefined)).toEqual("")
    expect(getStageParam(null)).toEqual("")
  })

  test("getPreviousStage", async () => {
    expect(getPreviousStage(testData)).toBe("consent")
    expect(getPreviousStage(null)).toEqual("")
    expect(getPreviousStage(12323)).toEqual("")
    expect(getPreviousStage("Excelsior")).toEqual("")
    expect(getPreviousStage([{}])).toEqual("")
    expect(getPreviousStage(undefined)).toEqual("")
    expect(getPreviousStage(null)).toEqual("")
  })
})
