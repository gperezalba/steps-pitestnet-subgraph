import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import { TokenCreated } from "../generated/TokenFactory/TokenFactory"
import { TokenFactory } from "../generated/schema"

export function handleTokenCreated(event: TokenCreated): void {
    let token = TokenFactory.load(event.params._address.toHexString());

    if (token == null) {
        token = new TokenFactory(event.params._address.toHexString());
        let contract = TokenContract.bind(tokenAddress);
    
        token.tokenSymbol = contract.symbol();
        token.tokenName = contract.name();
        token.tokenDecimals = contract.decimals();
        token.totalSupply = contract.totalSupply().toBigDecimal();
    }

    token.save();
}