import instance from "../lib/axios";

export const postLogin = async (credentials: any) => {
  return instance.post("/citizen/login", credentials);
};

export const getProfile = async () => {
  return instance.get("/citizen/profile");
};

export const getCaptcha = async () => {
  return instance.get("/captcha");
}

export const sendOtp = async (body: any) => {
  return instance.post("/citizen/send-otp", body);

}