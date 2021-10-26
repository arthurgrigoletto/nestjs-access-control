export default {
  jwt: {
    secret: process.env.APP_SECRET || 'accessControl',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
