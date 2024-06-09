-- Create the database
CREATE DATABASE project_swp;
USE project_swp;

-- Create the tables
CREATE TABLE location (
    id_location VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE yacht_type (
    id_yacht_type VARCHAR(255) PRIMARY KEY,
    star_ranking INTEGER
);

CREATE TABLE yacht (
    id_yacht VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    launch DATE,
    hull_body VARCHAR(255),
    description TEXT,
    rule TEXT,
    itinerary VARCHAR(255),
    id_yacht_type VARCHAR(255),
    id_company VARCHAR(255),
    id_location VARCHAR(255),
    FOREIGN KEY (id_yacht_type) REFERENCES yacht_type(id_yacht_type),
    FOREIGN KEY (id_company) REFERENCES company(id_company),
    FOREIGN KEY (id_location) REFERENCES location(id_location)
);

CREATE TABLE room_type (
    id_room_type VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255),
    price DECIMAL
);

CREATE TABLE room (
    id_room VARCHAR(255) PRIMARY KEY,
    area DECIMAL,
    description TEXT,
    name VARCHAR(255),
    id_room_type VARCHAR(255),
    id_yacht VARCHAR(255),
    FOREIGN KEY (id_room_type) REFERENCES room_type(id_room_type),
    FOREIGN KEY (id_yacht) REFERENCES yacht(id_yacht)
);

CREATE TABLE service (
    id_room_service VARCHAR(255) PRIMARY KEY,
    service VARCHAR(255),
    price DECIMAL,
    utilities VARCHAR(255)
);

CREATE TABLE yacht_service (
    id_service VARCHAR(255),
    id_yacht VARCHAR(255),
    PRIMARY KEY (id_service, id_yacht),
    FOREIGN KEY (id_service) REFERENCES service(id_room_service),
    FOREIGN KEY (id_yacht) REFERENCES yacht(id_yacht)
);

CREATE TABLE room_image (
    id_room_image VARCHAR(255) PRIMARY KEY,
    image_room VARCHAR(255),
    id_room VARCHAR(255),
    FOREIGN KEY (id_room) REFERENCES room(id_room)
);

CREATE TABLE yacht_image (
    id_yacht_image VARCHAR(255) PRIMARY KEY,
    image_yacht VARCHAR(255),
    id_yacht VARCHAR(255),
    FOREIGN KEY (id_yacht) REFERENCES yacht(id_yacht)
);

CREATE TABLE account (
    id_account VARCHAR(255) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(50),
    role VARCHAR(10)
);
alter table account modify password VARCHAR(255)

CREATE TABLE company (
    id_company VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    logo VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    exist INTEGER,
    account_id VARCHAR(255) UNIQUE,
    FOREIGN KEY (account_id) REFERENCES account(id_account)
);

CREATE TABLE customer (
    id_customer VARCHAR(255) PRIMARY KEY,
    full_name NVARCHAR(50),
    email VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    address VARCHAR(255),
    id_account VARCHAR(255) UNIQUE,
    id_wallet_customer VARCHAR(255) UNIQUE,
    FOREIGN KEY (id_account) REFERENCES account(id_account),
    FOREIGN KEY (id_wallet_customer) REFERENCES wallet(id_wallet)
);

CREATE TABLE wallet (
    id_wallet VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    bank_number VARCHAR(20),
    balance DECIMAL
);

CREATE TABLE schedule (
    id_schedule VARCHAR(255) PRIMARY KEY,
    start_date DATETIME,
    end_date DATETIME
);

CREATE TABLE yacht_schedule (
    id_yacht VARCHAR(255),
    id_schedule VARCHAR(255),
    PRIMARY KEY (id_yacht, id_schedule),
    FOREIGN KEY (id_yacht) REFERENCES yacht(id_yacht),
    FOREIGN KEY (id_schedule) REFERENCES schedule(id_schedule)
);

CREATE TABLE booking_room (
    id_room VARCHAR(255),
    id_booking VARCHAR(255),
    PRIMARY KEY (id_room, id_booking),
    FOREIGN KEY (id_room) REFERENCES room(id_room),
    FOREIGN KEY (id_booking) REFERENCES booking_order(id_booking)
);

CREATE TABLE booking_order (
    id_booking VARCHAR(255) PRIMARY KEY,
    booking_time DATETIME,
    amount DECIMAL,
    requirement TEXT,
    status VARCHAR(255),
    id_schedule VARCHAR(255),
    id_customer VARCHAR(255),
    FOREIGN KEY (id_schedule) REFERENCES schedule(id_schedule),
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
);

CREATE TABLE feedback (
    id_feedback VARCHAR(255) PRIMARY KEY,
    star_rating INT,
    description TEXT,
    id_booking VARCHAR(255) UNIQUE,
    id_customer VARCHAR(255),
    id_yacht VARCHAR(255),
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer),
    FOREIGN KEY (id_yacht) REFERENCES yacht(id_yacht)
);

CREATE TABLE transaction (
    id_transaction VARCHAR(255) PRIMARY KEY,
    amount DECIMAL,
    transaction_date DATETIME,
    status VARCHAR(255),
    id_receiver VARCHAR(255),
    id_wallet_sender VARCHAR(255),
    id_booking VARCHAR(255),
    FOREIGN KEY (id_booking) REFERENCES booking_order(id_booking),
    FOREIGN KEY (id_wallet_sender) REFERENCES wallet(id_wallet)
);

CREATE TABLE bill (
    id_bill VARCHAR(255) PRIMARY KEY,
    amount DECIMAL,
    transaction_date DATETIME,
    id_transaction VARCHAR(255),
    FOREIGN KEY (id_transaction) REFERENCES transaction(id_transaction)
);





-- Add the column exist to the yacht table
ALTER TABLE yacht 
ADD COLUMN exist INTEGER

-- Modify the id_booking column to be unique
ALTER TABLE `transaction` 
ADD UNIQUE (id_booking);

-- Drop the columns amount and transaction_date from the bill table
ALTER TABLE bill 
DROP COLUMN amount, 
DROP COLUMN transaction_date;

-- Add the id_booking column as a unique foreign key
ALTER TABLE bill 
ADD id_booking VARCHAR(255) UNIQUE,
ADD CONSTRAINT fk_id_booking FOREIGN KEY (id_booking) REFERENCES booking_order(id_booking);






