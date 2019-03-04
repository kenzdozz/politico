/* eslint-disable no-throw-literal */
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import Office from '../database/models/Office';
import Party from '../database/models/Party';
import Candidate from '../database/models/Candidate';
import User from '../database/models/User';

const CandidateController = {
  expressInterest: async (req, res) => {
    const officeId = parseInt(req.params.office, 10);
    const partyId = parseInt(req.body.party, 10);
    const { mandate } = req.body;

    try {
      if (!await Party.exists(partyId || 0)) {
        return Response.send(res, codes.badRequest, {
          error: 'Party does not exist.',
        });
      }
      if (!await Office.exists(officeId || 0)) {
        return Response.send(res, codes.badRequest, {
          error: 'Office does not exist.',
        });
      }
      if (await Candidate.where([
        ['candidate', '=', req.user.id], ['office', '=', officeId],
      ]).exists()) {
        return Response.send(res, codes.badRequest, {
          error: 'You have already expressed interest for this office.',
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
    const userId = parseInt(req.params.user, 10);
    const officeId = parseInt(req.body.office, 10);
    const partyId = parseInt(req.body.party, 10);
    try {
      if (!await User.exists(userId || 0)) {
        return Response.send(res, codes.badRequest, {
          error: 'User does not exist.',
        });
      }
      if (!await Office.exists(officeId || 0)) {
        return Response.send(res, codes.badRequest, {
          error: 'Office does not exist.',
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
