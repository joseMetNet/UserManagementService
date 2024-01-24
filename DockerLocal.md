docker build . -t node-api-docker:latest
docker run -p 3001:5055  node-api-docker