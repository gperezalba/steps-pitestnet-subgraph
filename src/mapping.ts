import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Contract, DeployIdentity } from "../generated/Contract/Contract"
import { ExampleEntity, Identity, Wallet } from "../generated/schema"

/*export function handleDeployIdentity(event: DeployIdentity): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.identity = event.params.identity
  entity.owner = event.params.owner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.on(...)
  // - contract.deployIdentity(...)
  // - contract.deployIdentity(...)
}*/

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
  wallet.identity = identity.id;
  identity.lastModification = event.block.timestamp;
  identity.creationTime = event.block.timestamp;

  identity.save();
  wallet.save();

  ////IdentityContract.create(event.params.identity);
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
