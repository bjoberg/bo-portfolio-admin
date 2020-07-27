import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

/**
 * Get the string representation of provided url
 * @param url string of the url being parsed
 * @param fileExtension type of file being parsed
 */
const getBaseFile = (url: string, fileExtension: string) => {
  const file = url.indexOf(fileExtension);
  return url.substring(0, file + fileExtension.length);
};

/**
 * Send the gzipped version of the requested file
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @param buildPath path to the build directory
 * @param contentType type of zipped content being sent (e.g. text/javascript, text/html, et...)
 * @param file that is being requested
 */
const sendGz = (req: Request, res: Response, next: NextFunction, buildPath: string,
                contentType: string, file: string) => {
  try {
    fs.accessSync(path.resolve(`${buildPath}/${file}.gz`));
    req.url = path.resolve(`${file}.gz`);
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", contentType);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(chalk.yellow(`Warning: unable to resolved ${req.url}.gz as gzip file... sending ${req.url}`));
  } finally {
    next();
  }
};

export { getBaseFile, sendGz };
