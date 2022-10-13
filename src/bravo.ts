import * as amqp from 'amqplib';
import {setInterval, setTimeout} from 'timers/promises';
import {
  EXCHANGE,
  HEARTBEAT_INTERVAL,
  HOSTNAME,
  OFFSET_INTERVAL,
  publish,
  subscribe,
} from '.';

async function main() {
  const connection = await amqp.connect(HOSTNAME);
  const channel = await connection.createChannel();

  await subscribe(channel, EXCHANGE, 'charlie.#', message => {
    console.log(" [x] Bravo handled '%s'", message.content.toString());
  });

  await setTimeout(OFFSET_INTERVAL);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of setInterval(HEARTBEAT_INTERVAL)) {
    publish(channel, EXCHANGE, 'bravo.heartbeat', 'Heartbeat from Bravo');
  }

  console.log(' [*] Bravo started. Press CTRL+C to exit');
}

main();
