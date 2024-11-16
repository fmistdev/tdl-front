# devenv-angular

# https://hub.docker.com/_/node/
# get node LTS version https://nodejs.org
# check angular cli compatibility: (inside container)$ ng version
# https://angular.dev/reference/versions

# compatible
# FROM node:22.11.0-alpine3.20
# FROM node:22.11.0-bookworm-slim # does not allow installing angular/cli 2024/11 ???
# FROM node:20.18.0-bookworm-slim
# LTS
FROM node:22.11.0-bookworm-slim

# https://www.npmjs.com/package/npm?activeTab=versions
RUN npm install -g npm@latest
# RUN npm install -g npm@10.9.0


# issues here 2024-11: solution run 2 times the following command... manually
# RUN npm install -g @angular/cli
RUN npm install -g @angular/cli@18.2.12 --verbose


## dev tools (alpine)
# RUN apk add make
# RUN apk add git

## dev tools (debian)
RUN apt update \
&& apt upgrade \
&& apt -y install make git

# to avoid git permission conflict, match local user
# in this node image, it seems that node user is 1000:1000
# no need to create another user

# ensure an existing folder node_modules with correct permission
RUN mkdir -p /project/node_modules \
&& chown -R 1000:1000 /project/


# useless for protection, but goo indication for image use
USER node
WORKDIR /project

# manual image creation
# docker run -it --name angular-container node:22.11.0-bookworm-slim bash
# all steps manually (and install cli 2 times)
# ng version (to check)
# docker commit --change='USER node' --change='WORKDIR /project' angular-container devenv-angular:node-22.11.0-bookworm-slim

# $ ng version:
# Angular CLI: 18.2.12
# Node: 22.11.0
# Package Manager: npm 10.9.0
# OS: linux x64