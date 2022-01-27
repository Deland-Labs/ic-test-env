import {
  createTDLT,
  createTICP,
  createTUSDT,
  createCmcCanister,
  createIICanister,
  createLedgerCanister,
  transferTDLT,
  transferTUSDT,
  transferTICP,
} from "./canisters";

const createCanisters = async (principal) => {
  // II local wasm build a special canister id , not a common use case
  //const iiId = createIICanister();
  const ticpId = await createTICP();
  const tusdtId = await createTUSDT();
  const tdltId = await createTDLT();

  transferTDLT(principal, 10001);
  transferTUSDT(principal, 10002);
  transferTICP(principal, 10003);

  console.info(`TICP Id:${ticpId}`);
  console.info(`TUSDT Id:${tusdtId}`);
  console.info(`TDLT Id:${tdltId}`);
  //console.info(`II Id:${iiId}`);
};
import { Command, Option } from "commander";
import { Principal } from "@dfinity/principal";
const program = new Command();

program.command("gtt [principal]").action(async (principal) => {
  try {
    Principal.fromText(principal);
    await createCanisters(principal);
  } catch (error) {
    console.error("invalid principal");
  }
});
program
  .command("createLedger")
  .description("create a ledger canister")
  .action(async () => {
    const ledgerId = createLedgerCanister();
    console.info(`Ledger Id:${ledgerId}`);
  });
program
  .command("createCmc")
  .description("create a cmc canister")
  .action(async (cmd) => {
    const cmcId = createCmcCanister();
    console.info(`CMC Id:${cmcId}`);
  });

program.parse(process.argv);
//   const yourPrincpal =
//   "ablpe-gx5r4-73v3v-qwapo-kszvk-64cwb-olisa-yiyxi-pvmhv-vziwe-pae";
// createCanisters(yourPrincpal);
