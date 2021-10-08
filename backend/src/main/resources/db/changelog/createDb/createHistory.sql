CREATE TABLE history (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    currency_from varchar(255),
    currency_to varchar(255),
    time_uploaded date,
    user_id BIGSERIAL NOT NULL
);