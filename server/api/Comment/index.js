const CommentModel = require('../../db/models/commentSchema');
const { logger } = require('../../logger');

const { Utils } = require('../../utils');
const {
  protectWithApiKey,
} = require('../../middleware/protectWithApiKey/index');

class Comment {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      '/comment/add',
      protectWithApiKey,
      this.addComment.bind(this),
    );
    this.router.get(
      '/comments/:url',
      protectWithApiKey,
      this.getComments.bind(this),
    );
  }

  async getComments(req, res) {
    if (!req || !req.params || !req.params.url) {
      res.sendStatus(422); // Unprocessable Entity
      return;
    }
    const model = await CommentModel.findOne({});
    const arr = model.comments[req.params.url];
    const totalSkip =
      parseInt(req.query.skip, 10) * parseInt(req.query.limit, 10);
    res.json(arr.slice(totalSkip, totalSkip + parseInt(req.query.limit, 10)));
  }

  async addComment(req, res) {
    if (
      !req ||
      !req.body ||
      !req.body.userId ||
      !req.body.url ||
      !req.body.userName ||
      !req.body.commentText
    ) {
      res.sendStatus(422); // Unprocessable Entity
      return;
    }

    try {
      const key = Utils.encodeUrlToObjKey(req.body.url);
      if (!key) {
        res.sendStatus(500); // Server err
        return;
      }

      const model = await CommentModel.findOne({});
      const comment = {
        user_id: req.body.userId,
        user_name: req.body.userName,
        comment_text: req.body.commentText,
      };
      model.comments = {
        ...model.comments,
        [key]: model.comments[key]
          ? [...model.comments[key], comment]
          : [comment],
      };
      model.save();

      res.json(model);
    } catch (e) {
      console.log(e);
      res.sendStatus(500); // Server err
    }
  }
}

module.exports = { Comment };
