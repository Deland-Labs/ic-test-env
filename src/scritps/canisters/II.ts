import { Principal } from "@dfinity/principal";
import { exec } from "shelljs";
import { convert, purify } from "../utils";

const create = () => {
  exec("dfx canister create II");
};

const install = () => {
  const installCode = `echo yes |II_ENV=development   dfx canister install II --argument '(null)'  --mode reinstall`;
  exec(installCode);
};

const createIICanister = () => {
  create();
  install();
  const getLedgerIdRes = exec("dfx canister id II");
  const II_Id = purify(getLedgerIdRes.stdout);
  return II_Id;
};

export { createIICanister };
