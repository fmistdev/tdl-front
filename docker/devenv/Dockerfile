# devenv-angular

# https://hub.docker.com/_/node/
# get node LTS version https://nodejs.org
# check angular cli compatibility: (inside container)$ ng version
# https://angular.dev/reference/versions

# compatible
# FROM node:22.11.0-alpine3.20
# FROM node:22.11.0-bookworm-slim # does not allow installing angular/cli 2024/11 ???
FROM node:20.18.0-bookworm-slim


# RUN npm install -g npm@10.9.0
RUN npm install -g npm@latest

# 2024-11-14 empty registry??? https://registry.npmjs.org/
# RUN npm config set registry https://skimdb.npmjs.com/registry \
# && npm install -g @angular/cli
RUN npm install -g @angular/cli

## dev tools (alpine)
# RUN apk add make
# RUN apk add git

## dev tools (debian)
RUN apt update \
&& apt -y install make git

# to avoid git permission conflict, match local user
# in this node image, it seems that node user is 1000:1000
# no need to create another user

# ensure an existing folder node_modules with correct permission
RUN mkdir -p /project/node_modules \
&& chown -R 1000:1000 /project/

USER node

WORKDIR /project

# manuak image creation
# docker run -it node:20.18.0-bookworm-slim bash
# docker commit --change='USER node' --change='WORKDIR /project' dfa07ae3e503 devenv-angular:node-20.18.0-bookworm-slim


