import { createDFTCanister, transferDFT } from "../dft";
import { exec } from "shelljs";
const template = "TUSDT";
const name = "Test USDT";
const symbol = "TUSDT";
const decimals = 6;
const supply = "100000000";
const feeRate = 0;
const feeMinimum = 10000;
const logo = "TUSDT.png";

export const createTUSDT = async () => {
  return createDFTCanister(
    template,
    name,
    symbol,
    decimals,
    supply,
    feeRate,
    feeMinimum,
    logo
  );
};

export const transferTUSDT = async (to: string, amount: number) => {
  return transferDFT(template, decimals, to, amount);
};
