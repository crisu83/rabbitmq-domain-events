# rabbitmq-domain-events

A proof of concept implementation of publishing and subscribing to domain events using RabbitMQ.

## Usage

Clone or download the repository.

Install dependencies:

```sh
yarn install
```

Start the services:

```sh
yarn start
```

## Output

Example output:

```sh
 [*] Alpha started. Press CTRL+C to exit
 [*] Charlie started. Press CTRL+C to exit
 [*] Beta started. Press CTRL+C to exit
 [x] Sent (alpha.heartbeat) 'Heartbeat from Alpha'
 [x] Received (alpha.#) 'Heartbeat from Alpha' 
 [x] Charlie handled 'Heartbeat from Alpha'
 [x] Sent (beta.heartbeat) 'Heartbeat from Beta'
 [x] Received (beta.#) 'Heartbeat from Beta' 
 [x] Charlie handled 'Heartbeat from Beta'
 [x] Sent (charlie.heartbeat) 'Heartbeat from Charlie'
 [x] Received (charlie.#) 'Heartbeat from Charlie' 
 [x] Beta handled 'Heartbeat from Charlie'
```