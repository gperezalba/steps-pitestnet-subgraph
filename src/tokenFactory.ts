import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import { TokenCreated } from "../generated/TokenFactory/TokenFactory"
import { Token } from "../generated/schema"

import { Token as TokenContract } from "../generated/templates/Token/Token"

export function handleTokenCreated(event: TokenCreated): void {
    addToken(event.params._address);
}

function addToken(tokenAddress: Address): void {
    let token = Token.load(tokenAddress.toHexString());

    if (token == null) {
        token = new Token(tokenAddress.toHexString());
        let contract = TokenContract.bind(tokenAddress);
    
        token.tokenSymbol = contract.symbol();
        token.tokenName = contract.name();
        token.tokenDecimals = contract.decimals();
        token.totalSupply = contract.totalSupply().toBigDecimal();

        TokenContract.create(tokenAddress);
    }

    token.save();
}