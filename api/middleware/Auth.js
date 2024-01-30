/** @format */

const jwt = require("jsonwebtoken");

const AccessToken = (param) => {
  const token = jwt.sign(
    { username: param.username, user_id: param.user_id },
    "Secret",
    {
      expiresIn: "1h",
    }
  );

  return token;
};

const RefreshToken = (param) => {
  const refreshToken = jwt.sign(
    { username: param.username, user_id: param.user_id },
    "RefreshToken",
    { expiresIn: 2.628e9 }
  );

  // 30 * 24 * 60 * 60

  return refreshToken;
};

const isAuthenticated = async (req, res, next) => {
  const accessToken = req.cookies.AccessToken;
  const refreshToken = req.cookies.RefreshToken;

  if (!accessToken) {
    jwt.verify(refreshToken, "RefreshToken", (err, decoded) => {
      if (err) {
        return res.send({
          msg: "You're not authenticated",
          isValid: false,
        });
      } else {
        const deco = {
          user_id: decoded.user_id,
          username: decoded.username,
        };
        const newAccessToken = AccessToken(deco);
        res.cookie("AccessToken", newAccessToken, {
          maxAge: 86400000,
          httpOnly: true,
        });
        // 86400000
        req.user = deco;
        next();
      }
    });
  } else {
    jwt.verify(accessToken, "Secret", (err, decoded) => {
      if (err) {
        return res.send({
          msg: "You're not authenticated",
          isValid: false,
        });
      }
      const deco = {
        user_id: decoded.user_id,
        username: decoded.username,
      };
      req.user = deco;
      next();
    });
  }
};

module.exports = { AccessToken, RefreshToken, isAuthenticated };
