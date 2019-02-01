import { base64ImageDecode } from '../helpers/utils';
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import User from '../database/models/User';

const UserController = {
  createUser: async (req, res) => {
    const { body } = req;

    const passportUrl = base64ImageDecode(body.passport, 'user');
    if (!passportUrl) {
      return new Response(res, codes.badRequest, {
        error: 'Validation errors',
        fields: [
          { passport: 'Passport is required' },
        ],
      });
    }

    try {
      const columns = ['firstname', 'lastname', 'othername', 'gender',
        'email', 'password', 'phoneNumber', 'passportUrl'];
      const data = [
        body.firstname, body.lastname, body.othername, body.gender,
        body.email, body.password, body.phoneNumber, passportUrl,
      ];

      const user = await User.create(columns, data);
      return new Response(res, codes.created, {
        data: user,
      });
    } catch (error) {
      console.log(error);
      if (error.code == 23505) {
        return new Response(res, codes.serverError, {
          error: error.detail.replace(/\(|\)|Key /g, '').replace('=', ': '),
        });
      }
      return new Response(res, codes.serverError, {
        error: 'Internal server error',
      });
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
