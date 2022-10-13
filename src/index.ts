import * as amqp from 'amqplib';

export const HOSTNAME = 'amqp://localhost';
export const EXCHANGE = 'topic_domain_events';
export const HEARTBEAT_INTERVAL = 10000;
export const OFFSET_INTERVAL = 2500;

export async function publish(
  channel: amqp.Channel,
  exchange: string,
  routingKey: string,
  message: string
): Promise<boolean> {
  await assertExchange(channel, exchange);

  const result = channel.publish(exchange, routingKey, Buffer.from(message));

  console.log(" [x] Sent (%s) '%s'", routingKey, message);

  return result;
}

export async function subscribe(
  channel: amqp.Channel,
  exchange: string,
  routingKey: string,
  handler: (message: amqp.Message) => void = () => {}
): Promise<string> {
  await assertExchange(channel, exchange);

  const queue = await assertQueue(channel);

  channel.bindQueue(queue.queue, exchange, routingKey);

  const consume = await channel.consume(
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

  return consume.consumerTag;
}

async function assertExchange(channel: amqp.Channel, exchange: string) {
  return channel.assertExchange(exchange, 'topic', {durable: false});
}

async function assertQueue(channel: amqp.Channel, queue = '') {
  return channel.assertQueue(queue, {exclusive: true});
}
