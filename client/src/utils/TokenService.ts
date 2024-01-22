import Cookie from "js-cookie";
import jwtDecode, { JwtPayload } from 'jwt-decode';

interface Token {
  accessToken: string;
  refreshToken: string;
}

const getLocalAccessToken = (): string | null => {
  try {
    const accessToken = Cookie.get("accessToken");
    return accessToken;
  } catch (error) {
    return null;
  }
};

const getUser = (): JwtPayload | null => {
  try {
    const user = Cookie.get("accessToken");
    return jwtDecode(user) as JwtPayload;
  } catch (error) {
    return null;
  }
};

const getToken = (): Token | null => {
  try {
    const accessToken = Cookie.get("accessToken");
    const refreshToken = Cookie.get("refreshToken");

    if (accessToken && refreshToken) {
      const token: Token = {
        accessToken,
        refreshToken
      };
      return token;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateLocalAccessToken = (token: Token): boolean => {
  try {
    const accessTokenDecoded = jwtDecode(token.accessToken) as JwtPayload;
    const refreshTokenDecoded = jwtDecode(token.refreshToken) as JwtPayload;
    const accessTokenExpiry = new Date(accessTokenDecoded.exp * 1000);
    const refreshTokenExpiry = new Date(refreshTokenDecoded.exp * 1000);

    const accessTokenCookieOptions = {
      httpOnly: false,
      // expires: accessTokenExpiry,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production"
    };

    const refreshTokenCookieOptions = {
      httpOnly: false,
      // expires: refreshTokenExpiry,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production"
    };

    Cookie.set("accessToken", token.accessToken, accessTokenCookieOptions);
    Cookie.set("refreshToken", token.refreshToken, refreshTokenCookieOptions);

    return true;
  } catch (error) {
    return false;
  }
};

const removeUser = (): boolean => {
  try {
    const token = Cookie.get("accessToken");
    if (token) {
      Cookie.remove('accessToken', { path: '/' });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getExpiryDate = async (token: Token | undefined): Promise<Date> => {
  const decodedUser = jwtDecode(token?.refreshToken) as JwtPayload;
  return new Date(decodedUser.exp * 1000);
};

const isAccessExpired = (): boolean => {
  try {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      const decodedUser = jwtDecode(accessToken) as JwtPayload;
      return new Date().getTime() > new Date(decodedUser.exp * 1000);
    }
    return true;
  } catch (error) {
    return true;
  }
};

const TokenService = {
  getLocalAccessToken,
  updateLocalAccessToken,
  removeUser,
  getExpiryDate,
  isAccessExpired,
  getToken,
  getUser
};

export default TokenService;
