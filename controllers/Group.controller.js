const { Group, User } = require("../models");

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;

    const createdGroup = await Group.create(body);

    return res.status(201).send(createdGroup);
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { groupId },
    } = req;

    const group = await Group.findByPk(groupId);

    const result = await group.addUser(userInstance);

    return res.status(200).send("User successfully added to group");
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const { userInstance } = req;

    const groups = await userInstance.getGroups();

    return res.status(200).send(groups);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserFromGroup = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { groupId },
    } = req;

    const groupInstance = await Group.findByPk(groupId);

    const rowCount = await groupInstance.removeUser(userInstance);

    if (rowCount) {
      return res.status(200).send("User successfully deleted");
    } else {
      return res.status(400).send("User has never been in this group");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getGroupWithMembers = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;

    const groupWithUser = await Group.findAll({
      where: {
        id: groupId,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    return res.status(200).send(groupWithUser);
  } catch (error) {
    next(error);
  }
};
