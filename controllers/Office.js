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
};

export default OfficeController;
