let users = [
  {
    id: "1",
    username: "bobb",
    password: "$2b$12$01kJmTDC3qHJqr3TLMGwq.mjxhvoFrEwDNtRSjKOAHRsppZTE/W.G",
    name: "Bob",
    email: "bob@gmail.com",
    url: "",
  },
  {
    id: "2",
    username: "cheols",
    password: "$2b$12$01kJmTDC3qHJqr3TLMGwq.mjxhvoFrEwDNtRSjKOAHRsppZTE/W.G",
    name: "CheolWoong",
    email: "cheolsker@gmail.com",
    url: "",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);

  return created.id;
}
