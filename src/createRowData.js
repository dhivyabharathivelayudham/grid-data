import faker from "faker";

function createFakeRow(index) {
  return {
    id: index,

    email: faker.internet.email(),
    title: faker.name.prefix(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}
