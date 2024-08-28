export let dweets = [
  {
    id: "1",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "bob",
    url: "https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png",
  },
  {
    id: "2",
    text: "Hello, Cup!",
    createdAt: "2024-08-27T04:00:00.000Z",
    name: "Cap",
    username: "cap",
    url: "https://img.freepik.com/free-psd/expressive-woman-gesturing_23-2150198673.jpg",
  },
];

export async function getAll() {
  return dweets;
}

export async function getAllByUsername(username) {
  return dweets.filter((d) => d.username === username);
}

export async function getById(id) {
  return dweets.find((d) => d.id === id);
}

export async function create(text, name, username) {
  const dweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  dweets = [dweet, ...dweets];

  return dweet;
}

export async function update(id, text) {
  const dweet = dweets.find((d) => d.id === id);

  if (dweet) {
    dweet.text = text;
  }

  return dweet;
}

export async function remove(id) {
  dweets = dweets.filter((d) => d.id !== id);
}
