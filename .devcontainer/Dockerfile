FROM node:21-bookworm

RUN npm install -g pnpm

WORKDIR /repo

COPY .devcontainer/meta .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile | tee /tmp/pnpm.log

FROM node:21-bookworm

RUN npm install -g pnpm

WORKDIR /repo

COPY .devcontainer/meta-test .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

CMD [ "sleep", "infinitly" ]