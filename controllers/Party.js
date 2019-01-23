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
};

export default PartyController;
