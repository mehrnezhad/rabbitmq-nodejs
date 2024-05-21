import amqplib from "amqplib"
const [logType , message ]= process.argv.slice(2)
const sendMsg = async () => {
    const exchangeName = 'directMessage'
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'direct')
    channel.publish(exchangeName, logType, Buffer.from(message))
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 2000)
}
sendMsg()