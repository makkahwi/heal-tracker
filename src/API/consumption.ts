import service, { demoStatus } from ".";
import { mockConsumptionData } from "./mockData";

const getAll = () => {
  switch (demoStatus()) {
    case true:
      return mockConsumptionData;
    default:
      return service.get("consumption.json");
  }
};

const create = () => {
  switch (demoStatus()) {
    case true:
      return mockConsumptionData[0];
    default:
      return service.get("consumption.json");
  }
};

const update = () => {
  switch (demoStatus()) {
    case true:
      return mockConsumptionData[0];
    default:
      return service.get("consumption.json");
  }
};

export { getAll, create, update };
