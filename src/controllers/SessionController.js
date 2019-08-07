const {
    User
} = require('../models');

const bcrypt = require('bcryptjs');

class SessionController {
    async store(req, res) {
        try {

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (!user) {
                //User not found, not registered.
                return res.status(404).send();
            }

            let isEqual = await bcrypt.compare(req.body.password, user.password_hash);
            if (isEqual) {
                //Authenticated
                return res.status(200).send();
            }

            //User login attempt failed, wrong password or email.
            return res.status(203).send();

        } catch (error) {
            console.log(error.message);
            return res.status(500).send();
        }




    }
}

module.exports = new SessionController();