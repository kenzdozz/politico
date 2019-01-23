import { base64ImageDecode } from '../helpers/utils';
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Party from '../database/models/Party';

const PartyController = {
  create: async (req, res) => {
    const { name, hqAddress, logo } = req.body;

    const logoUrl = base64ImageDecode(logo, 'party', 'png');
    if (!logoUrl) {
      return new Response(res, codes.badRequest, {
        error: 'Validation errors',
        fields: {
          field: 'logo',
          message: 'Logo is required',
        },
      });
    }

    const party = Party.create({ name, hqAddress, logoUrl });

    return new Response(res, codes.created, {
      data: [
        party,
      ],
    });
  },

  getAll: (req, res) => {
    const parties = Party.findAll();
    return new Response(res, codes.success, {
      data: parties,
    });
  },

  getOne: (req, res) => {
    const party = Party.findOne(parseInt(req.params.id, 10));
    if (!party) {
      return new Response(res, codes.notFound, {
        error: 'Party not found.',
      });
    }
    return new Response(res, codes.success, {
      data: [party],
    });
  },

  editOne: async (req, res) => {
    const { name, hqAddress, logo } = req.body;
    const party = await Party.update(parseInt(req.params.id, 10), { name, hqAddress, logo });
    if (!party) {
      return new Response(res, codes.notFound, {
        error: 'Party not found.',
      });
    }
    return new Response(res, codes.success, {
      data: [party],
    });
  },
};

export default PartyController;
