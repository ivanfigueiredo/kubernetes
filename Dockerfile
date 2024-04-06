FROM node:21-alpine3.18 AS builder
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:21-alpine3.18 AS production
WORKDIR /app
COPY --from=builder /build/dist/ .
CMD ["node", "./main.js"]