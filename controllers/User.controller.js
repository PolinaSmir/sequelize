const UserNotFound = require("../errors/UserNotFound");
const { User, Group } = require("../models/index");

module.exports.createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const createdUser = await User.create(body);

    return res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
};

module.exports.findAll = async (req, res, next) => {
  try {
    const resultsArray = await User.findAll();

    return res.status(200).send(resultsArray);
  } catch (error) {
    next(error);
  }
};

module.exports.findByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;

    return res.status(200).send(userInstance);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteByPk = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const rowsCount = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (rowsCount) {
      return res.status(200).send("Successfull delete");
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};

// module.exports.updateUser = async (req, res, next) => {
//   const {
//     params: { id },
//     body,
//   } = req;
//   try {
//     const updatedUsersArray = await User.update(body, {
//       where: {
//         id,
//       },
//       returning: true,
//     });

//     return res.status(200).send(updatedUsersArray);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.updateUser = async (req, res, next) => {
  const { userInstance, body } = req;
  try {
    const result = await userInstance.update(body);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

// Lazy Loading
// module.exports.getUserWithGroups = async (req, res, next) => {
//   try {
//     const {
//       params: { userId },
//     } = req;

//     const userInstance = await User.findByPk(userId);

//     if (!userInstance) {
//       throw new UserNotFound("User not found");
//     }

//     const groupsArray = await userInstance.getGroups();

//     return res.status(200).send({ data: { userInstance, groupsArray } });
//   } catch (error) {
//     next(error);
//   }
// };

// Eager loading
module.exports.getUserWithGroups = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    // const userWithGroups = await User.findByPk(userId, {
    //   include: [Group], // LEFT JOIN
    // });

    const userWithGroups = await User.findByPk(userId, {
      attributes: ["id", "first_name", "last_name"],
      include: {
        // INNER JOIN
        model: Group,
        required: true,
        through: {
          attributes: [], // users_to_groups
        },
        attributes: ["id", "name"], // groups
      },
    });

    if (!userWithGroups) {
      throw new UserNotFound("User not found");
    }

    // const userWithGroupsJSON = userWithGroups.toJSON();
    // delete userWithGroupsJSON.password;

    return res.status(200).send(userWithGroups);
  } catch (error) {
    next(error);
  }
};
