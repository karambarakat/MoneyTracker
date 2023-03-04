FROM node:18-bullseye-slim as base
# Copy Package*.json files from all packages
FROM base as prune
ARG Package_name

WORKDIR /app
COPY . .
RUN npx turbo prune --scope ${Package_name} --docker

# npm install
FROM base

WORKDIR /app
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/package-lock.json ./package-lock.json
RUN npm install
COPY --from=prune /app/out/full/ .

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

CMD ["sleep", "infinity"]