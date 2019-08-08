const {
    User
} = require('../models');

class SessionController {
    async store(req, res) {
        try {

            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                //User not found, not registered.
                return res.status(401).json({
                    message: 'User not found'
                });
            }

            let isValidPassword = await user.checkPassword(password);

            if (isValidPassword) {
                //User authenticated
                return res.status(200).json({
                    email: user.email,
                    name: user.name,
                    token: user.generateToken()
                });
            }


            //User login attempt failed, wrong password or email.
            return res.status(401).json({
                message: "Incorrect password"
            });

        } catch (error) {
            console.log(error.message);
            return res.status(500).send();
        }




    }
}

module.exports = new SessionController();