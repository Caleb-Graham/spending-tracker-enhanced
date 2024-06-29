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
    parent_category_id INT REFERENCES categories(category_id),
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
CREATE TABLE net_worth_accounts
(
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- NetWorth Table
CREATE TABLE account_balance
(
    account_balance_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES net_worth_accounts(account_id),
    date DATE NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
);
