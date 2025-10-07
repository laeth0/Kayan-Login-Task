CREATE TABLE IF NOT EXISTS company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '3 months'
);

CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    companyId INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_company FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_employee_username ON employee(username);
INSERT INTO company (name, country, city, active)
VALUES ('Tech Solutions Inc', 'USA', 'New York', TRUE);
INSERT INTO employee (name, companyId, username, password, active)
VALUES (
        'John Doe',
        1,
        'john.doe',
        '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36YKeH9gp7Uy7L9S.5BnGdG',
        TRUE
    );