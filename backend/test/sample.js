import { use, should, request } from "chai";
import chaiHttp from "chai-http";

import app from "../src/server.mjs";

use(chaiHttp);
should();

describe("API /healthz", () => {
  it("it should return 200", done => {
    request(app)
      .get("/healthz")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("API /", () => {
  it("it should return Welcome message", done => {
    request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.html;
        res.text.should.be.equal("Hello Docker World\n");
        done();
      });
  });
});
