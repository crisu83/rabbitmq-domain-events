import * as amqp from 'amqplib';
import {setInterval} from 'timers/promises';
import {EXCHANGE, HEARTBEAT_INTERVAL, HOSTNAME, publish} from '.';

async function main() {
  const connection = await amqp.connect(HOSTNAME);
  const channel = await connection.createChannel();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of setInterval(HEARTBEAT_INTERVAL)) {
    publish(channel, EXCHANGE, 'alpha.heartbeat', 'Heartbeat from Alpha');
  }

  console.log(' [*] Alpha started. Press CTRL+C to exit');
}

main();
