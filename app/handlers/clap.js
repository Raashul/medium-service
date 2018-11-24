"use strict";

const check = require(__base + "/app/modules/common/checkpost");
const claps = require(__base + "/app/modules/posts/claps");

module.exports.increaseLikes = async (req, res) => {
  try {
    let result = await check.checkPost(req.params.post_id);
    let clapped = await claps.increaseLikes(result[0]);
    res.status(200).json({ totalLikes: clapped });
  } catch (e) {
    res.send(e);
  }
};
