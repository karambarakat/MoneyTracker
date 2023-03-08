# deploy script

this a helper to integrate Github actions with Terraform API-driven workspaces.

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

# environments variable

this script need these following enviroment variable to be available

- TF_Token (required)
- TF_Organization (required)
- Version (default to `vx`)
- NODE_ENV (default to `default`)


```
$ dotenv -v TF_Token=xxxx -v TF_Organization=xxxx -v NODE_ENV=production -v Version=v1 -- npx deploy-script --help
```

# test packages

I made two packages to during the testing and in case of possible debugging

1. `packages/terraform-hello-2`: goolge cloud function that says `hello world`.
1. `packages/terraform-hello`: single resource that generate random number in the cloud.