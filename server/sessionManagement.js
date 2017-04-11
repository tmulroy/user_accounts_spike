"use strict";

import mongoStoreFactory from 'connect-mongo';
import session from 'express-session';
import { DATABASE_URL, SECRET } from process.env;
import mongoConnection from './models/index';

export default sessionManagementConfig = (app) => {
  const MongoStore = new mongoStoreFactory(session);

  app.use(session({
    store = new MongoStore({
      mongooseConnection: mongoConnection.connect(DATABASE_URL),
      ttl:  (1 * 60 * 60)
    }),
    secret: SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1800000
    },
    name: 'id'
  }));
}

// mongostore connection: url: 'mongodb://localhost/sessions',
// do I need to make a new connection b/c it's to sessions collection?
// TODO: promisfy mongo connection using bluebird.. then pass in connection as dbPromise to mongo store
