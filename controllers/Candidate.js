import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Office from '../database/models/Office';
import Party from '../database/models/Party';
import Candidate from '../database/models/Candidate';
import User from '../database/models/User';

const CandidateController = {
  expressInterest: async (req, res) => {
    const officeId = req.params.office;
    const { party: partyId, mandate } = req.body;
    try {
      let error = await Party.exists(partyId || 0) ? '' : 'Party does not exist. ';
      error += await Office.exists(officeId) ? '' : 'Office does not exist. ';

      if (error) {
        return Response.send(res, codes.badRequest, {
          error,
        });
      }

      const candidate = await Candidate.create({
        candidate: req.user.id,
        office: officeId,
        party: partyId,
        mandate,
      });

      return Response.send(res, codes.created, {
        data: candidate,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  approveCandidate: async (req, res) => {
    const userId = req.params.user;
    const officeId = req.body.office;
    const partyId = req.body.party;
    try {
      let error = await User.exists(userId) ? '' : 'User does not exist. ';
      error += await Office.exists(officeId) ? '' : 'Office does not exist. ';

      if (error) {
        return Response.send(res, codes.badRequest, {
          error,
        });
      }
      const isParty = partyId && await Party.exists(partyId);

      let candidate = await Candidate.where([
        ['candidate', '=', userId],
        ['office', '=', officeId],
      ]).first();

      if (candidate) {
        candidate = await Candidate.update(candidate.id, { approved: true });
      } else if (isParty) {
        candidate = await Candidate.create({
          candidate: userId,
          office: officeId,
          party: partyId,
          mandate: req.body.mandate,
          approved: true,
        });
      } else {
        return Response.send(res, codes.badRequest, {
          error: partyId ? 'Party does not exist.' : 'Party required.',
        });
      }

      return Response.send(res, codes.created, {
        data: candidate,
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default CandidateController;
