const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_dummy_key',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_dummy_key',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/dummy'
});

module.exports = imagekit;
