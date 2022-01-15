import { createLedgerCanister } from "./canisters/ledger";
import { createCmcCanister } from "./canisters/cmc";
import { createGonvernanceCanister } from "./canisters/gonvernance";
createLedgerCanister();
//createGonvernanceCanister();
createCmcCanister();