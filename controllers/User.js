/* eslint-disable no-param-reassign */
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import User from '../database/models/User';

const UserController = {
  getUsers: async (req, res) => {
    const users = await User.all();
    users.forEach((element) => {
      delete element.password;
    });
    try {
      return Response.send(res, codes.success, {
        data: users,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.find(parseInt(req.params.id, 10));
      if (!user) {
        return Response.send(res, codes.notFound, {
          error: 'User not found.',
        });
      }
      delete user.password;
      return Response.send(res, codes.success, {
        data: user,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  editUser: async (req, res) => {
    const {
      firstname, lastname, othername, gender, email, phoneNumber, passportUrl,
    } = req.body;

    try {
      const user = await User.update(req.params.id, {
        firstname, lastname, othername, gender, email, phoneNumber, passportUrl,
      });
      delete user.password;
      return Response.send(res, codes.success, {
        data: user,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  deleteUser: (req, res) => {
    User.delete(parseInt(req.params.id, 10));
    return Response.send(res, codes.success, {
      data: {
        message: 'User deleted successfully.',
      },
    });
  },
};

export default UserController;
