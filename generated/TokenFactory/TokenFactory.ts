// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class TokenCreated extends EthereumEvent {
  get params(): TokenCreated__Params {
    return new TokenCreated__Params(this);
  }
}

export class TokenCreated__Params {
  _event: TokenCreated;

  constructor(event: TokenCreated) {
    this._event = event;
  }

  get _address(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[2].value.toString();
  }

  get owner(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get initialSupply(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class TokenFactory extends SmartContract {
  static bind(address: Address): TokenFactory {
    return new TokenFactory("TokenFactory", address);
  }

  createToken(
    name: string,
    symbol: string,
    initialSupply: BigInt,
    _owner: Address
  ): Address {
    let result = super.call("createToken", [
      EthereumValue.fromString(name),
      EthereumValue.fromString(symbol),
      EthereumValue.fromUnsignedBigInt(initialSupply),
      EthereumValue.fromAddress(_owner)
    ]);

    return result[0].toAddress();
  }

  try_createToken(
    name: string,
    symbol: string,
    initialSupply: BigInt,
    _owner: Address
  ): CallResult<Address> {
    let result = super.tryCall("createToken", [
      EthereumValue.fromString(name),
      EthereumValue.fromString(symbol),
      EthereumValue.fromUnsignedBigInt(initialSupply),
      EthereumValue.fromAddress(_owner)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  reservedSymbol(param0: Bytes): boolean {
    let result = super.call("reservedSymbol", [
      EthereumValue.fromFixedBytes(param0)
    ]);

    return result[0].toBoolean();
  }

  try_reservedSymbol(param0: Bytes): CallResult<boolean> {
    let result = super.tryCall("reservedSymbol", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }
}

export class CreateTokenCall extends EthereumCall {
  get inputs(): CreateTokenCall__Inputs {
    return new CreateTokenCall__Inputs(this);
  }

  get outputs(): CreateTokenCall__Outputs {
    return new CreateTokenCall__Outputs(this);
  }
}

export class CreateTokenCall__Inputs {
  _call: CreateTokenCall;

  constructor(call: CreateTokenCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get initialSupply(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _owner(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class CreateTokenCall__Outputs {
  _call: CreateTokenCall;

  constructor(call: CreateTokenCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class ConstructorCall extends EthereumCall {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
