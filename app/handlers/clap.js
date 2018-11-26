"use strict";

const claps = require(__base + "/app/modules/posts/claps");

module.exports.increaseClaps = async (req, res) => {
  try {
    let result = await claps.validatePost(req.body.post_id);
    let clapped = await claps.increaseClaps(result[0]);
    res.status(200).json({ totalLikes: clapped });
  } catch (e) {
    res.send(e);
  }
};
