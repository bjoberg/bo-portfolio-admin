import IGoogleUser from "./google-user.interface";

export default interface IGoogleProfile {
  profileUrl: string;
  _raw: string;
  _json: IGoogleUser;
}
