FROM alpine

WORKDIR /usr/monorepo

COPY ./apps/rust ./apps/rust
COPY ./pkgs ./pkgs

RUN ls -ar > /hello.txt

CMD ["cat", "/hello.txt"]