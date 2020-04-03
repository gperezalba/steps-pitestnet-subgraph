import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import { TokenCreated, NewHolders } from "../generated/TokenFactory/TokenFactory"
import { Token } from "../generated/schema"

import { Token as TokenContract } from "../generated/templates/Token/Token"
import { Token as TokenTemplate } from "../generated/templates"

import { addTokenHolder, updateTokenBalance } from "./token"

export function handleTokenCreated(event: TokenCreated): void {
    addToken(event.params._address);
}

export function addToken(tokenAddress: Address): void {
    let token = Token.load(tokenAddress.toHexString());

    if (token == null) {
        token = new Token(tokenAddress.toHexString());
        let contract = TokenContract.bind(tokenAddress);
    
        token.tokenSymbol = contract.symbol();
        token.tokenName = contract.name();
        token.tokenDecimals = contract.decimals();
        token.totalSupply = contract.totalSupply().toBigDecimal();
        token.holders = [];

        TokenTemplate.create(tokenAddress);
    }

    token.save();
}

export function handleNewHolders(event: NewHolders): void {
    addToken(event.params.tokenAddress);

    let holders = event.params.holders;

    for (let i = 0; i < event.params.holders.length; i++) {
        addTokenHolder(event.params.tokenAddress.toHexString(), holders[i].toHexString());
        updateTokenBalance(event.params.tokenAddress, holders[i].toHexString());
    }
}