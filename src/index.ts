import * as amqp from 'amqplib';

export const HOSTNAME = 'amqp://localhost';
export const EXCHANGE = 'topic_domain_events';

export function publish(
  channel: amqp.Channel,
  exchange: string,
  routingKey: string,
  message: string
) {
  channel.assertExchange(exchange, 'topic', {durable: false});

  channel.publish(exchange, routingKey, Buffer.from(message));

  console.log(" [x] Sent (%s) '%s'", routingKey, message);
}

export async function subscribe(
  channel: amqp.Channel,
  exchange: string,
  routingKey: string,
  handler: (message: amqp.Message) => void = () => {}
) {
  channel.assertExchange(exchange, 'topic', {durable: false});

  const queue = await channel.assertQueue('', {exclusive: true});

  channel.bindQueue(queue.queue, exchange, routingKey);

  channel.consume(
    queue.queue,
    message => {
      if (message) {
        console.log(
          " [x] Received (%s) '%s' ",
          routingKey,
          message.content.toString()
        );
        handler(message);
      }
    },
    {noAck: true}
  );
}
