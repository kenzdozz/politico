import { base64ImageDecode } from '../helpers/utils';
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Party from '../database/models/Party';

const PartyController = {
  createParty: async (req, res) => {
    const { name, hqAddress, logo } = req.body;

    const logoUrl = base64ImageDecode(logo, 'party', 'png');
    if (!logoUrl) {
      return Response.send(res, codes.badRequest, {
        error: 'Validation errors',
        fields: {
          field: 'logo',
          message: 'Logo is required',
        },
      });
    }

    try {
      const party = await Party.create({ name, hqAddress, logoUrl });
      return Response.send(res, codes.created, {
        data: party,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getParties: async (req, res) => {
    try {
      const parties = await Party.all();
      return Response.send(res, codes.success, {
        data: parties,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getParty: async (req, res) => {
    try {
      const party = await Party.find(parseInt(req.params.id, 10));
      if (!party) {
        return Response.send(res, codes.notFound, {
          error: 'Party not found.',
        });
      }
      return Response.send(res, codes.success, {
        data: party,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  editParty: async (req, res) => {
    const { name, hqAddress, logo } = req.body;
    try {
      const party = await Party.update(parseInt(req.params.id, 10), { name, hqAddress, logo });
      if (!party) {
        return Response.send(res, codes.notFound, {
          error: 'Party not found.',
        });
      }
      return Response.send(res, codes.success, {
        data: party,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  deleteParty: (req, res) => {
    try {
      Party.delete(parseInt(req.params.id, 10));
      return Response.send(res, codes.success, {
        data: {
          message: 'Party deleted successfully.',
        },
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default PartyController;
