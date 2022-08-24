import passport from "passport";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID:
      "938269283248-p3n13j7ll4ilqu5ebde07qpk04lamqjt.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true,
  }, function (request, accessToken, refreshToken, profile, done) {
    return done(null, { accessToken, profile });
  }),
);
