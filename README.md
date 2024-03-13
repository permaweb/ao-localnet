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
    1. Run `./generate-wallet.mjs` to generate a user wallet in the currently directory
        1. _(This is logically separate from the wallets that the `ao` components use.)_
    1. Run `./mint.mjs [winston]` to give AR to your user wallet.
        1. _(If omitted, the default is 1 billion winston, i.e. 1 AR)._
    1. Run `./create-drive.mjs` to use the `ardrive-core-js` lib to create a new ArDrive drive and
       root folder.
    1. Run `./mine.mjs` to mine the ArDrive transactions from the previosu step into a new block.
1. Try to boot `aos`:
    1. (There will soon be an `aos` script in this directory to invoke `aos` with )

## Development Status of this Repo

Approximately 80-90% operational, as the `ao` components are running, but not playing nicely with
each other yet.

- [x] ArLocal instance mocking ArWeave and acting as ArWeave gateway
  - There are some features missing from ArLocal that tend to be used by block explorers,
    so we may want to fork it:
    - Getting pending transactions via `GET /tx/pending` route
    - Blocks don't include `block_size`
    - Blocks don't include `reward_addr`
    - Blocks don't include `weave_size`
- [ ] ArWeave block explorer (web interface)
  - There is a lightweight option called ScAR, from [here](https://github.com/renzholy/scar),
    forked [here](https://github.com/MichaelBuhler/scar) with improvements.
  - Another option is [ArweaveWebWallet](https://github.com/jfbeats/ArweaveWebWallet) which
    powers https://arweave.app/
- [ ] Fully functional ArDrive Web (web interface)
  - It appears the 
- [x] `ao` components: `cu`, `mu`, `su`
- [ ] Successfully launching `aos` processes on `ao`
  - Some of this code is not committed yet, but I currently have an error in the `mu` when
    launching `aos` -@MichaelBuhler
- [ ] nginx reverse proxy, for hostname routing
- [ ] DNS routing
  - A containers should be reachable via `*.ao-localnet.xyz` domain names.