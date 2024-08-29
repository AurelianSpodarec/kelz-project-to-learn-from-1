import { getName, getOrderBy, alphanumericRegex } from "."

describe("Strings helpers", () => {
  test("getName()", () => {
    const data = {
      first_name: "Joseph",
      middle_names: "Randall",
      last_name: "Bloggs",
      title: {
        label: "Mr",
        key: "MR"
      }
    }

    expect(getName({ data })).toBe("Joseph Bloggs")
    expect(getName({ data, hasMiddle: true })).toBe("Joseph Randall Bloggs")
    expect(getName({ data, hasMiddle: true, hasTitle: true })).toBe("Mr Joseph Randall Bloggs")
    expect(getName({ data, hasTitle: true })).toBe("Mr Joseph Bloggs")
    expect(getName({ data: { widgets: 35, loop: "orthagonal" } })).toBe("-")
  })

  test("getOrderBy()", () => {
    expect(getOrderBy({})).toBe(null)
    expect(getOrderBy({ dataKey: "test", direction: "asc" })).toBe("test")
    expect(getOrderBy({ dataKey: "test" })).toBe("test")
    expect(getOrderBy({ dataKey: "test", direction: "desc" })).toBe("test_desc")
  })

  test("alphanumericRegex", () => {
    expect(alphanumericRegex.test("?")).toBe(false)
    expect(alphanumericRegex.test("abc123")).toBe(true)
  })
})
