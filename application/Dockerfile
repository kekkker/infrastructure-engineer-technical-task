FROM node:16.20.2-alpine3.18 as build
WORKDIR /app
COPY . .
RUN npm install && \ 
    npm run build 

FROM node:16.20.2-alpine3.18
WORKDIR /app
COPY --from=build /app/build/index.js .
#TODO: define runtime only dependencies - RUN npm install --production, for now, we're copying ALL
# the dependencies.
COPY --from=build /app/node_modules ./node_modules
RUN addgroup -g 12345 app && adduser -h /app -D -G app -u 12345 app && \
    chown 12345:12345 /app
USER 12345
ENTRYPOINT ["node", "/app/index.js"]
