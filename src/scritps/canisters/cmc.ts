import { Principal } from "@dfinity/principal";
import { exec } from "shelljs";
import { convert, purify } from "../utils";

const create = () => {
  exec("dfx canister --no-wallet create ledger");
};

const install = () => {
  const getLedgerIdRes = exec("dfx canister --no-wallet id ledger");
  const ledgerId = purify(getLedgerIdRes.stdout);
  // get gonvernance id
  const getGonvernanceIdRes = exec("dfx canister --no-wallet id gonvernance");
  const gonvernanceId = purify(getGonvernanceIdRes.stdout);
  const getDfxPricipalRes = exec("dfx identity  get-principal");
  const dfxPricipal = Principal.fromText(purify(getDfxPricipalRes.stdout));
  const dfxAccount = convert.principalToAccountID(dfxPricipal);
  const installCode = `echo yes | dfx canister --no-wallet  install cmc --argument '(record { 
    ledger_canister_id = principal "${ledgerId}";
    governance_canister_id = principal "${gonvernanceId}"; 
    minting_account_id =  principal "${dfxAccount}";
 })'  --mode reinstall`;
  exec(installCode);
};

const createCmcCanister = () => {
  create();
  install();
};

export { createCmcCanister };
