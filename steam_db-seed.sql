INSERT INTO users (
        username, 
        password, 
        first_name, 
        last_name, 
        email, 
        is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'user@testuser.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin',
        'admin@testadmin.com',
        TRUE),
        ('matthewmng',
        'admin',
        'Matthew',
        'Ng',
        'matthewmng@yahoo.com',
        TRUE);