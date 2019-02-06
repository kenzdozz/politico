
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import aws from 'aws-sdk';

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  region: 'us-east-1',
});

const multerUpload = field => async (request, response, next) => {
  const storage = multerS3({
    s3: new aws.S3(),
    bucket: 'poli-tico',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    const filetypes = ['image/png', 'image/jpeg'];
    const mimetype = filetypes.includes(file.mimetype);
    if (mimetype) return cb(null, true);
    req.body[file.fieldname] = 'invalid';
    return cb(null, false);
  };

  const upload = multer({ storage, fileFilter }).single(field);
  upload(request, response, (err) => {
    if (err) {
      request.body[field] = 'invalid';
    } else {
      request.body[field] = request.file.location;
    }
    return next();
  });
};

export default multerUpload;
