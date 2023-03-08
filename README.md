# myPocket
This is a monorepo for `myPocket` app, this is seamless and powerfully MERN full stack app designed to simplify and assist your personal finances. it is made of React frontend application and Express backend with MongoDB as the database of choice.

# DevOps
The workflow of deploying and operating this app is relying primarily on Github Actions, Terraform and Turborepo. there are two main branches in this app: develop and master. In regards of environments there is only production and I'm working on having staging and experimentation environments.

Deploying infrastructure relay on Terraform Cloud, as a monorepo every app and package has its own workspace in the cloud and it defines its infrastructure in `terraform` subdirectory, from CI/CD perspective I made a script in `packages/deploy-script` that would be triggered on every commit on `master` branch by `deploy` action . 

To integrate github with terraform cloud. **you have to provide `TF_Organization` and `TF_Token` secrets to your github repository**.

# Technologies

## Front End:

- ReactJS
- AJAX fetch
- Formik
- Mantine-UI
- React-Router-Dom
- Redux

## Back End:

In the backend I used simple Server-json mocking backend, so it is not so sophisticated as far as the backend goes, the following was used to deploy to heroku and costomize the server-json:

- Node and ExpressJS
- rest API defined by OpenAPI specification
- tested with Jest
- Authentication with JWT
- nodemon (as dev dep)

## Database

This project built with mySQL at first but later I thought that MongoDB is more suitable, for such dynamic and minimalist app

- MongoDB
- Mongo Atlas (cloud database)
- Mongoose