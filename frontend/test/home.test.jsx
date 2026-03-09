import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"
import Home from "../src/pages/Home"

test("renders title", () => {

  render(<Home />)

  expect(screen.getByText(/Game/i)).toBeDefined()

})