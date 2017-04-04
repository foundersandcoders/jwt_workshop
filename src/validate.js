var people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};

module.exports =  function(decoded, request, callback) {

    // do your checks to see if the person is valid
    if (!people[decoded.user.user_id]) {
      return callback(null, false);
    }
    else {
      return callback(null, true);
    }
}
