import passport from "passport";

import facebookStrategy, { Strategy } from "passport-facebook";
passport.use(
  new facebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: "1023533568336655",
      clientSecret: "89fbbf3c05a4a38434604f3f642a10c5",
      callbackURL: "http://localhost:5000/facebook/callback",
    }, // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);
