"use strict";
import mongoStoreFactory from 'connect-mongo';
import session from 'express-session';
import { DATABASE_URL, SECRET } from process.env;

export default sessionManagementConfig = (app) => {
  const MongoStore = new mongoStoreFactory(session);

  app.us(session({
    store = new MongoStore({

    }),
    secret: SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1800000
    },
  }));

}
