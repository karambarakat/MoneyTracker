FROM node:18-bullseye-slim as base
RUN npm i -g pnpm@8.6.0 turbo

# Copy Package*.json files from all packages
FROM base as prune
WORKDIR /monorepo
COPY . .
RUN pnpm exec turbo prune --scope backend --docker



FROM base as install
WORKDIR /monorepo
COPY --from=prune /monorepo/turbo.json              .
COPY --from=prune /monorepo/out/json                .
COPY --from=prune /monorepo/pnpm-workspace.yaml     ./pnpm-workspace.yaml
COPY --from=prune /monorepo/pnpm-lock.yaml          ./pnpm-lock.yaml
COPY --from=prune /monorepo/patches                 .

ENV CI=true
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store/v3\
  pnpm install --frozen-lockfile

COPY --from=prune /monorepo/out/full .
RUN turbo build


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

EXPOSE 8080

CMD ["pnpm", "-F", "backend", "start"]