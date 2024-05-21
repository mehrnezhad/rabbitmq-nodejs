import amqplib from 'amqplib'

async function sendMsg() {
    const exchangeName = "service1"
    const connection = await amqplib.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'fanout')
    channel.publish(exchangeName, '', Buffer.from("sent message to consumer with fanout exchange"))
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 1000)
}
sendMsg()