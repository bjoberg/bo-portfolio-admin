export default interface IGooglePassportConfig {
  accessType?: "offline" | "online";
  authorizationURL?: string;
  callbackURL?: string;
  clientID: string;
  clientSecret: string;
  scope?: string | string[];
  tokenURL?: string;
  userProfileURL?: string;
}
