FROM node:21-bookworm

RUN npm install -g pnpm

WORKDIR /repo

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

CMD [ "sleep", "infinitly" ]