import amqplib from "amqplib"

async function connectToService1() {
    const queueName = "service1"
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })
    channel.sendToQueue(queueName, Buffer.from('hello'), { persistent: true })
    console.log('message sent to consumer')
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 1000)
}
for (let index = 0; index < 10; index++) {
connectToService1()
}