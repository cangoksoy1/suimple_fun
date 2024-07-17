module suimple_fun::suimple_fun_events {

    // === Imports ===

    use sui::event::emit;
    use sui::tx_context::TxContext;
    use sui::object::UID;
    use std::type_name::TypeName;
    use sui::address::address;

    // === Events ===

    public event NewFunPool {
        pool_id: address,
        coin_x: TypeName,
        coin_y: TypeName,
        balance_x: u64,
        balance_y: u64,
        liquidity_x: u64,
        liquidity_y: u64,
        is_x_virtual: bool,
        witness: TypeName
    }

    public event Swap {
        pool_id: address,
        coin_in: TypeName,
        coin_out: TypeName,
        amount_in: u64,
        amount_out: u64,
        fee: u64
    }

    public event ReadyForMigration {
        pool_id: address,
        coin_x: TypeName,
        coin_y: TypeName,
        witness: TypeName
    }

    public event Migrated {
        pool_id: address,
        coin_x: TypeName,
        coin_y: TypeName,
        balance_x: u64,
        balance_y: u64,
        admin_balance_x: u64,
        admin_balance_y: u64,
        witness: TypeName
    }

    // === Public Functions ===

    public fun new_fun_pool(
        pool_id: address,
        coin_x: TypeName,
        coin_y: TypeName,
        balance_x: u64,
        balance_y: u64,
        liquidity_x: u64,
        liquidity_y: u64,
        is_x_virtual: bool,
        witness: TypeName,
        ctx: &TxContext
    ) {
        emit NewFunPool {
            pool_id,
            coin_x,
            coin_y,
            balance_x,
            balance_y,
            liquidity_x,
            liquidity_y,
            is_x_virtual,
            witness
        };
    }

    public fun swap(
        pool_id: address,
        coin_in: TypeName,
        coin_out: TypeName,
        amount_in: u64,
        amount_out: u64,
        fee: u64,
        ctx: &TxContext
    ) {
        emit Swap {
            pool_id,
            coin_in,
            coin_out,
            amount_in,
            amount_out,
            fee
        };
    }

    public fun ready_for_migration(
        pool_id: address,
        coin_x: TypeName,
        coin_y: TypeName,
        witness: TypeName,
        ctx: &TxContext
    ) {
        emit ReadyForMigration {
            pool_id,
            coin_x,
            coin_y,
            witness
        };
    }

    public fun migrated(
        pool_id: address,
        coin_x: TypeName,
        coin_y: TypeName,
        balance_x: u64,
        balance_y: u64,
        admin_balance_x: u64,
        admin_balance_y: u64,
        witness: TypeName,
        ctx: &TxContext
    ) {
        emit Migrated {
            pool_id,
            coin_x,
            coin_y,
            balance_x,
            balance_y,
            admin_balance_x,
            admin_balance_y,
            witness
        };
    }
}
