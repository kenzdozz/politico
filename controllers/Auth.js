/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import User from '../database/models/User';
import TokenUtil from '../helpers/TokenUtil';

const AuthController = {
  signup: async (req, res) => {
    const {
      firstname, lastname, othername, gender, email,
      password: pass, phonenumber, passport: passporturl,
    } = req.body;

    try {
      const password = bcrypt.hashSync(pass, 10);
      const user = await User.create({
        firstname, lastname, othername, gender, email, password, phonenumber, passporturl,
      });
      delete user.password;
      const token = TokenUtil.sign(user);
      return Response.send(res, codes.created, {
        data: { token, user },
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.where(['email', '=', email]).first();

      if (!user || !await bcrypt.compareSync(password, user.password)) {
        return Response.send(res, codes.unAuthorized, {
          error: 'Invalid email address or password.',
        });
      }
      delete user.password;
      const token = TokenUtil.sign(user);
      return Response.send(res, codes.success, {
        data: { token, user },
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  requestResetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.where(['email', '=', email]).first();

      if (!user) {
        return Response.send(res, codes.notFound, {
          error: 'User does not exist.',
        });
      }

      const emailtoken = Math.random().toString(15).substring(2);
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'oqmeslufjugyffgd@ethereal.email',
          pass: 'kjwYFsNjzTWMSYCRmh',
        },
      });
      const mailOptions = {
        from: '"Politico" <account@poli-tico.herokuapp.com>',
        to: email,
        subject: 'Reset Password Confirmation',
        text: `Hello ${user.firstname}
              You requested to reset your password.
              Your password reset token is: ${emailtoken},
              Make a patch request to '/auth/reset' with the data: email, token and password(new password)
              to reset your password.
              Kindly ignore, if you didn't make the request
              Politico &copy; ${new Date().getFullYear()}
              `,
        html: `<b>Hello ${user.firstname}</b><br>
              <p>You requested to reset your password.</p>
              <p>Your password reset token is: ${emailtoken},
              Make a patch request to '/auth/reset' with the data: email, token and password(new password)
              to reset your password.</p>
              <p>Kindly ignore, if you didn't make the request</p><br>
              <p>Politico &copy; ${new Date().getFullYear()}</p>
              `,
      };

      const info = await transporter.sendMail(mailOptions);
      // eslint-disable-next-line no-console
      console.log('Email Preview: ', nodemailer.getTestMessageUrl(info));

      const useri = await User.update(user.id, { emailtoken });
      return Response.send(res, codes.success, {
        data: {
          message: 'Check your email for password reset link.',
          email,
          useri,
        },
      });
    } catch (error) { return Response.handleError(res, error); }
  },

  resetPassword: async (req, res) => {
    const { token, email, password: pass } = req.body;
    try {
      const user = await User.where([
        ['email', '=', email],
        ['emailtoken', '=', token],
      ]).first();

      if (!user) {
        return Response.send(res, codes.unAuthorized, {
          error: 'Invalid email address or token.',
        });
      }
      const password = bcrypt.hashSync(pass, 10);
      await User.update(user.id, { password });
      return Response.send(res, codes.success, {
        data: {
          message: 'Password changed successfully.',
          email,
        },
      });
    } catch (error) { return Response.handleError(res, error); }
  },
};

export default AuthController;
