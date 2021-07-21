FROM node:15-alpine

RUN mkdir /node-application
WORKDIR /node-application
RUN mkdir dist
RUN mkdir assets

COPY ./dist dist/
COPY ./assets assets/

CMD [ "node", "dist/bundle" ]