the infrastructure of this app is as follow:

0. locally building images and pushing is done via docker provider
   @see ./docker.tf
1. the backbone is build on aws, as the following
   1.1 vpc connect all parts of the app @see ./aws.tf
   1.2 the backend api is located @see ./backend
2. database: uploaded to MongodbAtlas
   @see ./atlas.tf
