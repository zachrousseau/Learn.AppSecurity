CREATE TABLE IF NOT EXISTS client (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)

INSERT INTO client (username, password) VALUES 
    ('azura', 'urqueen'),
    ('hircine', 'wolfman22'),
    ('sheogorath', 'cheeeese'),
    ('talos', 'dragonborn4eva');

SELECT * FROM  client;