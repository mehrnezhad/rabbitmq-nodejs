import amqlib from "amqplib"
const sendMsg = async () => {
    const exchangeName = 'headerExchange'
    const connection = await amqlib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "headers")
    channel.publish(exchangeName, '' , Buffer.from("any message"),{headers : {author: "erfan" , runtime: "nodejs"}})
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 2000)
}
sendMsg()
