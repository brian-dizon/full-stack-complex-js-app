const User = require('../models/User');

exports.login = (req, res) => {
    let user = new User(req.body);

    user.login().then(result => {
        req.session.user = { username: user.data.username, _id: user.data._id };
        req.session.save(function () { res.redirect('/') });
    }).catch(err => {
        req.flash('errors', err);
        req.session.save(() => res.redirect('/'));
    });

}

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
}

exports.register = (req, res) => {
    let user = new User(req.body);
    user.register();

    if (user.errors.length) {
        res.send(user.errors);
    } else {
        res.send('Success. No errors found.')
    }
}

exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard', { username: req.session.user.username });
    } else {
        res.render('home-guest', { errors: req.flash('errors') });
    }
}