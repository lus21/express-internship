function getUsers(req, res) {
    res.send('users');
}

function deleteUsers(req, res) {
    const userID = req.params.userId;
};

module.exports = {
    getUsers,
    deleteUsers,
};