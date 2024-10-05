type Tweet = {
  id: string;
  text: string;
  createdAt: Date;
  name: string;
  username: string;
  url?: string;
};

const tweets: Tweet[] = [
  {
    id: "1",
    text: "신림코딩 화이팅!",
    createdAt: new Date(),
    name: "Ellie",
    username: "ellie",
  },
  {
    id: "2",
    text: "Hi!",
    createdAt: new Date(),
    name: "Ellie",
    username: "ellie",
  },
];

export async function getAll(): Promise<Tweet[]> {
  return tweets;
}
