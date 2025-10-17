As part of day-22 hands-on i created library database in mysql in which i created books,authors and members table established relationships between them,and used select,update,delete commands for retrieving,updating,and deleting data respectively.

Book => Author : one-many relationship
Book => Member : one-many relationship

CREATE DATABASE library;

\c library;

CREATE TABLE Authors (
author_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
country VARCHAR(100)
);

INSERT INTO Authors (name, country) VALUES
('J.K. Rowling', 'United Kingdom'),
('George R.R. Martin', 'United States'),
('Agatha Christie', 'United Kingdom'),
('Chetan Bhagat', 'India');

SELECT \* FROM Authors;

UPDATE Authors
SET country = 'England'
WHERE author_id = 1;

SELECT \* FROM Authors;

DELETE FROM Authors
WHERE author_id = 4;

SELECT \* FROM Authors;

CREATE TABLE Members (
member_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE,
join_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO Members (name, email, join_date) VALUES
('Alice Johnson', 'alice@example.com', '2024-03-15'),
('Bob Smith', 'bob@example.com', '2024-05-10'),
('Charlie Brown', 'charlie@example.com', '2024-06-01'),
('Diana White', 'diana@example.com', '2024-08-20');

SELECT \* FROM Members;

UPDATE Members
SET email = 'alice.johnson@example.com'
WHERE member_id = 1;

SELECT \* FROM Members;

DELETE FROM Members
WHERE member_id = 3;

SELECT \* FROM Members;

CREATE TABLE Books (
book_id SERIAL PRIMARY KEY,
title VARCHAR(150) NOT NULL,
genre VARCHAR(50),
published_year INT,
author_id INT REFERENCES Authors(author_id),
member_id INT REFERENCES Members(member_id)
);

INSERT INTO Books (title, genre, published_year, author_id, member_id) VALUES
('Harry Potter and the Sorcerer''s Stone', 'Fantasy', 1997, 1, 1),
('A Game of Thrones', 'Fantasy', 1996, 2, 2),
('Murder on the Orient Express', 'Mystery', 1934, 3, NULL),
('Five Point Someone', 'Fiction', 2004, 4, 3);

SELECT \* FROM Books;

UPDATE Books
SET genre = 'Adventure'
WHERE book_id = 1;

SELECT \* FROM Books;

DELETE FROM Books
WHERE book_id = 4;

SELECT \* FROM Books;
