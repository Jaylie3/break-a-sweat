const Vimeo = require('vimeo').Vimeo;
const dotenv = require('dotenv');

dotenv.config();

const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

const uploadToVimeo = (filePath) => {
  return new Promise((resolve, reject) => {
    client.upload(
      filePath,
      { name: filePath.split('/').pop(), description: 'Workout video' },
      (uri) => resolve(`https://player.vimeo.com/video/${uri.split('/').pop()}`),
      (bytesUploaded, bytesTotal) => console.log(`Uploaded ${bytesUploaded}/${bytesTotal}`),
      (error) => reject(error)
    );
  });
};

module.exports = { uploadToVimeo };