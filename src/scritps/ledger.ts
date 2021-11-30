import { Principal } from "@dfinity/principal";
import { exec } from "shelljs";
import { convert } from "./utils";

const buildLedger = () => {
  exec("dfx canister --no-wallet create ledger");
};
// a funcation to remove \n from string
const removeNewLine = (str: string) => {
  return str.replace(/(\r\n|\n|\r)/gm, "");
};
const installLedger = () => {
  const getLedgerIdRes = exec("dfx canister --no-wallet id ledger");
  const ledgerId = removeNewLine(getLedgerIdRes.stdout);
  const getDfxPricipalRes = exec("dfx identity  get-principal");
  const dfxPricipal = Principal.fromText(
    removeNewLine(getDfxPricipalRes.stdout)
  );
  const dfxAccount = convert.principalToAccountID(dfxPricipal);
  // exec dfx install-canister --no-wallet ledger
  const installCode = `echo yes | dfx canister --no-wallet  install ledger --argument '(record { 
    send_whitelist = null;
    minting_account = "${dfxAccount}"; 
    transaction_window = opt record { secs = ${2 * 1024 * 1024} :nat64; nanos = 0:nat32}; 
    max_message_size_bytes = opt ${2 * 1024 * 1024} : opt nat64;  
    archive_options = opt record { 
        trigger_threshold = 12 : nat64; 
        num_blocks_to_archive = 12 : nat64; 
        node_max_memory_size_bytes =opt ${512 * 128} : opt nat64; 
        max_message_size_bytes =opt ${2 * 1024 * 1024} : opt nat64; 
        controller_id = principal "${dfxPricipal.toText()}"; 
      }; 
    initial_values = vec { record { "${dfxAccount}"; record { e8s = 10000000000 : nat64; } } }; 
 })'  --mode reinstall`;
  console.log(installCode);
  exec(installCode);
};

const createLedgerCanister = () => {
  buildLedger();
  installLedger();
};

export { buildLedger, installLedger, createLedgerCanister }; 