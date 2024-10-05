import { getSocketIO } from "../connection/socket.js";
import * as tweetRepository from "../data/tweet.js";

export const tweetController = {
  getTweets: async (req, res) => {
    const username = req.query.username;

    const data = await (username
      ? tweetRepository.getAllByUsername(username)
      : tweetRepository.getAll());

    res.status(200).json(data);
  },
  getTweet: async (req, res) => {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);

    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({
        message: `Tweet id(${id}) not found`,
      });
    }
  },
  createTweet: async (req, res) => {
    const { text } = req.body;

    const tweet = await tweetRepository.create(text, req.userId);
    res.status(201).json(tweet);

    getSocketIO().emit("tweets", tweet);
  },
  updateTweet: async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);

    if (!tweet) {
      return res.sendStatus(404);
    }

    if (tweet.userId !== req.userId) {
      return res.sendStatus(403);
    }

    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
  },
  deleteTweet: async (req, res) => {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);

    if (!tweet) {
      return res.sendStatus(404);
    }
    if (tweet.userId !== req.userId) {
      return res.sendStatus(403);
    }
    await tweetRepository.remove(id);
    res.sendStatus(204);
  },
};
