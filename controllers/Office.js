import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Office from '../database/models/Office';

const OfficeController = {
  createOffice: async (req, res) => {
    const { name, type } = req.body;
    try {
      const office = await Office.create({ name, type });
      return Response.send(res, codes.created, {
        data: office,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getOffices: async (req, res) => {
    try {
      const offices = await Office.all();
      return Response.send(res, codes.success, {
        data: offices,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getOffice: async (req, res) => {
    try {
      const office = await Office.find(parseInt(req.params.id, 10));
      if (!office) {
        return Response.send(res, codes.notFound, {
          error: 'Office not found.',
        });
      }
      return Response.send(res, codes.success, {
        data: office,
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default OfficeController;
