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

  await subscribe(channel, EXCHANGE, 'alpha.#', message => {
    console.log(" [x] Charlie handled '%s'", message.content.toString());
  });

  await subscribe(channel, EXCHANGE, 'bravo.#', message => {
    console.log(" [x] Charlie handled '%s'", message.content.toString());
  });

  await setTimeout(OFFSET_INTERVAL * 2);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of setInterval(HEARTBEAT_INTERVAL)) {
    publish(channel, EXCHANGE, 'charlie.heartbeat', 'Heartbeat from Charlie');
  }

  console.log(' [*] Charlie started. Press CTRL+C to exit');
}

main();
