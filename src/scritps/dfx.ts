import { exec } from "shelljs";

export const dfxStart = () => {
  exec("dfx start");
};