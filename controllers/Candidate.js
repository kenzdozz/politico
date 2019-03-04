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

  getCandidates: async (req, res) => {
    const all = req.url.indexOf('all') !== -1 ? '' : 'WHERE candidates.approved = true';
    try {
      const candidates = await Candidate.raw({
        text: `SELECT candidates.*, users.firstname, users.lastname, users.passporturl, offices.name as officename, parties.logourl, parties.name as partyname, parties.acronym, (SELECT COUNT(votes.id) FROM votes WHERE votes.candidate = candidates.id) as votescount FROM candidates LEFT JOIN users ON candidates.candidate = users.id LEFT JOIN offices ON offices.id = candidates.office LEFT JOIN parties ON parties.id = candidates.party ${all} ORDER BY officename`,
      }).get();
      return Response.send(res, codes.success, {
        data: candidates,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getCandidate: async (req, res) => {
    try {
      const candidateId = parseInt(req.params.candidate, 10);
      const candidates = Number.isNaN(candidateId) ? null : await Candidate.raw({
        text: 'SELECT candidates.*, users.firstname, users.lastname, users.passporturl, offices.name as officename, parties.logourl, parties.name as partyname, parties.acronym, (SELECT COUNT(votes.id) FROM votes WHERE votes.candidate = candidates.id) as votescount FROM candidates LEFT JOIN users ON candidates.candidate = users.id LEFT JOIN offices ON offices.id = candidates.office LEFT JOIN parties ON parties.id = candidates.party WHERE candidates.id = $1',
        values: [candidateId],
      }).first();
      if (!candidates) {
        return Response.send(res, codes.notFound, {
          error: 'Candidate not found.',
        });
      }
      return Response.send(res, codes.success, {
        data: candidates,
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  getOfficeCandidates: async (req, res) => {
    try {
      const officeId = parseInt(req.params.office, 10);
      const candidates = Number.isNaN(officeId) ? null : await Candidate.raw({
        text: 'SELECT candidates.*, users.firstname, users.lastname, users.passporturl, offices.name as officename, parties.logourl, parties.name as partyname, parties.acronym, (SELECT COUNT(votes.id) FROM votes WHERE votes.candidate = candidates.id) as votescount FROM candidates LEFT JOIN users ON candidates.candidate = users.id LEFT JOIN offices ON offices.id = candidates.office LEFT JOIN parties ON parties.id = candidates.party WHERE offices.id = $1 AND candidates.approved = true',
        values: [officeId],
      }).get();
      if (!candidates) {
        return Response.send(res, codes.notFound, {
          error: 'Office not found.',
        });
      }
      return Response.send(res, codes.success, {
        data: candidates,
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default CandidateController;
