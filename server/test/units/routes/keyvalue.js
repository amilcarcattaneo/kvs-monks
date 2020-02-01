process.env.NODE_ENV = "test";

import { describe } from "mocha";

import chai from "chai";
import chaiHttp from "chai-http";

const should = chai.should();

import httpMocks from "node-mocks-http";

chai.use(chaiHttp);

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

import router from "../../../src/api/routes/keyvalue";

describe("Routes Unit Tests", () => {
  describe("GET", () => {
    it("Should return error - Empty Key", async () => {
      const inputKey = "";

      req.params.key = inputKey;
      await router.Get(req, res);

      res.statusCode.should.be.equal(400);
    });
  });

  describe("SET", () => {
    it("Should return error - Empty Key", async () => {
      const inputKey = "";

      req.body.key = inputKey;
      await router.Set(req, res);

      res.statusCode.should.be.equal(400);
    });
    it("Should return error - Empty Value", async () => {
      const inputKey = "media";
      const inputValue = "";

      req.body.key = inputKey;
      req.body.value = inputValue;
      await router.Set(req, res);

      res.statusCode.should.be.equal(400);
    });
  });
});
