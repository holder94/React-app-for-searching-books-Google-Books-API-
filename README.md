# Getting Started with Create React App

yarn install
yarn start

# Usage of Docker
### dev version:
docker build -t react-app:dev .;
docker run -it -v /app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true react-app:dev
# dev version opens on port 3001

### prod version:
docker build -t react-app:prod . -f Dockerfile.prod;
docker run -it -p 80:80 react-app:prod
# prod version opens on port 80
