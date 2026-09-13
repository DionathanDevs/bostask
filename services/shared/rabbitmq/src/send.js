import amqp from 'amqplib';

const amqplib = require('amqplib');

(async () => {
  const queue = 'tasks';
  const conn = await amqplib.connect('amqp://localhost');
  conn.on('error', (err) => { console.error('Connection error:', err); });
  conn.on('handler-error', (err, event) => { console.error(`Uncaught exception in connection ${event} listener:`, err); });

  const ch1 = await conn.createChannel();
  ch1.on('error', (err) => { console.error('Channel error:', err); });
  ch1.on('handler-error', (err, event) => { console.error(`Uncaught exception in channel ${event} listener:`, err); });
  await ch1.assertQueue(queue);


  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('Received:', msg.content.toString());
      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });


  const ch2 = await conn.createChannel();
  ch2.on('error', (err) => { console.error('Channel error:', err); });
  ch2.on('handler-error', (err, event) => { console.error(`Uncaught exception in channel ${event} listener:`, err); });

  setInterval(() => {
    ch2.sendToQueue(queue, Buffer.from('something to do'));
  }, 1000);
})();