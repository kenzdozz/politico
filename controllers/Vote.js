import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Office from '../database/models/Office';
import Candidate from '../database/models/Candidate';
import Vote from '../database/models/Vote';
import Petition from '../database/models/Petition';

const VoteController = {
  vote: async (req, res) => {
    const officeId = parseInt(req.body.office, 10);
    const candidateId = parseInt(req.body.candidate, 10);
    const userId = parseInt(req.user.id, 10);

    try {
      if (!await Candidate.where([
        ['candidate', '=', candidateId], ['office', '=', officeId],
      ]).exists()) {
        return Response.send(res, codes.badRequest, {
          error: 'Candidate does not exist.',
        });
      }
      if (await Vote.where([
        ['createdby', '=', userId], ['office', '=', officeId],
      ]).exists()) {
        return Response.send(res, codes.conflict, {
          error: 'You have already voted for this office..',
        });
      }
      const vote = await Vote.create({
        candidate: candidateId,
        office: officeId,
        createdby: userId,
      });
      return Response.send(res, codes.created, {
        data: vote,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  officeResults: async (req, res) => {
    const officeId = parseInt(req.params.office, 10);
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
    const { body, evidence } = req.body;
    const office = parseInt(req.body.office, 10);

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
