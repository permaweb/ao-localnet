# ao-localnet

Run a complete [AO Computer](http://ao.computer/) testbed, locally, with Docker Compose.

## Purpose

The repo may helpful if you are doing one or more of the following:

1. Contributing to [@permaweb/ao](https://github.com/permaweb/ao).
1. Compiling `ao` modules using the `ao` [dev-cli](https://github.com/permaweb/dev-cli).
   - And you want to avoid publishing each revision onto Arweave mainnet.
1. You are developing an `ao` component (e.g. a `cu`, `mu`, or `su`).
   - And you want to swap that into a working environment.
1. You are developing Lua code that will be loaded into `aos` processes.
   - And you want to avoid bricking your `aos` processes on `ao` testnet.

## How to Run a Localnet

> [!WARNING]
> Later steps may not be fully functional

1. Clone this repo and `cd` into the root. 
1. Setup the Arweave wallets that the `ao` components will use to talk to each other:
    1. Execute `wallets/generateAll.sh` to create new wallets for everything.
        - _See [wallets/README.md](wallets/README.md) for more advanced configuration._
1. Use Docker Compose to boot up the `ao` localnet containers:
    1. Run `docker compose up --detach`
        - _(You will need to have the Docker daemon running.)_
        - _(This could take a while the first time you run it.)_
1. You will have many services now bound to ports in the 4000 range (all subject to change):
    - http://localhost:4000/ - ArLocal (Arweave gateway)
    - http://localhost:4001/ - ArDrive Web
    - http://localhost:4002/ - An `ao` `mu`
    - http://localhost:4003/ - An `ao` `su`
    - http://localhost:4004/ - An `ao` `cu`
    - http://localhost:4005/ - Turbo (Arweave uploader/bundlr)
    - http://localhost:4006/ - ScAR (Arweave block explorer)
1. Next, you will likely want to seed data into Arweave. Some options here:
    1. `cd` into the `services/arlocal/scripts` helper scripts directory.
    1. Run `npm install` to install dependencies.
    1. Run `./generate-wallet.mjs` to generate a user wallet in the currently directory.
        - _(This is logically separate from the wallets that the `ao` components use.)_
    1. Run `./mint.mjs [winston]` to give AR to your user wallet.
        - _(If omitted, the default is 1 billion winston, i.e. 1 AR)._
    1. Run `./create-drive.mjs` to use the `ardrive-core-js` lib to create a new ArDrive drive and
       root folder.
    1. Run `./mine.mjs` to mine the ArDrive transactions from the previosu step into a new block.
1. Try to boot `aos`:
    - _(There will soon be an script in this directory with which to invoke `aos`.)_

## Development Status of this Repo

> [!NOTE]
> Approximately 80-90% operational, as the `ao` components are running, but not playing nicely with
each other yet.

- ✅ ArLocal instance mocking Arweave and acting as Arweave gateway
  - ℹ️ There are some features missing from [the upstream](https://github.com/textury/arlocal)
    that tend to be used by block explorers, so we are using
    [this fork](https://github.com/MichaelBuhler/arlocal), which fixes:
    - ✅ Getting pending transactions via `GET /tx/pending` route
    - ⬜ Blocks don't include `block_size` ([#1](https://github.com/MichaelBuhler/arlocal/issues/1))
    - ⬜ Blocks don't include `reward_addr` ([#3](https://github.com/MichaelBuhler/arlocal/issues/3))
    - ⬜ Blocks don't include `weave_size` ([#2](https://github.com/MichaelBuhler/arlocal/issues/2))
- ✅ Arweave block explorer (web interface)
  - ✅ ScAR - A lightweight option from [here](https://github.com/renzholy/scar),
    forked [here](https://github.com/MichaelBuhler/scar) with improvements.
  - ⬜ ArweaveWebWallet - Another option from [here](https://github.com/jfbeats/ArweaveWebWallet)
    which powers https://arweave.app/.
- ⚠️ Fully functional ArDrive Web (web interface)
  - ℹ️ Two minor issues remaining:
    - ⏳ Waiting on [this issue](https://github.com/ardriveapp/arweave-dart/issues/59), which causes ArDrive
      Web to makes calls the Arweave gateway on the wrong port.
    - ⚠️ ArDrive Web is using so-called "sandboxed urls" where it contacts the gateway on a subdomain that is
      the base32 encoded transaction id of the Arweave transaction.
      - _This can be mitigated by adding `127.0.0.1 *.localhost` to your `/etc/hosts` file._
- ⚠️ Fully functional `ao` computer, using the
  [reference implementations](https://github.com/permaweb/ao/servers).
  - `cu`
    - ✅ Builds and boots.
  - `mu`
    - ✅ Builds and boots.
    - ❌ Returns a 500 error when launching `aos` process. _Error: ao-mu:POST_root Failed to send the
      DataItem TypeError: f is not a function_
  - `su`
    - ✅ Builds and boots.
- ⚠️ Successfully launching `aos` processes on the `ao` localnet
  - ℹ️ Some of this code is not committed yet, but I currently have an error in the `mu` when
    launching `aos` -@MichaelBuhler
- ⬜ nginx reverse proxy, for hostname routing
- ⬜ DNS routing
  - ℹ️ A containers should be reachable via `*.ao-localnet.xyz` domain names.