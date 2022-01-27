import { Principal } from "@dfinity/principal";
import { exec } from "shelljs";
import { convert, purify } from "../utils";
import { readFileSync, existsSync } from "fs";

const create = (template: string) => {
  exec(`dfx canister create ${template}`);
};

const fileToByteArray = async (filePath) => {
  if (await existsSync(filePath)) {
    const buffer = await readFileSync(filePath);
    // buffer to Uint8Array
    const byteArray = new Uint8Array(buffer.byteLength);
    for (let i = 0; i < buffer.byteLength; i++) {
      byteArray[i] = buffer[i];
    }
    return byteArray;
  }
  return new Uint8Array();
};

const uint8ArrayToVecNat8 = (array: Uint8Array) => {
  const vecNat8 = [];
  for (let i = 0; i < array.length; i++) {
    vecNat8.push(`${array[i]} : nat8;`);
  }
  return `opt vec {${vecNat8.join(" ")}}`;
};

const install = async (
  template: string,
  name: string,
  symbol: string,
  decimals: number,
  totalSupply: string,
  feeRate: number,
  feeMinimum: number,
  logo?: string
) => {
  const getDfxPricipalRes = exec("dfx identity  get-principal");
  const dfxPricipal = Principal.fromText(purify(getDfxPricipalRes.stdout));
  const dfxAccount = convert.principalToAccountID(dfxPricipal);
  // convert logo file to byte array
  let logoParam = null;

  // if logo file exists
  if (logo) {
    // current directory
    const currentDir = process.cwd();
    const path = "./src/assets/dft/logo/" + logo;
    // exist file
    const logoBytes = await fileToByteArray(path);
    if (logoBytes.length > 0) {
      logoParam = uint8ArrayToVecNat8(logoBytes);
    }
  }
  // generate array length as decimals
  // define array ,length 18
  const zeorArray = new Array(decimals).fill(0);
  const supply = `${totalSupply}${zeorArray.join("")}`;
  const installCode =
    `echo yes|dfx canister  install ${template}` +
    ` --argument '(null ,${logoParam} ,"${name}", "${symbol}", ${decimals}:nat8, ${supply}:nat, ` +
    ` record { minimum = ${feeMinimum} : nat; rate = ${feeRate} : nat; rate_decimals= 0 :nat8  }, null)'` +
    ` --mode reinstall`;
  exec(installCode);
};

const createDFTCanister = async (
  template: string,
  name: string,
  symbol: string,
  decimals: number,
  totalSupply: string,
  feeRate: number,
  feeMinimum: number,
  logo?: string
) => {
  create(template);
  await install(
    template,
    name,
    symbol,
    decimals,
    totalSupply,
    feeRate,
    feeMinimum,
    logo
  );
  const getDFTIdRes = exec(`dfx canister id ${template}`);
  const dftId = purify(getDFTIdRes.stdout);
  return dftId;
};

export const transferDFT = async (
  template: string,
  decimals: number,
  to: string,
  amount: number
) => {
  const cmd = `dfx canister call ${template} transfer '(null,"${to}", ${amount}${Array(
    decimals
  )
    .fill(0)
    .join("")}:nat,null)'`;
  exec(cmd);
};

export { createDFTCanister };
