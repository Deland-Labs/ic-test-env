import { createDFTCanister, transferDFT } from "../dft";
const template = "TICP";
const name = "Test Wrapped ICP";
const symbol = "TICP";
const decimals = 8;
const supply = "100000000";
const feeRate = 0;
const feeMinimum = 10000;
// ./src/assets/dft/logo/TDLT.png
const logo = "TICP.png";

export const createTICP = async () => {
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

export const transferTICP = async (to: string, amount: number) => {
  return transferDFT(template, decimals, to, amount);
};
