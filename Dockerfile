FROM arm64v8/node:lts-alpine as builder

WORKDIR /build

COPY src/package.json .
RUN cd src/ && npm install 

FROM arm64v8/node:lts-alpine

WORKDIR /app

COPY src/ .
COPY --from=builder /build/node_modules /app/src/node_modules

CMD [ "node","src/index.js" ]