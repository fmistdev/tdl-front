# devenv-angular

# https://hub.docker.com/_/node/
# check angular cli compatibility: (inside container)$ ng version
# https://angular.io/guide/versions

# compatible
FROM node:20.9.0-alpine3.17

## dev tools
RUN apk add make
RUN apk add git

RUN npm install -g @angular/cli

# to avoid git permission conflict, match local user
# in this node image, it seems that node user is 1000:1000
# no need to create another user

# ensure an existing folder node_modules with correct permission
RUN mkdir -p /project/node_modules \
&& chown -R 1000:1000 /project/

USER node

WORKDIR /project
