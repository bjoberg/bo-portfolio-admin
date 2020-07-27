import { Request, Response } from "express";
import IGoogleAuthorization from "../models/google-authorization.interface";

export default class UserController {
  /**
   * Get user info based on request object
   * @param req Request object sent from the browser
   * @param res Response object that will be sent back to the browser
   */
  public userInfo = (req: Request, res: Response) => {
    try {
      const user = req.user as IGoogleAuthorization;
      res.send(user.profile._json);
    } catch (error) {
      res.status(404).json({ error: "Unable to retrieve user information" });
    }
  };
}
