export default class TweetService {
  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/dweets${query}`, {
      method: "GET",
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/dweets`, {
      method: "POST",
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/dweets/${tweetId}`, {
      method: "DELETE",
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/dweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }
}
