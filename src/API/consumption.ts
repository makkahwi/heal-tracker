import { mockConsumptionData } from "./mockData";

const getAll = () => {
  switch (true) {
    case true:
      return mockConsumptionData;
    default:
      return mockConsumptionData;
  }
};

const create = () => {
  switch (true) {
    case true:
      return mockConsumptionData[0];
    default:
      return mockConsumptionData[0];
  }
};

const update = () => {
  switch (true) {
    case true:
      return mockConsumptionData[0];
    default:
      return mockConsumptionData[0];
  }
};

export { getAll, create, update };
