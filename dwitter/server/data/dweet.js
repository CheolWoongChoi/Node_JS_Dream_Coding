import * as userRepository from "../data/auth.js";

export let dweets = [
  {
    id: "1",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "Hello, Cup!",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    dweets.map(async (dweet) => {
      const { username, name, url } = await userRepository.findById(
        dweet.userId
      );

      return { ...dweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((dweets) =>
    dweets.filter((d) => d.username === username)
  );
}

export async function getById(id) {
  const found = dweets.find((d) => d.id === id);
  if (!found) {
    return null;
  }

  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const dweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  dweets = [dweet, ...dweets];

  return getById(dweet.id);
}

export async function update(id, text) {
  const dweet = await getById(id);

  if (dweet) {
    dweet.text = text;
  }

  return dweet;
}

export async function remove(id) {
  dweets = dweets.filter((d) => d.id !== id);
}
