import amqlib from "amqplib"
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();
const args = process.argv.slice(2)
const sendMsg = async () => {
    const queueName = 'rpc'
    const connection = await amqlib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    const assertedQueue = await channel.assertQueue('', { exclusive: true })
    channel.sendToQueue(queueName, Buffer.from(args[0]), {
        replyTo: assertedQueue.queue,
        correlationId: uuid

    })
    channel.consume(assertedQueue.queue, msg => {
        if (msg.properties.correlationId == uuid) {
            console.log('process Done', msg.content.toString())
            channel.ack(msg)
            setTimeout(()=>{
                process.exit(0)
            },1000)
        }
    })
}
sendMsg()