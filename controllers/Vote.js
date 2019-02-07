import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Office from '../database/models/Office';
import Candidate from '../database/models/Candidate';
import Vote from '../database/models/Vote';
import Petition from '../database/models/Petition';

const VoteController = {
  vote: async (req, res) => {
    const officeId = req.body.office;
    const candidateId = req.body.candidate;
    const userId = req.user.id;

    try {
      let error = await Candidate.exists(candidateId) ? '' : 'Candidate does not exist. ';
      error += await Office.exists(officeId) ? '' : 'Office does not exist. ';

      if (error) {
        return Response.send(res, codes.badRequest, {
          error,
        });
      }

      const vote = await Vote.create({
        candidate: req.user.id,
        office: officeId,
        createdby: userId,
      });
      return Response.send(res, codes.created, {
        data: vote,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  officeResults: async (req, res) => {
    const officeId = req.params.office;
    try {
      const error = await Office.exists(officeId) ? '' : 'Office does not exist. ';
      if (error) {
        return Response.send(res, codes.badRequest, {
          error,
        });
      }

      const results = await Vote.raw({
        text: 'SELECT office, candidate, COUNT(id) AS result FROM votes WHERE office = $1 GROUP BY candidate, office',
        values: [officeId],
      }).get();
      return Response.send(res, codes.success, {
        data: results,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  petition: async (req, res) => {
    const { office, body, evidence } = req.body;
    try {
      let error = office && await Office.exists(office) ? '' : 'Office does not exist. ';
      if (!body) error = 'Petition body is required';
      if (error) {
        return Response.send(res, codes.badRequest, {
          error,
        });
      }

      const petition = await Petition.create({
        office, body, evidence, createdby: req.user.id,
      });
      return Response.send(res, codes.created, {
        data: petition,
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default VoteController;
