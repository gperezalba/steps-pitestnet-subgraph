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
    addToken(event.params.tokenAddress, event)
}

function addToken(tokenAddress: Address, event: NewToken): void {
    //let token = Token.load(tokenAddress.toHexString());

    //if (token == null) {
        let token = new Token(tokenAddress.toHexString());
        /*let contract = TokenContract.bind(tokenAddress);
    
        token.tokenSymbol = contract.symbol();
        token.tokenName = contract.name();
        token.tokenDecimals = contract.decimals();
        token.totalSupply = contract.totalSupply().toBigDecimal();*/

        token.tokenSymbol = event.params.symbol;
        token.tokenName = event.params.name;
        //token.tokenDecimals = contract.decimals();
        //token.totalSupply = contract.totalSupply().toBigDecimal();
    
        token.save();
    //} 
}