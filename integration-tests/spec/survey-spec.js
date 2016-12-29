/**
 * Created by Andrew Bell 12/26/2016
 * www.recursivechaos.com
 * andrew@recursivechaos.com
 * Licensed under MIT License 2016. See license.txt for details.
 */

var request = require("request");

// Connect to db
if (process.env.ENV == "DOCKER" ) {
  var base_url = "http://survey-service:3000/api/v1/"
} else {
  var base_url = "http://localhost:3000/api/v1/"
}

describe("Survey service", function() {

  describe("When getting service status", function() {
    it("Should return a 200 OK", function(done) {
      request.get(base_url + "status", function(error, response, body) {
        if (error)
          console.log("Something borked: ", error);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(body).message).toBe('OK');
        done();
      });
    });
  });

  describe("When performing CRUD operations", function() {
    it("Should create a new survey", function(done) {
      request.post({uri: base_url + "surveys", json: {name: "test"}}, function(error, response, body) {
        if (error)
          console.log("Something borked: ", error);

        expect(response.statusCode).toBe(201);
        expect(body.name).toBe('test');
        done();
      });
    })
  });
});
