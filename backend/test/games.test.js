const request = require("supertest")
const app = require("../src/app")

jest.mock("../src/config/db", () => ({
  query: jest.fn()
    .mockResolvedValueOnce({
      rows: [{ id: 1, title: "Test Game" }]
    })
    .mockResolvedValueOnce({
      rows: [{ count: 1 }]
    })
}))

describe("GET /api/games", () => {

  it("should return games list", async () => {

    const res = await request(app).get("/api/games")

    expect(res.statusCode).toBe(200)

    expect(res.body).toHaveProperty("data")

    expect(Array.isArray(res.body.data)).toBe(true)

    expect(res.body.data.length).toBeGreaterThan(0)

  })

})