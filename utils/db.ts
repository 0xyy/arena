import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_my_warrior_arena',
    namedPlaceholders: true,
    decimalNumbers: true,
});