const User = require("../models/User");

exports.login = (req, res) => {
  let user = new User(req.body);

  user
    .login()
    .then((result) => {
      req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id };
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch((err) => {
      req.flash("errors", err);
      req.session.save(() => res.redirect("/"));
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id };
      req.session.save(() => res.redirect("/"));
    })
    .catch((registrationErrors) => {
      registrationErrors.forEach((error) => req.flash("registrationErrors", error));
      req.session.save(() => res.redirect("/"));
    });
};

exports.home = (req, res) => {
  if (req.session.user) {
    res.render("home-dashboard", { avatar: req.session.user.avatar, username: req.session.user.username });
  } else {
    res.render("home-guest", { errors: req.flash("errors"), registrationErrors: req.flash("registrationErrors") });
  }
};
