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
const program = new Command();

program
  .command("gtt", "generate test tokens")
  .option("-p, --principal", "your principal to receive test token")
  .action(async (cmd) => {
    console.info(`Generating test tokens for ${cmd.principal}`);
    const principal = cmd.principal;
    await createCanisters(principal);
  })
  .command("createLedger", "create a ledger canister")
  .action(async (cmd) => {
    const ledgerId = createLedgerCanister();
    console.info(`Ledger Id:${ledgerId}`);
  })
  .command("createCmc", "create a cmc canister")
  .action(async (cmd) => {
    const cmcId = createCmcCanister();
    console.info(`CMC Id:${cmcId}`);
  });

program.parse(process.argv);
//   const yourPrincpal =
//   "ablpe-gx5r4-73v3v-qwapo-kszvk-64cwb-olisa-yiyxi-pvmhv-vziwe-pae";
// createCanisters(yourPrincpal);
