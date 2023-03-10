!# /user/bin/sh

image_name = registry.digitalocean.com/mypocket/backend

docker build \ 
  -t $image_name \
  -f ../../Dockerfile-build \
  --build-arg Package_name=backend \
  ../../

echo $DO_token | docker login registry.digitalocean.com

docker push $image_name