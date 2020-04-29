const User = require('../app/models/user');

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user)
        return null;
        
    if (user.email !== email)
        return null;

    if (!user.validPassword(password))
        return null;

    return user;
}