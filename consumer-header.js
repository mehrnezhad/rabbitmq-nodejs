import amqplib from "amqplib"
const receiveMsg = async () => {
    const exchangeName = 'headerExchange'
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "headers")
    const assertQueue = await channel.assertQueue('', { exclusive: true })

        await channel.bindQueue(assertQueue.queue, exchangeName, '',{author:'erfan' , 'x-match' : 'any'})
    
    await channel.consume(assertQueue.queue, (msg) => {
        console.log('content' , msg.content.toString()) 
        console.log('header' , msg.properties.headers) 
    })
}
receiveMsg()