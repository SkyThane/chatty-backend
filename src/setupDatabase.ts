import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from './config';

const log: Logger = config.createLogger('etupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Sucessfully connected to database.');
      })
      .catch((error) => {
        log.error('Error connecting database', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
