import { get } from "lodash"
import { fakeProductTypesGetResponse } from ".."
import { renderProductTypeOptions, requiredIfFalse } from "."

describe("Forms helpers", () => {
  test("renderProductTypesOptions()", () => {
    expect(renderProductTypeOptions(get(fakeProductTypesGetResponse, "data", {})).length).toBe(2)
    expect(renderProductTypeOptions(123232)).toEqual([])
    expect(renderProductTypeOptions(null)).toEqual([])
    expect(renderProductTypeOptions("test")).toEqual([])
    expect(renderProductTypeOptions(undefined)).toEqual([])
    expect(renderProductTypeOptions([])).toEqual([])
  })
  test("requiredIfFalse", () => {
    const values = { a: true, b: false, c: false }
    expect(requiredIfFalse(values, ["a", "b"])).toBe(true)
    expect(requiredIfFalse(values, ["c", "b"])).toBe(false)
    expect(requiredIfFalse()).toBe(false)
    expect(requiredIfFalse(2323, 3232)).toBe(false)
    expect(requiredIfFalse(null, null)).toBe(false)
  })
})
