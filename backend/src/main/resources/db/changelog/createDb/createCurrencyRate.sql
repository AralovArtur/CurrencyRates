CREATE TABLE currency_rate (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    currency varchar(255),
    rate float,
    time_uploaded date
);