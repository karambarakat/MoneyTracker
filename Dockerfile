# Copy Package*.json files from all packages
FROM node:18-bullseye-slim

WORKDIR /src
COPY package*.json .
COPY apps apps
COPY packages packages
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find apps \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

# npm install & build
FROM node:18-bullseye-slim
ARG Package_name


WORKDIR /src
COPY --from=0 /src .
RUN npm i -w ${Package_name}
COPY . .
RUN npm run build -w ${Package_name}

# final image
FROM gcr.io/distroless/nodejs:18
ARG Package_name
ARG Package_dir=apps/$Package_name

WORKDIR /src
COPY --from=1 /src/$Package_dir/dist .
USER nonroot

EXPOSE 3000
CMD ["index.bundle.js"]