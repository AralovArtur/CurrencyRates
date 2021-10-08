CREATE TABLE custom_user (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name varchar(255),
    username varchar(255),
    email varchar(255),
    password varchar(255)
);