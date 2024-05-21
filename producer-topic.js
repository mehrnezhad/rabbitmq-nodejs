import amqlib from "amqplib"
const [logType, message] = process.argv.slice(2)
const sendMsg = async () => {
    const exchangeName = 'topicExchange'
    const connection = await amqlib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "topic")
    channel.publish(exchangeName, logType, Buffer.from(message))
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 2000)
}
sendMsg()
