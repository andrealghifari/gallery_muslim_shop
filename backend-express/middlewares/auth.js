
const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  //get user token
  const getToken = request.headers["authorization"];

  if (!getToken) {
    return response.status(401).send({
      success: false,
      message: "Unauthorized Access!",
    });
  }

  jwt.verify(getToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error)
      return response
        .status(401)
        .send({ success: false, message: "Invalid Token" });
    request.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
