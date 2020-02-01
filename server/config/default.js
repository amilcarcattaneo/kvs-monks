export const port = process.env.PORT || 8000;
export const databaseURL =
  "mongodb://readwrite:readwrite1@ds315359.mlab.com:15359/keyvalue";
export const agenda = {
  dbCollection: process.env.AGENDA_DB_COLLECTION,
  pooltime: process.env.AGENDA_POOL_TIME,
  concurrency: process.env.AGENDA_CONCURRENCY
};
export const wsPort = 8080;
