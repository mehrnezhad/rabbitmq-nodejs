import amqplib from "amqplib"

async function recieveMsq() {
    const exchangeName = "service1"
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'fanout')
    const assertQueue = await channel.assertQueue('', { exclusive: true })
    console.log(`queue create with ${assertQueue.queue}`)
    channel.bindQueue(assertQueue.queue, exchangeName, '')
    channel.consume(assertQueue.queue, msg => {
        if (msg.content) {
            console.log(msg.content.toString())
            channel.ack(msg)
        }
    })

}
recieveMsq()