import "@config/env"

// libraries
import express from "express"
import morgan from "morgan"
import cors from "cors"

// controllers
import authController from "@controllers/authController"
import profileController from "@controllers/profileController"
import logController from "@controllers/logController"
import categoryController from "@controllers/categoryController"

import HTTPErrorHandler from "@error/HTTPErrorHandler"

// middlewares
import apiIsWorking, { serverIsWroking } from "@middlewares/apiIsWorking"
import e404 from "@middlewares/E404"
import e500 from "@middlewares/e500"
import e400Mongoose from "@middlewares/e400"
import handleJsonError from "@middlewares/eJson"

//passport
import passport from "passport"
import { useGoogle, useJWT } from "@utils/registerStrategies"

const app = express()

passport.use(useJWT)
passport.use(useGoogle)

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())
app.use(handleJsonError)
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

const api = express.Router()

/**
 * Controllers
 */
api.get("/", apiIsWorking)
api.use("/v1/auth", authController)
api.use("/v1/profile", profileController)
api.use("/v1/log", logController)
api.use("/v1/category", categoryController)

api.use("*", e404)

app.use("/api", api)

/**
 * Errors/Handlers
 */
app.use("*", serverIsWroking)
app.use(e400Mongoose)
app.use(HTTPErrorHandler)
app.use(e500)

export default app
