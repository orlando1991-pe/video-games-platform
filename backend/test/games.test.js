const request = require("supertest")
const app = require("../src/app")

describe("GET /api/games", () => {

  it("should return games list", async () => {

    const res = await request(app).get("/api/games")

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()

  })

})

describe("GET /api/games/:id", () => {

  it("should return game detail", async () => {

    const res = await request(app).get("/api/games/1")

    expect(res.statusCode).not.toBe(500)

  })

})