import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { test, expect } from "vitest"
import Home from "../src/pages/Home"
import axios from "axios"
import { vi } from "vitest"

vi.mock("axios")

axios.get.mockResolvedValue({
  data: {
    data: [
      { id: 1, title: "Test Game" }
    ],
    total: 1,
    page: 1,
    totalPages: 1
  }
})

test("renders title", () => {

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  expect(screen.getByText("Game Catalog")).toBeDefined()

})