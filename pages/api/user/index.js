import { ValidateProps } from '@/api-lib/constants';
import { findUserByUsername, updateUserById } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(database, ...auths);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

handler.patch(
  upload.single('profilePicture'),
  validateBody({
    type: 'object',
    properties: {
      companyname: ValidateProps.user.companyname,
      contactperson: ValidateProps.user.contactperson,
      telephonenumber: ValidateProps.user.telephonenumber,
      deliveryaddress: ValidateProps.user.deliveryaddress,
      postcode: ValidateProps.user.postcode,
      town: ValidateProps.user.town,
      billingaddress: ValidateProps.user.billingaddress,
      billingpostcode: ValidateProps.user.billingpostcode,
      billingtown: ValidateProps.user.billingtown,
      organisationnumber: ValidateProps.user.organisationnumber,
      bio: ValidateProps.user.bio,
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }
    let profilePicture;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      profilePicture = image.secure_url;
    }

    const { name, bio } = req.body;

    let username;

    if (req.body.username) {
      username = slugUsername(req.body.username);
      if (
        username !== req.user.username &&
        (await findUserByUsername(req.db, username))
      ) {
        res
          .status(403)
          .json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }
      
    const user = await updateUserById(req.db, req.user._id, {
      companyname: req.body.companyname,
      contactperson: req.body.contactperson,
      telephonenumber: req.body.telephonenumber,
      deliveryaddress: req.body.deliveryaddress,
      postcode: req.body.postcode,
      town: req.body.town,
      billingaddress: req.body.billingaddress,
      billingpostcode: req.body.billingpostcode,
      billingtown: req.body.billingtown,
      organisationnumber: req.body.organisationnumber,
      ...(profilePicture && { profilePicture }),
    });
      
    res.json({ user });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
