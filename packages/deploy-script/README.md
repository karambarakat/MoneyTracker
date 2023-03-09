# deploy script

this a helper to integrate Github actions with Terraform API-driven workspaces.

# development

to make life easy I create local file `.env.deploy` and run the following to test outcome
```
$ dotenv -c deploy -- npm run deploy -w terraform-hello
```

# doc

```
$ npx deploy-script --help
```

```
Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --appName                                                  [string] [required]
  --working_dir  directory contains all .tf configurations
                                              [string] [required] [default: "."]
  --zip_dir      what directory will be send to the cloud, default `./terraform`
                 but you can specify `./` to send the entire working directory,
                 note `../` is not tested yet but should work
                                               [string] [default: "./terraform"]
```

# Variable

this script need these following environments variable to be available

- TF_Token (required)
- TF_Organization (required)
- Version (default to `vx`)
- NODE_ENV (default to `default`)

and it require the following options to be set:

1. `appName`: directory contains all .tf configurations

```
$ dotenv -v TF_Token=xxxx -v TF_Organization=xxxx -v NODE_ENV=production -v Version=v1 -- npx deploy-script --appName deploy-script
```

# test packages

I made two packages to during the development and in case of possible debugging

1. `packages/terraform-hello-2`: goolge cloud function that says `hello world` on http request.
1. `packages/terraform-hello`: single terraform resource that generate random number in the cloud.