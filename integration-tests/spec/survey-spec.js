var request = require("request");
var base_url = "http://survey-service:3000/api/v1/"

describe("Survey service", function() {
  describe("when getting service status", function() {

    it("Should return a 200 OK", function(done) {
      console.log("Sending request...");
      request.get(base_url + "status", function(error, response, body) {
        if (error)
          console.log("Something borked: ", error);

        console.log("Response body: " + body);
        expect(response.statusCode).toBe(200);
        expect(body).toBe('{"message":"OK"}');
        done();
      });
    });

  });
});
