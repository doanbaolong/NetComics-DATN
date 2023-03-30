const CRUDServices = require("../../services/CRUDServices");
const db = require("../models/index");

class CRUDController {
  // [GET] /
  index(req, res) {
    res.render("crud.ejs");
  }

  async creat(req, res) {
    await CRUDServices.creatUser(req.body);
    res.send("crud.ejs");
  }

  async show(req, res) {
    let data = await CRUDServices.getAllUsers();
    res.render("display.ejs", {
      data,
    });
  }

  async edit(req, res) {
    let userId = req.params.id;
    if (userId) {
      let user = await CRUDServices.getUserById(userId);
      return res.render("edit.ejs", { user });
    } else {
      return res.send(404);
    }
  }

  async update(req, res) {
    await CRUDServices.updateUser(req.body, req.params.id);
    return res.redirect("/crud/show");
  }

  async delete(req, res) {
    let id = req.params.id;
    if (id) {
      await CRUDServices.deleteUser(id);
      res.redirect("back");
    }
  }
}

module.exports = new CRUDController();
