import { Container } from "typedi";

import agendaFactory from "./agenda";

export default async ({ mongoConnection, models }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set("agendaInstance", agendaInstance);

    console.log("Agenda injected into container");

    return { agenda: agendaInstance };
  } catch (e) {
    console.log(`Couldn't inject: ${e}`);
    throw e;
  }
};
