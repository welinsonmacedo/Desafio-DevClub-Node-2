const { request } = require("express")
const { response } = require("express")
const express=require("express")
const uuid=require("uuid")
const app=express()
app.use(express.json())
// pedidos
const orders=[]

// realizar pedidos
app.post('/orders', (request, response) => {
    const {order,client,price,status}=request.body
    const states=("Em preparação")
    const completeOrder={id:uuid.v4(),order,client,price,states} 
    orders.push(completeOrder)

    return response.json(completeOrder)
})
// main
app.get('/orders', (request, response) => {
    return response.json(orders)
})
// editar pedido
app.put('/orders/:id', (request, response) => {
    const {id}=request.params
    const {order,client,price}=request.body
    const updatorder={id,order,client,price}
    const index=orders.findIndex(order=>order.id===id)
    if (index<0){
        return response.status(404).json({message:"User Not Found"})
    }

    orders[index]=updatorder
    
    console.log(index)
    return response.json(orders)
})
// deletar pedido
app.delete('/orders/:id', (request, response) => {
    const {id}=request.params
    const index=orders.findIndex(order=>order.id===id)
    if (index<0){
        return response.status(404).json({message:"User Not Found"})
    }
    orders.splice(index,1)

    return response.json("Usuario deletado")
})
// consultar pedido
app.get('/Consultar/:id', (request, response) => {
    const {id}=request.params
    const index=orders.findIndex(order=>order.id===id)
    if (index<0){
        return response.status(404).json({message:"User Not Found"})
    }else{
        return response.json(orders[index])
    }

    return response.json(orders)
})
// pedido pronto
app.patch('/orders/:id', (request, response) => {
    const {id}=request.params
    const {order,client,price,status}=request.body
    const states=("Pedido Pronto")
    const completeOrder={id:uuid.v4(),order,client,price,states} 
    const index=orders.findIndex(order=>order.id===id)
    if (index<0){
        return response.status(404).json({message:"User Not Found"})
    }else{
        orders.push(completeOrder)
    
        return response.json(completeOrder)
    }

})

// fim

app.listen(3000)