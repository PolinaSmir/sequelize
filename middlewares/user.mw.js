const { User } = require("../models");
const { USER_SCHEMA } = require("../schemas/user.schema");
const UserNotFound = require("../errors/UserNotFound");

module.exports.getUserInstance = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new UserNotFound("User not found");
    }

    req.userInstance = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateUser = async (req, res, next) => {
  try {
    const { body } = req;

    const validatedUser = await USER_SCHEMA.validate(body);

    if (validatedUser) {
      next();
    }
  } catch (error) {
    next(error);
  }
};
