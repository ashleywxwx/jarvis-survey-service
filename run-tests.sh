#!/bin/bash

# Race conditions and logging really makes this difficult
# to use for troubleshooting test failures

echo "Building and starting Docker"
docker-compose -f docker-compose.test.yml up --build -d
echo "Waiting for tests to finish..."
(docker wait jarvis_sut_1)
echo "Test results: $?"
if [ RESULT = 1 ]; then
  echo "Tests passed"
else
  echo "Tests failed"
  docker logs jarvis_survey-service_1
fi
docker logs jarvis_sut_1 -f
echo "Killing Docker"
docker-compose -f docker-compose.test.yml down
