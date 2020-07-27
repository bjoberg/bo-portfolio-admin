import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import IGoogleAuthorization from "../models/google-authorization.interface";

export default class AuthController {
  constructor(private oAuth2Client: OAuth2Client) {}

  /**
   * Redirect request to application root
   * @param req Request object sent from the browser
   * @param res Response object that will be sent back to the browser
   */
  public redirect = (req: Request, res: Response) => {
    try {
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ error: "Unable to redirect" });
    }
  };

  /**
   * Logout the user by revoking the google access token and destroying the request's user session
   * @param req Request object sent from the browser
   * @param res Response object that will be sent back to the browser
   */
  public logoutGoogle = async (req: Request, res: Response) => {
    try {
      const user = req.user as IGoogleAuthorization;
      if (user) {
        await this.revokeGoogleCredentials(user.accessToken);
        this.revokePassportCredentials(req);
      }
      this.redirect(req, res);
    } catch (error) {
      res.status(500).json({ error: "Unable to logout" });
    }
  };

  /**
   * Attempt to revoke the provided user token. If the user token is invalid or expired, just return.
   * @param accessToken Access token to revoke
   */
  private async revokeGoogleCredentials(accessToken: string) {
    try {
      await this.oAuth2Client.revokeToken(accessToken);
    } catch (error) {
      return;
    }
  }

  /**
   * Attempt to revoke the current passport session. If session does not exist, just return.
   * @param req Request object to revoke user session from
   */
  private revokePassportCredentials(req: Request) {
    try {
      req.logout();
    } catch (error) {
      return;
    }
  }
}
