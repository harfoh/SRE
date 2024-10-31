FROM node:23-alpine3.19 as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

FROM node:23-alpine3.19

WORKDIR /app

COPY --from=builder /app /app

CMD ["npm","start"]
