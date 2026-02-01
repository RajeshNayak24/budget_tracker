const request = require("supertest");
const app = require("../app");

describe("Basic API Test", () =>{
    it("should respond with status 200 on root endpoint", async()=>{
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(500);
    })
})
