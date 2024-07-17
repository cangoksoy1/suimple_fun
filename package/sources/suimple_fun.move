
// suimple_fun.move

module address::suimple_fun {
    use std::error;
    use std::event;
    use std::signer;
    use std::vector;

    struct Token has copy, drop, store {
        id: u64,
        name: vector<u8>,
        description: vector<u8>,
    }

    public fun create_token(
        account: &signer,
        id: u64,
        name: vector<u8>,
        description: vector<u8>
    ): Token {
        event::emit_event(
            account,
            TokenCreated {
                id,
                name: name.clone(),
                description: description.clone(),
            }
        );
        Token { id, name, description }
    }

    public fun buy_token(account: &signer, token_id: u64) {
        event::emit_event(
            account,
            TokenBought { token_id }
        );
    }

    public fun sell_token(account: &signer, token_id: u64) {
        event::emit_event(
            account,
            TokenSold { token_id }
        );
    }

    struct TokenCreated has drop, store {
        id: u64,
        name: vector<u8>,
        description: vector<u8>,
    }

    struct TokenBought has drop, store {
        token_id: u64,
    }

    struct TokenSold has drop, store {
        token_id: u64,
    }
}
