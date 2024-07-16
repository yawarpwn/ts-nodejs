DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id int PRIMARY KEY NOT NULL,
    name text NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    id text PRIMARY KEY NOT NULL,
    comment text NOT NULL, -- noqa: L029
    product_id text NOT NULL,
    create_at text DEFAULT current_timestamp NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (
        id
    ) ON UPDATE NO ACTION ON DELETE CASCADE
);
--> statement-breakpoint
DROP TABLE IF EXISTS images;
CREATE TABLE images (
    id text PRIMARY KEY NOT NULL,
    url text NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    thumb text NOT NULL,
    large text NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    format text NOT NULL,
    publid_id text NOT NULL,
    product_id text NOT NULL,
    create_at text DEFAULT current_timestamp NOT NULL,
    updated_at integer,
    FOREIGN KEY (product_id) REFERENCES products (
        id
    ) ON UPDATE NO ACTION ON DELETE CASCADE
);
--> statement-breakpoint
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id text PRIMARY KEY NOT NULL,
    title text NOT NULL,
    price integer NOT NULL,
    cost integer NOT NULL,
    details text NOT NULL,
    ranking integer NOT NULL,
    slug text NOT NULL,
    features text,
    category_id text NOT NULL,
    create_at text DEFAULT current_timestamp NOT NULL,
    updated_at integer,
    FOREIGN KEY (category_id) REFERENCES categories (
        id
    ) ON UPDATE NO ACTION ON DELETE NO ACTION
);
--> statement-breakpoint
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id integer PRIMARY KEY,
    email text NOT NULL,
    password text NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS videos;
CREATE TABLE videos (
    id text PRIMARY KEY NOT NULL,
    url text NOT NULL,
    cover text NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    format text NOT NULL,
    publid_id text NOT NULL,
    product_id text NOT NULL,
    create_at text DEFAULT current_timestamp NOT NULL,
    updated_at integer,
    FOREIGN KEY (product_id) REFERENCES products (
        id
    ) ON UPDATE NO ACTION ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX users_email_unique ON users (email);


INSERT INTO categories (id, name) VALUES (1, 'Juguetes');
INSERT INTO categories (id, name) VALUES (2, 'Tecnología');
INSERT INTO users (
    id, email, password
) VALUES (1, 'neyda.mili11@gmail.com', 'Ns071020');

INSERT INTO products (id, title, slug, price, cost, ranking, details, features, category_id)
VALUES (
    '1',
    'Juguetes de ejemplo',
    'slug-product-name',
    12,
    10,
    5,
    '{"marca": "Kakahuate", "Procedencia": "China"}',
    '["Juguete muy gozuno", "Juguete muy bueno", Yo creo que me lo compro]',
    '1'
);

INSERT INTO images (
    id,
    url,
    thumb,
    large,
    width,
    height,
    title,
    type,
    format,
    publid_id,
    product_id
) VALUES (
    '1',
    'https://picsum.photos/url/200/300',
    'https://picsum.photos/large-url/200/300',
    'https://picsum.photos/200/300',
    200,
    300,
    'Juguete de ejemplo',
    'image',
    'jpg',
    'publicidImage',
    '1'
);

INSERT INTO images (
    id,
    url,
    thumb,
    large,
    width,
    height,
    title,
    type,
    format,
    publid_id,
    product_id
) VALUES (
    '2',
    'https://picsum.photos/url/200/300',
    'https://picsum.photos/large-url/200/300',
    'https://picsum.photos/200/300',
    300,
    300,
    'Juguete de ejemplo 2',
    'image',
    'png',
    'publicidImage2',
    '1'
);

INSERT INTO videos (
    id,
    url,
    cover,
    title,
    type,
    format,
    publid_id,

    product_id
) VALUES (
    '1',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://picsum.photos/200/300',
    'Juguete de ejemplo',
    'video',
    'mp4',
    'publicidVideo',
    '1'
);

SELECT
    pro.id,
    pro.price,
    pro.cost,
    pro.title,
    pro.details,
    pro.features,
    cat.name AS category,
    (
        SELECT
            json_group_array(
                json_object(
                    'id', img.id,
                    'url', img.url,
                    'thumb', img.thumb,
                    'large', img.large,
                    'width', img.width,
                    'height', img.height,
                    'title', img.title,
                    'type', img.type,
                    'format', img.format,
                    'publid_id', img.publid_id,
                    'create_at', img.create_at,
                    'updated_at', img.updated_at
                )
            )
        FROM images AS img
        WHERE img.product_id = pro.id
    ) AS images
FROM products AS pro
LEFT JOIN categories AS cat ON pro.category_id = cat.id
GROUP BY pro.id;
