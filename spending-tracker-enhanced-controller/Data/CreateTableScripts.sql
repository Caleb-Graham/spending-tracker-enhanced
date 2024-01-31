-- User Table
CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Category Table
CREATE TABLE "Category" (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL
);

-- Expense Table
CREATE TABLE "Expense" (
    expense_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    category_id INT REFERENCES "Category"(category_id),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL
);

-- Income Table
CREATE TABLE "Income" (
    income_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    category_id INT REFERENCES "Category"(category_id),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL
);

-- Account Table
CREATE TABLE "Account" (
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
);

-- NetWorth Table
CREATE TABLE "NetWorth" (
    net_worth_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id),
    date DATE NOT NULL,
    total_assets DECIMAL(10, 2) NOT NULL,
    total_liabilities DECIMAL(10, 2) NOT NULL
);
