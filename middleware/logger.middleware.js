//Error Handling
const logger = (req, res, next) => {
  try {
    console.log(
      `Request URL: ${req.url}  Request method: ${
        req.method
      }  Request Time: ${new Date().toLocaleTimeString()}`
    );
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = logger;
