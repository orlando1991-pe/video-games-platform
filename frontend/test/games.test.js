import { render, screen } from "@testing-library/react"
import Home from "../pages/Home"

test("renders title", () => {

 render(<Home />)

 expect(screen.getByText(/Game Catalog/i)).toBeDefined()

})