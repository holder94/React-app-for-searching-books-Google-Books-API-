# Getting Started with Create React App

yarn install
yarn start

## Usage of Docker
# dev version:
docker build -t react-app:dev .
docker run

# prod version
docker build -t react-app:prod . -f Dockerfile.prod
docker run -it -p 80:80 react-app:prod
