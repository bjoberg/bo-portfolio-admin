import { Express } from "express";
import proxy from "express-http-proxy";
import { Request } from "express-serve-static-core";

import { RequestOptions } from "http";
import IGoogleAuthorization from "../models/google-authorization.interface";
import HttpMethods from "../models/http-methods";

export default class ProxyController {
  constructor(private app: Express, private proxyEndpoint: string, private apiEndpoint: string) { }

  /**
   * Initialize the proxy based on object properties
   */
  public initialize() {
    // Redeclare variables to get the correct scope
    const proxyEndpoint = this.proxyEndpoint;
    const apiEndpoint = this.apiEndpoint;
    const proxyReqPathResolver = this.proxyReqPathResolver;
    const shouldAddAuthorization = this.shouldAddAuthorization;

    // Initialize the proxy
    this.app.use(proxyEndpoint, proxy(apiEndpoint, {
      proxyReqPathResolver(req: Request) { return proxyReqPathResolver(req); },
      proxyReqOptDecorator(proxyReqOpts: RequestOptions, srcReq: Request) {
        if (shouldAddAuthorization(srcReq.method)) {
          const user = srcReq.user as IGoogleAuthorization;
          const accessToken = user ? user.accessToken : "";
          proxyReqOpts.headers = {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          };
        }
        return proxyReqOpts;
      },
    }));
  }

  /**
   * Construct and resolve the proxies path
   */
  private proxyReqPathResolver = (req: Request): string => {
    return `${this.proxyEndpoint}${req.url}`;
  }

  /**
   * Determine if the authorization headers should added or not
   */
  private shouldAddAuthorization = (method: string): boolean => {
    switch (method) {
      case HttpMethods.post:
        return true;
      case HttpMethods.put:
        return true;
      case HttpMethods.delete:
        return true;
      default:
        return false;
    }
  }
}
