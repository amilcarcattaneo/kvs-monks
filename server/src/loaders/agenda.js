import Agenda from "agenda";
import config from "config";

const configAgenda = config.get("agenda");

export default ({ mongoConnection }) => {
  const agenda = new Agenda();

  (async () => {
    await agenda._ready;

    try {
      agenda._collection.ensureIndex(
        {
          disabled: 1,
          lockedAt: 1,
          name: 1,
          nextRunAt: 1,
          priority: -1
        },
        {
          name: "findAndLockNextJobIndex"
        }
      );
    } catch (err) {
      console.log("Couldn't create Agenda index");
      console.log(err);
      throw err;
    }

    console.log("Agenda index ensured");
  })();

  agenda
    .mongo(mongoConnection, configAgenda.dbCollection)
    .processEvery(configAgenda.pooltime)
    .maxConcurrency(configAgenda.concurrency);

  return agenda;
};
