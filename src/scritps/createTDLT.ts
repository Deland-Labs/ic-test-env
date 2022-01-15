import { createDFTCanister } from "./canisters/dft";
const name = "Deland Labs Token";
const symbol = "DLD";
const decimals = 18;
const supply = "100000000";
const feeRate = 0;
const feeMinimum = 1;
const logo = "TDLT.png";

createDFTCanister(
  name,
  symbol,
  decimals,
  supply,
  feeRate,
  feeMinimum,
  logo
).then(() => {
  console.log("DFT canister created");
});
