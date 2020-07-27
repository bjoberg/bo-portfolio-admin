import IGoogleProfile from "./google-profile.interface";

export default interface IGoogleAuthorization {
  accessToken: string;
  refreshToken: string;
  profile: IGoogleProfile;
}
