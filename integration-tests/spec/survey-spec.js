var request = require("request");
var base_url = "http://survey-service:3000/api/v1/"

describe("when getting service status", function(done) {
  it("should return status OK", function() {
    request.get(base_url+ "status", function(error, response, body) {
      console.log("Response body: " + body);
      expect(response.statusCode).toBe(666);
      expect(body).toBe("{'message':'This should be failing'}");
      done();
    });
  })
});
