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
};

export default OfficeController;
