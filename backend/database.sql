CREATE DATABASE main_database;

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY UNIQUE,
    author varchar(128),
    content varchar(255),
    publication_date varchar(64),
    video_name varchar(128)
);

CREATE TABLE videos(
    video_id SERIAL PRIMARY KEY UNIQUE,
    name varchar(80), --uuid of the video
    thumbnail varchar(80), --name of the thumbnail
    title varchar(80), -- title of the video
    uploader_pubkey varchar(128), -- uploader is the id of a pubkey
    description varchar(255), -- video description
    publication_date varchar(64),
    -- has comments
    views int, -- number of views of the video
    tips int, -- number of tips of the videos
    tips_amount int, -- total tips accumulated by the video
    purchases int, -- number of purchases for the video
    purchases_amount int, -- total purchases for the video
    price int -- price of purchase of the video
);

CREATE TABLE pubkeys(
    pubkey_id SERIAL PRIMARY KEY,
    pubkey varchar(128) UNIQUE,
    token varchar (128),
    videos varchar(128)[]
    -- has videos
);

CREATE TABLE tips(
    tip_id SERIAL PRIMARY KEY,
    tipper varchar(128),
    tips_amount int,
    paid_out boolean,
    video_name varchar(128)
);

CREATE TABLE purchases(
    purchase_id SERIAL PRIMARY KEY,
    purchaser varchar(128),
    purchase_amount int,
    video_name varchar(128)
);

-- Add Created and Updated at in all DB;