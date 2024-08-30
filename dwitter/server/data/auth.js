let users = [
  {
    id: "1",
    username: "bob",
    password: "12345",
    name: "Bob",
    email: "bob@gmail.com",
    url: "",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);

  return created.id;
}
