import { render, screen } from "@testing-library/react"
import Home from "../src/pages/Home"

test("renders title", () => {

 render(<Home />)

 expect(screen.getByText(/Game Catalog/i)).toBeDefined()

})