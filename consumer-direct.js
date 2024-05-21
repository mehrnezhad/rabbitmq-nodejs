import amqplib from "amqplib"
const logTypes = process.argv.slice(2)
const receiveMsg = async () => {
    const exchangeName = 'directMessage'
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "direct")
    const assertQueue = await channel.assertQueue('', { exclusive: true })

    for (const patern of logTypes) {
        await channel.bindQueue(assertQueue.queue, exchangeName, patern)

    }

    await channel.consume(assertQueue.queue, (msg) => {
        console.log(msg.content.toString()) 
    })
}
receiveMsg()