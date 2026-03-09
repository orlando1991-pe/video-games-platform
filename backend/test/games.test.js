const request = require("supertest")
const app = require("../src/app")

describe("GET /api/games", () => {

  it("should return games list", async () => {

    const res = await request(app).get("/api/games")

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()

  })

})