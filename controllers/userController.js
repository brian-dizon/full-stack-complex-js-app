const User = require('../models/User');

exports.login = (req, res) => {
    let user = new User(req.body);

    // Using a (traditional) callback function to handle async login
    // user.login(function (result) {
    //     res.send(result);
    // });

    // user.login().then(function (result) {
    //     res.send(result);
    // }).catch(function (err) {
    //     res.send(err);
    // });

    user.login().then(result => res.send(result)).catch(err => res.send(err));

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