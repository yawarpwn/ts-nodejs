-- Users
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id text PRIMARY KEY,
    email text UNIQUE NOT NULL,
    pass text NOT NULL
);

-- Products
DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
    id text PRIMARY KEY
    NOT NULL,
    title text NOT NULL,
    price int NOT NULL,
    cost int NOT NULL,
    create_at text DEFAULT current_timestamp
    NOT NULL,
    update_at timestamp
);

-- Comments
DROP TABLE IF EXISTS comments;
CREATE TABLE IF NOT EXISTS comments (
    id text PRIMARY KEY NOT NULL,
    body text NOT NULL,
    product_id text NOT NULL,
    create_at text DEFAULT current_timestamp
    NOT NULL,
    FOREIGN KEY (
        product_id
    )
    REFERENCES products (id) ON UPDATE NO ACTION
    ON DELETE CASCADE
);
