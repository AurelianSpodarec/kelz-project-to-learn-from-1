// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"

console.error = jest.fn()
console.warn = jest.fn()

jest.setTimeout(20000)

jest.mock("moment", () => () => jest.requireActual("moment")("2021-01-01T00:00:00.000Z"))

beforeEach(() => {
  console.error.mockClear()
  console.warn.mockClear()
})
