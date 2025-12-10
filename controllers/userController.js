const User = require('../models/User');

exports.login = (req, res) => {

}

exports.logout = (req, res) => {

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
    res.render('home-guest')
}