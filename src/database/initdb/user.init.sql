USE users;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES 
    ('azura', 'urqueen'),
    ('hircine', 'wolfman22'),
    ('sheogorath', 'cheeeese'),
    ('talos', 'dragonborn4eva'),
    ('test_user', 'test_password');

