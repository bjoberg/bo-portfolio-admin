import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import IGoogleAuthorization from "../models/google-authorization.interface";
import IGooglePassportConfig from "../models/google-passport-config.interface";
import IGoogleProfile from "../models/google-profile.interface";

export default class PassportController {
  constructor() {
    this.serialize();
    this.deserialize();
  }

  /**
   * Initialize passport strategy for google oAuth 2.0
   * @param callbackURL Callback url when the authentication is successful
   * @param clientID Client id provided by Google
   * @param clientSecret Client secret provided by Google
   * @param scope Desired application access
   */
  public initializeGoogleStrategy(
    callbackURL: string | undefined,
    clientID: string | undefined,
    clientSecret: string | undefined,
    scope: string[]
  ) {
    const passportConfig = {
      callbackURL,
      clientID,
      clientSecret,
      scope
    } as IGooglePassportConfig;

    const googleStrategy = new GoogleStrategy(
      passportConfig,
      this.googleAuthCallback
    );

    passport.use("google", googleStrategy);
  }

  /**
   * Initialize passport serialize functionality
   */
  private serialize() {
    passport.serializeUser((user, done) => {
      done(undefined, user);
    });
  }

  /**
   * Initialize passport deserialize functionality
   */
  private deserialize() {
    passport.deserializeUser((user, done) => {
      done(undefined, user);
    });
  }

  /**
   * Callback function when authentication is successful
   * @param accessToken Access token provided by the client
   * @param refreshToken Refresh token provided by the client
   * @param profile User information provided by the client
   * @param done Callback function for passport to serialize the user information
   */
  private googleAuthCallback = (
    accessToken: string,
    refreshToken: string,
    profile: IGoogleProfile,
    done: (err?: string | Error, user?: any, info?: any) => void
  ) => {
    const error: Error | undefined = undefined;
    const info = {
      accessToken,
      profile,
      refreshToken
    } as IGoogleAuthorization;
    done(error, info);
  };
}
