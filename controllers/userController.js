const User = require('../models/User');

exports.login = (req,res)=> {

}

exports.logout = (req,res)=> {
    
}

exports.register = (req,res)=> {
    let user = new User();
    user.register();
    res.send('You tried to register.');
}

exports.home = (req,res)=> {
    res.render('home-guest')
}