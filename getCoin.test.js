import request from 'supertest'
import app from './index'

const router = require("./routes/coinRoute.js");

describe("POST /coins", () => {
    describe("given a coin record entry", () => {

    test("should respond with a 200 status code", async () => {
    const response = await request(app).post("/coins").send({
        type: "Quarter",
        mintLocation: "P",
        mintYear: 2023,
        circulation: "No",
        grade: "MS70"
    })
    expect(response.statusCode).toBe(200)
})
})
})