module.exports = (app) => {
  const url = require("../controllers/url");

  app.post("/api/url/shorten", url.shortUrl);
  app.get("/:code", url.shortenedUrl);
};
