import { Principal } from "@dfinity/principal";
import { exec } from "shelljs";
import { convert, purify } from "../utils";
import { ic_nns_governance } from "../proto/port";
import { loadProto } from "../proto/index";

const create = () => {
  exec("dfx canister --no-wallet create gonvernance");
};

const install = () => {
  const getDfxPricipalRes = exec("dfx identity  get-principal");
  const dfxPricipal = Principal.fromText(purify(getDfxPricipalRes.stdout));
  const toSubAccount = convert.principalToSubAccount(dfxPricipal);
  const dfxAccount = convert.principalToAccountID(dfxPricipal);
  const root = loadProto();
  const Governance = root.lookupType("ic_nns_governance.pb.v1.Governance");

  const gov = Governance.create({
    default_followees: [[2, { followees: [1] }]],
    wait_for_quiet_threshold_seconds: 24 * 60 * 60,
    short_voting_period_seconds : 60 * 60 * 24 * 7,
    metrics: null,
    node_providers: [{ id: dfxPricipal, reward_account: dfxAccount }],
    economics: {
      neuron_minimum_stake_e8s: 1,
      max_proposals_to_keep_per_topic: 10,
      neuron_management_fee_per_proposal_e8s: 1,
      transaction_fee_e8s: 1,
      neuron_spawn_dissolve_delay_seconds: 1,
      minimum_icp_xdr_rate: 1,
      maximum_node_provider_rewards_e8s: 1,
    },
    latest_reward_event: null,
    to_claim_transfers: [
      {
        to_subaccount: toSubAccount,
      },
    ],
    proposals: [
      [
        1,
        {
          id: { id: 1 },
          failure_reason: null,
          ballots: [{ vote: 10, voting_power: 1 }],
          proposal_timestamp_seconds: 1,
          reward_event_round: 1,
          failed_timestamp_seconds: 1,
          reject_cost_e8s: 1,
          latest_tally: null,
          decided_timestamp_seconds: 1,
          proposal: null,
          proposer: null,
          executed_timestamp_seconds: 1,
        },
      ],
    ],
    in_flight_commands: [[1, { command: 1, timestamp: 1 }]],
    neurons: [
      [
        1,
        {
          id: { id: 1 },
          controller: dfxPricipal,
          recent_ballots: [{ vote: 10, proposal_id: null }],
          kyc_verified: true,
          not_for_profit: true,
          maturity_e8s_equivalent: 1,
          cached_neuron_stake_e8s: 1,
          created_timestamp_seconds: 1,
          aging_since_timestamp_seconds: 1,
          hot_keys: [dfxPricipal],
          account: toSubAccount,
          joined_community_fund_timestamp_seconds: null,
          dissolve_state: { DissolveDelaySeconds: 1 },
          followees: [[2, { followees: [1] }]],
          neuron_fees_e8s: 1,
          transfer: null,
        },
      ],
    ],
    genesis_timestamp_seconds: 1,
  });

  const pbData = Governance.encode(gov).finish();
  const toNatArrayStr = (arr: Uint8Array) => {
    const numArr = Array.from(arr);
    return numArr
      .map((item) => {
        return `${item} : nat8`;
      })
      .join(";");
  };
  //   const defaultFollowees = `vec {record { 2 : int32 ; record { followees = vec {record { id = 1 :nat64 } } } } }`;
  //   const economics = `opt record {
  //     neuron_minimum_stake_e8s = 1 : nat64 ;
  //     max_proposals_to_keep_per_topic = 10 : nat64 ;
  //     neuron_management_fee_per_proposal_e8s = 1 : nat64 ;
  //     reject_cost_e8s = 1 : nat64 ;
  //     transaction_fee_e8s = 1 : nat64 ;
  //     neuron_spawn_dissolve_delay_seconds = 1 : nat64 ;
  //     minimum_icp_xdr_rate = 1 : nat64 ;
  //     maximum_node_provider_rewards_e8s = 1 : nat64 ;
  //   }`;
  //   const to_claim_transfers = `vec {record { to_subaccount = vec { ${toNatArrayStr(
  //     toSubAccount
  //   )} };
  //    neuron_stake_e8s = 1 :nat64 ;
  //    from = opt principal "${dfxPricipal}";
  //    memo = 1 : nat64;
  //    from_subaccount = vec { ${toNatArrayStr(toSubAccount)} };
  //    transfer_timestamp = 1 : nat64;
  //    block_height = 1 : nat64;
  //  } }`;
  //   const proposals = `vec { record {1 :nat64;
  //     record {
  //       id = opt record { id = 1 : nat64 };
  //       failure_reason = null ;
  //       ballots = vec {record { vote = 10 :int32; voting_power = 1 :int32} };
  //       proposal_timestamp_seconds = 1 :nat64;
  //       reward_event_round  = 1 :nat64;
  //       failed_timestamp_seconds  = 1 :nat64;
  //       reject_cost_e8s   = 1 :nat64;
  //       latest_tally = null ;
  //       decided_timestamp_seconds = 1 :nat64;
  //       proposal = null ;
  //       proposer = null;
  //       executed_timestamp_seconds = 1 :nat64;
  //     }
  //   } }`;
  //   const inFlightCommands = `vec { record {1 :nat64;
  //     record {
  //       command = null;
  //       timestamp =  1 :nat64;
  //     }
  //   } }`;
  //   const neurons = `vec { record {1 :nat64;
  //     record {
  //       id = opt record { id = 1 : nat64 };
  //       controller =  opt principal "${dfxPricipal}";
  //       recent_ballots = vec {record { vote = 10 :int32; proposal_id = null } };
  //       kyc_verified = true ;
  //       not_for_profit = true ;
  //       maturity_e8s_equivalent = 1 :nat64;
  //       cached_neuron_stake_e8s = 1 :nat64;
  //       created_timestamp_seconds = 1 :nat64;
  //       aging_since_timestamp_seconds = 1 :nat64;
  //       hot_keys = vec { principal "${dfxPricipal}" };
  //       account = vec { ${toNatArrayStr(toSubAccount)} };
  //       joined_community_fund_timestamp_seconds = null;
  //       dissolve_state = variant { DissolveDelaySeconds = 1 : nat64};
  //       followees = vec {record { 2 : int32 ; record { followees = vec {record { id = 1 :nat64 } } } } };
  //       neuron_fees_e8s = 1 :nat64;
  //       transfer = null ;
  //     } } }`;
  //   const installCode = `echo yes | dfx canister --no-wallet  install gonvernance --argument '(record {
  //       default_followees = ${defaultFollowees};
  //       wait_for_quiet_threshold_seconds =  ${24 * 60 * 60} : nat64;
  //       metrics = null ;
  //       node_providers = vec {record { id = opt principal "${dfxPricipal}";reward_account = opt "${dfxAccount}" } } ;
  //       economics = ${economics} ;
  //       latest_reward_event = null ;
  //       to_claim_transfers = ${to_claim_transfers} ;
  //       short_voting_period_seconds = ${60 * 60 * 24 * 7} : nat64;
  //       proposals = ${proposals} ;
  //       in_flight_commands = ${inFlightCommands} ;
  //       neurons = ${neurons} ;
  //       genesis_timestamp_seconds = 1 : nat64;
  //    })'  --mode reinstall`;
  console.log(pbData);
  const installCode = `echo yes | dfx canister --no-wallet  
   install gonvernance --argument '(vec { ${toNatArrayStr(
     pbData
   )} })'  --mode reinstall`;
  exec(installCode);
};

const createGonvernanceCanister = () => {
  create();
  //install();
};

export { createGonvernanceCanister };
