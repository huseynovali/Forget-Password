const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { confirmCodeEmail } = require("../utils/emailService");

const loginController = {
    getUsers: (req, res) => {
        userModel.find()
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    getUser: (req, res) => {
        const { email, password } = req.body;

        userModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not Found !' });
                    return;
                }
                if (user.password !== password) {
                    res.status(401).json({ message: 'Incorrect password !' });
                    return;
                }
                const token = jwt.sign({ email: user.email }, "your_secret_key", { expiresIn: "1h" });
                res.json({ user, token });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    changeChatId: (req, res) => {
        const id = req.params.id;
        const { socketId } = req.body;

        userModel.findByIdAndUpdate(id, { socketId }, { new: true })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found!' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        userModel.findById(id)
            .then((data) => {
                res.json(data);
            }).catch((err) => {
                res.status(500).json(err);
            });
    },
    forgotPassword: (req, res) => {
        const { email } = req.body;

        userModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found!' });
                    return;
                }
                const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });

                confirmCodeEmail(email, token)


                res.send("hello")
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    resetPassword: (req, res) => {
        const { token, password ,confirmPassword} = req.body;
console.log();
        if (!token || !password || password !== confirmPassword) {
            res.status(400).json({ message: 'Invalid request!' });
            return;
        }
      
        try {
        
            const decodedToken = jwt.verify(token, "your_secret_key");

            const userId = decodedToken.userId;

            userModel.findById(userId)
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: 'User not found!' });
                        return;
                    }

                    user.password = password;

                    user.save()
                        .then(() => {
                            res.json({ message: 'change password !' });
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } catch (error) {
            res.status(400).json({ message: 'Invalid token!' });
        }
    }

};

module.exports = {
    loginController
};
