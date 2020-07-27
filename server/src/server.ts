import bodyParser from "body-parser";
import chalk from "chalk";
import compression from "compression";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import webpack, { Configuration } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotReloadMiddleware from "webpack-hot-middleware";

try {
  dotenv.config();
} catch (error) {
  // tslint:disable-next-line:no-console
  console.error("Error: unable to set environment variables.");
}

import passport from "passport";
import webpackDevConfig from "../../config/webpack.client.config";
import PassportController from "./controllers/passport.controller";
import ProxyController from "./controllers/proxy.controller";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { getBaseFile, sendGz } from "./utils/express.utils";

const port = process.env.PORT !== undefined ? process.env.PORT : 5000;
const apiEndpoint = process.env.API_ENDPOINT !== undefined ? process.env.API_ENDPOINT : "";
const cookieKey = process.env.COOKIE_KEY !== undefined ? process.env.COOKIE_KEY : "";
const callbackUrl = process.env.GOOGLE_CALLBACK_URL !== undefined ? process.env.GOOGLE_CALLBACK_URL : "";
const clientId = process.env.GOOGLE_CLIENT_ID !== undefined ? process.env.GOOGLE_CLIENT_ID : "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET !== undefined ? process.env.GOOGLE_CLIENT_SECRET : "";
const isProduction = process.env.NODE_ENV === "production";
const buildPath = isProduction ? "build" : "dev";
const scope = ["profile", "email"];
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

// Setup passport
const passportController = new PassportController();
if (cookieKey !== undefined) {
  app.use(
    cookieSession({
      keys: [cookieKey],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
  );
}
app.use(passport.initialize() as express.RequestHandler);
app.use(passport.session() as express.RequestHandler);
passportController.initializeGoogleStrategy(
  callbackUrl,
  clientId,
  clientSecret,
  scope
);

// Setup routes
app.use("/auth", authRouter);
app.use("/api/v1", userRouter);

// Setup proxies
const proxyController = new ProxyController(app, "/api/v1/", apiEndpoint);
proxyController.initialize();

// In 'production' send the gzipped file to the browser
app.get("*.css", async (req: Request, res: Response, next: NextFunction) => {
  const file = getBaseFile(req.url, ".css");
  isProduction ? sendGz(req, res, next, buildPath, "text/css", file) : next();
});

app.get("*.js", async (req: Request, res: Response, next: NextFunction) => {
  const file = getBaseFile(req.url, ".js");
  isProduction
    ? sendGz(req, res, next, buildPath, "text/javascript", file)
    : next();
});

// Resolve the static root file
app.use("/", express.static(path.resolve(buildPath)));

// Custom webpack configuration for 'development' mode
// You need this for hmr and webpack-dev-server usage
if (!isProduction) {
  const webpackCompiler = webpack(webpackDevConfig as Configuration);
  const devMiddleware = webpackDevMiddleware(webpackCompiler);
  app.use(webpackHotReloadMiddleware(webpackCompiler));
  app.use(devMiddleware);

  // Since the webpack dev server starts it's own server, we want to explicity send our app to the browser
  // webpack-dev-server serves from memory, so we need the buffer, no the actual file.
  app.get("*", (req: Request, res: Response) => {
    const htmlBuffer: Buffer = devMiddleware.fileSystem.readFileSync(
      `${path.resolve(buildPath)}/index.html`
    ) as Buffer;
    res.send(htmlBuffer.toString());
  });
}

// Fallback response. We need to send the index.html if no other routes pass
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(buildPath, "index.html"));
});

// Start the application
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    `Starting app in ${chalk.yellow(`${process.env.NODE_ENV}`)} mode...`
  );
  // tslint:disable-next-line:no-console
  console.log(`Server started on port ${port}`);
});
