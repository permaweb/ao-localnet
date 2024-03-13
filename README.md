# ao-localnet

Run a complete [AO Computer](http://ao.computer/) testbed, locally, with Docker Compose.

## How to Run a Localnet

_NB: later steps are not fully functional_

1. Clone this repo and `cd` into the root. 
1. Setup the ArWeave wallets that the `ao` components will use to talk to each other:
    1. Execute `wallets/generateAll.sh` to create new wallets for everything.
    1. See [wallets/README.md](wallets/README.md) for more advanced configuration.
1. Use Docker Compose to boot up the `ao` localnet containers:
    1. You will need to have the Docker daemon running.
    1. Run `docker compose up --detach`
        1. _(This could take a while the first time you run it.)_
1. You will have many services now bound to ports in the 4000 range (all subject to change):
    1. http://localhost:4000/ - ArLocal (ArWeave gateway)
    1. http://localhost:4001/ - ArDrive Web
    1. http://localhost:4002/ - An `ao` `mu`
    1. http://localhost:4003/ - An `ao` `su`
    1. http://localhost:4004/ - An `ao` `cu`
    1. http://localhost:4005/ - Turbo (ArWeave uploader/bundlr)
    1. http://localhost:4006/ - ScAR (ArWeave block explorer)
1. Next, you will likely want to seed data into ArWeave. Some options here:
    1. `cd` into the `services/arlocal/scripts` helper scripts directory.
    1. Run `npm install` to install dependencies.
    1. Run `./generate-wallet.mjs` to generate a user wallet in the currently directory.
        1. _(This is logically separate from the wallets that the `ao` components use.)_
    1. Run `./mint.mjs [winston]` to give AR to your user wallet.
        1. _(If omitted, the default is 1 billion winston, i.e. 1 AR)._
    1. Run `./create-drive.mjs` to use the `ardrive-core-js` lib to create a new ArDrive drive and
       root folder.
    1. Run `./mine.mjs` to mine the ArDrive transactions from the previosu step into a new block.
1. Try to boot `aos`:
    1. _(There will soon be an script in this directory with which to invoke `aos`.)_

## Development Status of this Repo

Approximately 80-90% operational, as the `ao` components are running, but not playing nicely with
each other yet.

- ✅ ArLocal instance mocking ArWeave and acting as ArWeave gateway
  - ℹ️ There are some features missing from [the upstream](https://github.com/textury/arlocal)
    that tend to be used by block explorers, so we are using
    [this fork](https://github.com/MichaelBuhler/arlocal), which fixes:
    - ✅ Getting pending transactions via `GET /tx/pending` route
    - [ ] Blocks don't include `block_size` ([#1](https://github.com/MichaelBuhler/arlocal/issues/1))
    - [ ] Blocks don't include `reward_addr` ([#3](https://github.com/MichaelBuhler/arlocal/issues/3))
    - [ ] Blocks don't include `weave_size` ([#2](https://github.com/MichaelBuhler/arlocal/issues/2))
- ⚠️ ArWeave block explorer (web interface)
  - ✅ ScAR - A lightweight option from [here](https://github.com/renzholy/scar),
    forked [here](https://github.com/MichaelBuhler/scar) with improvements.
  - [ ] ArweaveWebWallet - Another option from [here](https://github.com/jfbeats/ArweaveWebWallet)
    which powers https://arweave.app/.
- ⚠️ Fully functional ArDrive Web (web interface)
  - ℹ️ It appears the only thing blocking this is supporting gateway edge node subdomains.
- ⚠️ Fully functional `ao` computer
  - `cu`
    - ✅ Builds and boots.
  - `mu`
    - ✅ Builds and boots.
    - ❌ Returns a 500 error when launching `aos` process.
      - _Error: ao-mu:POST_root Failed to send the DataItem TypeError: f is not a function_
  - `su`
    - ✅ Builds and boots.
- ⚠️ Successfully launching `aos` processes on the `ao` localnet
  - ℹ️ Some of this code is not committed yet, but I currently have an error in the `mu` when
    launching `aos` -@MichaelBuhler
- [ ] nginx reverse proxy, for hostname routing
- [ ] DNS routing
  -  A containers should be reachable via `*.ao-localnet.xyz` domain names.