import { RequestHandler, Router } from "express";
import { OAuth2Client } from "google-auth-library";
import passport from "passport";

import AuthController from "../controllers/auth.controller";

const authRouter = Router();
const controller = new AuthController(new OAuth2Client());

authRouter
  .route("/google/login")
  .get(passport.authenticate("google") as RequestHandler);

authRouter
  .route("/google/redirect")
  .get(passport.authenticate("google") as RequestHandler, controller.redirect);

authRouter.route("/google/logout").get(controller.logoutGoogle);

export { authRouter };
