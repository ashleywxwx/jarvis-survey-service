# Jarvis #
## Survey REST API ##

Provides a REST API for creating and managing surveys

### Setup Project for Development ###
1. Install Node
2. Install Mongo
3. `cd survey-service`
4. Run `npm install`

### Run survey-service ###
1. Run `mongod`
2. Run `npm start`

## Run Integration Tests ##

1. Start tests `docker-compose -f docker-compose.test.yml up --build -d`
2. Monitor logs `docker logs -f jarvis_sut_1`
3. Check exit code `docker wait jarvis_sut_1` (Should be 0)

## Docker Deploy ##
1. `docker-compose up`
