const { User } = require("../models");

module.exports.getUserInstance = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    req.userInstance = user;

    next();
  } catch (error) {
    next(error);
  }
};
