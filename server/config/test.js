export const port = 8080;
export const databaseURL =
  "mongodb://test:test1234@ds137230.mlab.com:37230/keyvalue-test";
export const agenda = {
  dbCollection: process.env.AGENDA_DB_COLLECTION,
  pooltime: process.env.AGENDA_POOL_TIME,
  concurrency: process.env.AGENDA_CONCURRENCY
};
export const wsPort = 8999;
