# wallets

Arweave wallets are needed to run many of the components in this repo.
The wallets are expected to be present in this folder.

## Simple Use Case

Just run `./generateAll.sh` in this folder.

This will generate one wallet for each of the entries in the following table:

## Wallets

| Name | Filename | Purpose/Description |
| --- | --- | --- |
| ao | `ao-wallet.json` | Used by the `cu`, `mu`, and `su` node running in the localnet. |
| aos | `aos-wallet.json` | Passed into `aos`. Used as the owner of the `ao` processes launched within the localnet. |
| aos-module-publisher | `aos-module-publisher-wallet.json` | Used by a seed script to upload the `aos` WASM module into Arlocal. |
| bundler | `bundler.json` | Used by the `bundler` service to sign and pay for bundle transactions. |
| scheduler-location-publisher | `scheduler-location-publisher-wallet.json` | Used by a seed script to make an Arweave transaction with the `Scheduler-Location` tag set to the `su` URL. |
| turbo | `turbo-wallet.json` | Used by the `turbo` service to sign and pay for bundle transactions. |
| user | `user-wallet.json` | Used by assorted seed scripts for seeding data into Arlocal. |

## Advanced Use Cases

You can generate a single wallet listed in the above table, like so:

```bash
$ ./generateWallet.sh ao
$ ./generateWallet.sh aos
```

You can generate any other wallet file, like so:

```bash
$ ./generateWallet.sh my-wallet.json
$ ./generateWallet.sh > my-other-wallet.json
```

You can symlink any of the expected wallet files to share a wallet between components. For example:

```bash
$ ./generateWallet.sh > master-wallet.json
$ ln -s master-wallet.json ao-wallet.json
$ ln -s master-wallet.json aos-wallet.json
$ ln -s master-wallet.json user-wallet.json
```
