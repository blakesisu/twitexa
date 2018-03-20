FROM mhart/alpine-node:latest

ENV HOME=/home/app-user

COPY package.json $HOME/app/

WORKDIR $HOME/app
RUN yarn
