import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import usersRouter from "../src/services/users/routes.js"
import accomodationsRouter from "../src/services/accomodations/routes.js"

import { badRequest, unauthorized, forbidden, notFound, serverError} from "./errorHandlers.js"

const server = express()
const port = process.env.PORT || 3001

// ******************** MIDDLEWARES *************************+

server.use(cors())
server.use(express.json())

// ******************** ROUTES ******************************

server.use("/users", usersRouter)
server.use("/accomodations", accomodationsRouter)

// ********************** ERROR HANDLERS *************************


server.use(badRequest)
server.use(unauthorized)
server.use(forbidden)
server.use(notFound)
server.use(serverError)

console.table(listEndpoints(server))

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("🚀 Mongo connected!")
  server.listen(port, () => {
    console.log(`🎈 Server running on port ${port}`)
  })
})