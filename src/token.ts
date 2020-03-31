import { Address, BigDecimal, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/templates/Token/Token"
import { NewToken, NewHolders } from "../generated/AddToken/AddToken"

import { 
    Transaction,
    Token,
    TokenBalance, 
    Wallet
} from "../generated/schema"

import { Token as TokenContract } from "../generated/templates/Token/Token"

export function handleNewToken(event: NewToken): void {
    addToken(event.params.tokenAddress)
}

function addToken(tokenAddress: Address): void {
    let token = Token.load(tokenAddress.toString());

    if (token == null) {
        token = new Token(tokenAddress.toString());
        let contract = TokenContract.bind(tokenAddress);
    
        token.tokenSymbol = contract.symbol();
        token.tokenName = contract.name();
        token.tokenDecimals = contract.decimals();
        token.totalSupply = contract.totalSupply().toBigDecimal();
    
        token.save();
    } 
}