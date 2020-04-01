import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import { TokenCreated } from "../generated/TokenFactory/TokenFactory"
import { TokenFactory } from "../generated/schema"

export function handleCreatedToken(event: TokenCreated): void {
    let token = TokenFactory.load(event.params._address.toHexString());

    if (token == null) {
        token = new TokenFactory(event.params._address.toHexString());
        token.tkName = "TK"
    }

    token.save();
}