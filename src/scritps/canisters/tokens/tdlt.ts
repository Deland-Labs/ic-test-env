import { createDFTCanister, transferDFT } from "../dft";
const template = "TDLT";
const name = "Deland Labs Token";
const symbol = "TDLT";
const decimals = 18;
const supply = "100000000";
const feeRate = 0;
const feeMinimum = 1;
// ./src/assets/dft/logo/TDLT.png
const logo = "TDLT.png";

export const createTDLT = async () => {
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

export const transferTDLT = async (to: string, amount: number) => {
  return transferDFT(template, decimals, to, amount);
};
