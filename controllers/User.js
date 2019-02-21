/* eslint-disable no-param-reassign */
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import User from '../database/models/User';
import Model from '../database/models/Model';

const UserController = {
  getUsers: async (req, res) => {
    const users = await User.all();
    users.forEach((element) => {
      delete element.password;
      delete element.emailtoken;
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
      delete user.emailtoken;
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
      const user = await User.update(parseInt(req.params.id, 10), {
        firstname, lastname, othername, gender, email, phoneNumber, passportUrl,
      });
      delete user.password;
      delete user.emailtoken;
      return Response.send(res, codes.success, {
        data: user,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  deleteUser: (req, res) => {
    try {
      User.delete(parseInt(req.params.id, 10));
      return Response.send(res, codes.success, {
        data: {
          message: 'User deleted successfully.',
        },
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  makeAdmin: async (req, res) => {
    try {
      const userId = parseInt(req.body.user, 10);
      const user = await User.update(userId, { isadmin: true });
      delete user.password;
      delete user.emailtoken;
      return Response.send(res, codes.success, {
        data: user,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  adminStats: async (req, res) => {
    try {
      const stats = await new Model('').raw({
        text: 'SELECT COUNT(*) AS parties, (SELECT COUNT(*) FROM offices) AS offices, (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM petitions) AS pertitions FROM parties',
      }).first();
      return Response.send(res, codes.success, {
        data: stats,
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default UserController;
