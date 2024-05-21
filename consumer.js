import amqplib from "amqplib"
async function receiveFromService1() {
    const queueName = "service1"
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })
    let index = 0
    await channel.consume(queueName, msg => {
        const random = Math.floor((Math.random() * 10) + 1)

        setTimeout(() => {

            console.log(`${index}`, msg.content.toString())
            console.log(random)
            index++
            channel.ack(msg)
        }, random);

    })

}

receiveFromService1()   
