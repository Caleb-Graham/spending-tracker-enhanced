-- User Table
CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Category Table
CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('Income', 'Expense')) NOT NULL,
    CONSTRAINT unique_category_name_type UNIQUE (name, type)
);

-- Expense Table
CREATE TABLE expenses
(
    expense_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    category_id INT REFERENCES categories(category_id),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL
);

-- Income Table
CREATE TABLE income
(
    income_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    category_id INT REFERENCES categories(category_id),
    category_id DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL
);

-- Account Table
CREATE TABLE accounts
(
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
);

-- NetWorth Table
CREATE TABLE net_worth
(
    net_worth_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    date DATE NOT NULL,
    total_assets DECIMAL(10, 2) NOT NULL,
    total_liabilities DECIMAL(10, 2) NOT NULL
);
