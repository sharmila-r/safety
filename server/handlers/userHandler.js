var User = require('../config/user.js');
var Q = require('q');
var jwt = require('jwt-simple');
var Contact = require('../config/contacts');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findContacts = Q.nbind(Contact.find, Contact);
var createContact = Q.nbind(Contact.create, Contact);
var contactsDB = require('../config/phoneNumbers');


var userHandler = {
  getContacts: function (req, res, next) {
    console.log('req object: ', req.headers)
    var username = req.headers['x-username'];

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
            return findContacts({
              contactOf: user._id
            }).then(function (contactsData) {
              res.send(contactsData);
            })
        }
      })
      .fail(function (error) {
        console.log('Error in addContact', error)
        next(error);
      });

  },
  addContact: function (req, res, next) {
    var username = req.headers['x-username'];

    console.log('username  (req.headers): ', username)
    var contactName = req.body.contactName;
    var phone = req.body.phone;
    var contactOf;
    var contactType = [];
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          createContact({
            contactName: username,
            phone: phone,
            contactOf: user._id,
            contactType: contactType
          });
          res.send('Added Contact');
        }
      })
      .fail(function (error) {
        console.log('Error in addContact', error)
        next(error);
      });
  },
  signin: function (req, res, next) {
      var username = req.body.username;
      var password = req.body.password;
      console.log('In signIn handler')

      findUser({username: username})
        .then(function (user) {
          if (!user) {
            next(new Error('User does not exist'));
          } else {
            return user.comparePasswords(password)
              .then(function (foundUser) {
                if (foundUser) {
                  var token = jwt.encode(user, 'secret');
                  res.json({token: token});
                } else {
                  return next(new Error('No user'));
                }
              });
          }
        })
        .fail(function (error) {
          console.log('Error in signIn', error)
          next(error);
        });
    },

    signup: function (req, res, next) {
      var username = req.body.username;
      var password = req.body.password;
      console.log('In signUp handler')

      // check to see if user already exists
      findUser({username: username})
        .then(function (user) {
          if (user) {
            next(new Error('User already exist!'));
          } else {
            // make a new user if not one
            return createUser({
              username: username,
              password: password
            });
          }
        })
        .then(function (user) {
          // create token to send back for auth
          var token = jwt.encode(user, 'secret');
          res.json({token: token});
        })
        .fail(function (error) {
          console.log('Error saving user in SignUp', error)
          next(error);
        });
    },

    checkAuth: function (req, res, next) {
      // checking to see if the user is authenticated
      // grab the token in the header is any
      // then decode the token, which we end up being the user object
      // check to see if that user exists in the database
      console.log('In checkAuth handler')
      
      var token = req.headers['x-access-token'];
      if (!token) {
        next(new Error('No token'));
      } else {
        var user = jwt.decode(token, 'secret');
        findUser({username: user.username})
          .then(function (foundUser) {
            if (foundUser) {
              res.send(200);
            } else {
              res.send(401);
            }
          })
          .fail(function (error) {
            next(error);
          });
      }
    },

    showContacts: function (req, res, next) {
      res.json(contactsDB);
      console.log("In show contacts");
    }
}

module.exports = userHandler;