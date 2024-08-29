import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders login", () => {
  const { getAllByText } = render(<App />)
  const dummyTestElement = getAllByText(/Sign in/i)
  expect(dummyTestElement.length).toBe(2)
})
