// COMMENT: improt the necessary modules
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    // COMMENT: configure the GoogleStrategy with environment variables
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile.emails[0].value)
        // window.value=profile.emails[0].value; 
        // COMMENT: instantiate a new user object with the profile data
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        }
        // COMMENT: try to find the user in the database
        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            // COMMENT: if the user is found, return the user
            done(null, user)
          } else {
            // COMMENT: if the user is not found, create a new user
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // COMMENT: serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // COMMENT: deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
