import CryptoJS from "crypto-js";
import { ICurrentUser } from "../constants/types";

const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

const encryptData = (data: ICurrentUser) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    encryptionKey
  ).toString();
  return encryptedData;
};

const decryptData = (encryptedData: ICurrentUser | any) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const userData = decryptedData.toString(CryptoJS.enc.Utf8);
  return JSON.parse(userData);
};

export { decryptData, encryptData };
