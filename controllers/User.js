import { base64ImageDecode } from '../helpers/utils';
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import User from '../database/models/User';

const UserController = {
  createUser: async (req, res) => {
    const { passport } = req.body;

    const passportUrl = base64ImageDecode(passport, 'user');
    if (!passportUrl) {
      return new Response(res, codes.badRequest, {
        error: 'Validation errors',
        fields: [
          { passport: 'Passport is required' },
        ],
      });
    }

    try {
      const user = await User.create({ passportUrl, ...req.body });
      console.log(user)
      return new Response(res, codes.created, {
        data: [
          user,
        ],
      });
    } catch (error) {
      console.log("tttt")
      return res.send(error);
    }
  },

  getParties: (req, res) => {
    const parties = User.findAll();
    return new Response(res, codes.success, {
      data: parties,
    });
  },

  getUser: (req, res) => {
    const user = User.findOne(parseInt(req.params.id, 10));
    if (!user) {
      return new Response(res, codes.notFound, {
        error: 'User not found.',
      });
    }
    return new Response(res, codes.success, {
      data: [user],
    });
  },

  editUser: async (req, res) => {
    const { name, hqAddress, logo } = req.body;
    const user = await User.update(parseInt(req.params.id, 10), { name, hqAddress, logo });
    if (!user) {
      return new Response(res, codes.notFound, {
        error: 'User not found.',
      });
    }
    return new Response(res, codes.success, {
      data: [user],
    });
  },

  deleteUser: (req, res) => {
    User.delete(parseInt(req.params.id, 10));
    return new Response(res, codes.success, {
      data: [{
        message: 'User deleted successfully.',
      }],
    });
  },
};

export default UserController;
