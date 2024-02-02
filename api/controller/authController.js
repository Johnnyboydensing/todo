/** @format */
const db = require("../config/db");
const { AccessToken, RefreshToken } = require("../middleware/Auth");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { username, password } = req.body;
  const insertQuery = "INSERT INTO user (username, password) VALUES (?,?)";
  const userAlreadyExist = "SELECT * FROM user WHERE username = ?";
  const saltRounds = 10;
  try {
    await db.query(userAlreadyExist, [username], async (error, result) => {
      if (result.length > 0) {
        return res.status(400).send({ msg: "User already exist!" });
      } else {
        if (username.length < 5 || username.length > 15) {
          return res
            .status(400)
            .send({ msg: "Username must be between 5 and 15 characters.!" });
        } else {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            await db.query(insertQuery, [username, hash], (errr, ress) => {
              if (errr) {
                console.log(errr);
                return res.status(400).send({ msg: "Enkk!" });
              }
              const user = {
                username,
                user_id: ress.insertId,
              };

              const accessToken = AccessToken(user);
              const refreshToken = RefreshToken(user);
              return res
                .status(200)
                .send({ msg: "Success!", accessToken, refreshToken });
            });
          });
        }
      }
    });
  } catch (error) {
    return res.status(200).send({ msg: "Error in server!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const usernameExist = "SELECT * FROM user WHERE username = ?";

  try {
    await db.query(usernameExist, [username], async (err, ress) => {
      if (ress.length === 0) {
        return res
          .status(400)
          .send({ msg: "No username exist!", isAuth: false });
      } else {
        const comp = await bcrypt.compare(password, ress[0].password);

        if (!comp) {
          return res
            .status(400)
            .send({ msg: "Invalid credentials!", isAuth: false });
        } else {
          const { password, ...others } = ress[0];

          const accessToken = AccessToken(others);
          const refreshToken = RefreshToken(others);
          return res
            .cookie("AccessToken", accessToken, {
              maxAge: 86400000,
              httpOnly: true,
            })
            .cookie("RefreshToken", refreshToken, {
              maxAge: 2.628e9,
              httpOnly: true,
            })
            .status(200)
            .send({
              msg: "Logged in successfully!",
              accessToken,
              isAuth: true,
            });
        }
      }
    });
  } catch (error) {
    return res.status(200).send({ msg: "Error in server!" });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("AccessToken", {
      httpOnly: true,
    })
    .clearCookie("RefreshToken", {
      httpOnly: true,
    })
    .send({ msg: "Logout successfully" });
};

const isAuth = (req, res) => {
  res.send({ msg: "You're authenticated", user: req.user, isValid: true });
};

module.exports = { register, login, isAuth, logout };
