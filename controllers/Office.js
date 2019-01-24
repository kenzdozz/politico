import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Office from '../database/models/Office';

const OfficeController = {
  createOffice: async (req, res) => {
    const { name, type } = req.body;

    const office = Office.create({ name, type });

    return new Response(res, codes.created, {
      data: [
        office,
      ],
    });
  },

  getOffices: (req, res) => {
    const offices = Office.findAll();
    return new Response(res, codes.success, {
      data: offices,
    });
  },

  getOffice: (req, res) => {
    const office = Office.findOne(parseInt(req.params.id, 10));
    if (!office) {
      return new Response(res, codes.notFound, {
        error: 'Office not found.',
      });
    }
    return new Response(res, codes.success, {
      data: [office],
    });
  },
};

export default OfficeController;
