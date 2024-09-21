const express = require('express')
const handlebars = require('express-handlebars')
const { initializeSocket } = require('./utils.js')

const productRouter = require('../api/products/products.router.js')
const cartRouter = require('../api/carts/carts.router.js')

const app = express()
const PORT = 8080

const server = require("http").Server(app)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuración de Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.static(__dirname + "/views"))
app.use(express.static(__dirname + "/public"))

app.use("/", productRouter)
app.use("/", cartRouter)

const httpServer = server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

initializeSocket(httpServer)