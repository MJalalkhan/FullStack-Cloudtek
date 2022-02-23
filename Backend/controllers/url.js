const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
const Url = require("../models/urlModel");
const baseUrl = "http://localhost:5000";

exports.shortUrl = async (req, res) => {
  let { longUrl, slug } = req.body;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }
  try {
    if (validUrl.isUri(longUrl)) {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        return res.send({message:'Url is shortened once with shortUrl and slug below ',url});
      }
      if (req.body.slug) {
        let slugExist = await Url.findOne({
          slug: slug,
        });
        if (slugExist) {
          return res.status(401).send({message:"Slug Already exist"});
        } else {
          slug = req.body.slug;
        }
      } else {
        slug = nanoid(10);
      }
      const shortUrl = baseUrl + "/" + slug;

      url = new Url({
        longUrl,
        shortUrl,
        slug,
      });
      await url.save();
      return res.json(url);
    } else {
      return res.status(401).send("Invalid longUrl");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error",err.message);
  }
};

exports.shortenedUrl = async (req, res) => {
  console.log(req.params);
  try {
    const url = await Url.findOne({
      slug: req.params.code,
    });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};
