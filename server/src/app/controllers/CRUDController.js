const CRUDService = require('../../services/CRUDService');
const db = require('../models/index');

class CRUDController {

    // [GET] /
    index(req, res) {
        res.render('crud.ejs')
    }

    async creat(req, res) {
        await CRUDService.creatUser(req.body);
        res.send('crud.ejs')
    }

    async show(req, res) {
        let data = await CRUDService.getAllUsers();
        res.render('display.ejs', {
            data
        });
    }

    async edit(req, res) {
        let userId = req.params.id;
        if (userId) {
            let user = await CRUDService.getUserById(userId);
            return res.render('edit.ejs', { user });
        }
        else {
            return res.send(404);
        }
    }

    async update(req, res) {
        await CRUDService.updateUser(req.body, req.params.id);
        return res.redirect('/crud/show');
    }
    
    async delete(req, res) {
        let id = req.params.id;
        if (id) {
            await CRUDService.deleteUser(id);
            res.redirect('back');
        }
    }
}

module.exports = new CRUDController;