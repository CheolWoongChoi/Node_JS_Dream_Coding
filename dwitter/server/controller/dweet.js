import * as dweetRepository from "../data/dweet.js";

export const dweetsController = {
  getDweets: async (req, res) => {
    const username = req.query.username;

    const data = await (username
      ? dweetRepository.getAllByUsername(username)
      : dweetRepository.getAll());

    res.status(200).json(data);
  },
  getDweet: async (req, res) => {
    const id = req.params.id;
    const dweet = await dweetRepository.getById(id);

    if (dweet) {
      res.status(200).json(dweet);
    } else {
      res.status(404).json({
        message: `Dweet id(${id}) not found`,
      });
    }
  },
  createDweet: async (req, res) => {
    const { text, username, name } = req.body;

    const dweet = await dweetRepository.create(text, name, username);
    res.status(201).json(dweet);
  },
  updateDweet: async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    const dweet = await dweetRepository.update(id, text);

    if (dweet) {
      res.status(200).json(dweet);
    } else {
      res.status(404).json({
        message: `Dweet id(${id}) not found`,
      });
    }
  },
  deleteDweet: async (req, res) => {
    const id = req.params.id;
    await dweetRepository.remove(id);
    res.sendStatus(204);
  },
};
