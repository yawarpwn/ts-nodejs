DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id       TEXT PRIMARY KEY
                  NOT NULL,
    email    TEXT NOT NULL,
    password TEXT NOT NULL
);-- Products

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    id        TEXT      PRIMARY KEY
                        NOT NULL,
    title     TEXT      NOT NULL,
    price     INT       NOT NULL,
    cost      INT       NOT NULL,
    create_at TEXT      DEFAULT CURRENT_TIMESTAMP
                        NOT NULL,
    update_at TIMESTAMP
);-- Comments

DROP TABLE IF EXISTS comments;

CREATE TABLE IF NOT EXISTS comments (
    id         TEXT PRIMARY KEY
                    NOT NULL,
    comment    TEXT NOT NULL,
    product_id TEXT NOT NULL,
    create_at  TEXT DEFAULT CURRENT_TIMESTAMP
                    NOT NULL,
    FOREIGN KEY (
        product_id
    )
    REFERENCES products (id) ON UPDATE NO ACTION
                             ON DELETE CASCADE
);
