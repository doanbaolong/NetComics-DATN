const db = require('../models/index');

class HomeController {

    // [GET] /
    async index(req, res) {
        try {
            let data = await db.User.findAll();
            res.render('home.ejs', {
                data: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new HomeController;