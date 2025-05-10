import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const env = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is not defined.`);
  return value;
};
