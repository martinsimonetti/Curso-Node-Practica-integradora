const express = require('express')
const router = express.Router()
const CartManager = require('../../src/cartManager')

const cartManager = new CartManager()

router.post("/carts", async (req, res) => {
    const respuesta = await cartManager.createCart()
    if(respuesta.status === "success"){
        res.status(201).json(respuesta.payload)
    } else {
        res.status(404).json(respuesta.error)
    }    
})

/*router.get("/carts", async (req, res) => {
    const respuesta = await cartManager.getCarts()
    if(respuesta.status === "success"){
        res.status(200).json(respuesta.payload)        
    } else {
        res.status(404).json(respuesta.payload)
    }
})*/

router.get("/carts/:cid", async (req, res) => {
    const carritoId = parseInt(req.params.cid)

    const respuesta = await cartManager.getCartById(carritoId)
    
    if(respuesta.status === "success"){
        res.status(200).json(respuesta.payload)
    } else {
        res.status(200).json(respuesta.error)
    }
})

router.post("/carts/:cid/product/:pid", async (req, res) => {    
    const carritoId = parseInt(req.params.cid)
    const productoId = parseInt(req.params.pid)
    
    const respuesta = await cartManager.addProductInCart(carritoId, productoId)
    if(respuesta.status === "success"){
        res.status(201).json(respuesta.payload)
    } else {
        res.status(404).json(respuesta.error)
    }
})

module.exports = router