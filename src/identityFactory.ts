import { Address } from "@graphprotocol/graph-ts"
import { DeployIdentity } from "../generated/IdentityFactory/IdentityFactory"
import { Identity, Wallet } from "../generated/schema"

export function handleDeployIdentity(event: DeployIdentity): void {
  let identityAddress = event.params.identity.toHexString();
  let identity = new Identity(identityAddress);
  loadWallet(event.params.wallet);
  let wallet = Wallet.load(event.params.wallet.toHexString());

  //initialize identity vars
  identity.dataHash = event.params.dataHash;
  identity.owner = event.params.owner;
  identity.recovery = event.params.recovery;
  identity.state = 10;
  identity.wallet = wallet.id;
  wallet.name = event.params.name;
  identity.lastModification = event.block.timestamp;
  identity.creationTime = event.block.timestamp;

  identity.save();
  wallet.save();

  //IdentityContract.create(event.params.identity);
  //WalletContract.create(event.params.wallet);
}

export function loadWallet(address: Address): Wallet {
  let wallet = Wallet.load(address.toHexString());
  
  if (wallet == null) {
      wallet = new Wallet(address.toHexString());
  }

  wallet.save();

  return wallet as Wallet;
}