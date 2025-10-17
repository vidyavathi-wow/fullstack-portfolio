SQL (Structured Query Language) is used to create, read, update, and delete data in a relational database.

1. Database Operations(DDL)
   Create Database
   CREATE DATABASE library;

Use Database
USE library;

Drop Database
DROP DATABASE library;

2. Table Operations (DDL)
   Create Table
   CREATE TABLE Authors (
   author_id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(100),
   country VARCHAR(100)
   );

Drop Table
DROP TABLE Authors;

Alter Table (Add Column)
ALTER TABLE Authors
ADD dob DATE;

3. Data Manipulation (DML)
   Insert Data
   INSERT INTO Authors (name, country)
   VALUES ('J.K. Rowling', 'United Kingdom');

Update Data
UPDATE Authors
SET country = 'England'
WHERE name = 'J.K. Rowling';

Delete Data
DELETE FROM Authors
WHERE name = 'J.K. Rowling';

4. Query Data (SELECT) (DQL)
   Select All Columns
   SELECT \* FROM Authors;

Select Specific Columns
SELECT name, country FROM Authors;

Filter Rows with WHERE
SELECT \* FROM Books
WHERE genre = 'Fantasy';

Sorting Results
SELECT \* FROM Books
ORDER BY published_year DESC;

Limit Number of Rows
SELECT \* FROM Books
LIMIT 5;

5. SQL Clauses
   Clause Description Example

WHERE Filter rows SELECT \* FROM Members WHERE join_date > '2024-01-01';

ORDER BY Sort results SELECT \* FROM Books ORDER BY title ASC;

GROUP BY Group rows SELECT author_id, COUNT(\*) FROM Books GROUP BY author_id;

HAVING Filter grouped rows SELECT author*id, COUNT(*) FROM Books GROUP BY author*id HAVING COUNT(*) > 1;

DISTINCT Remove duplicates SELECT DISTINCT genre FROM Books;

6. SQL Joins (Basics)

INNER JOIN – Only matching rows

SELECT b.title, a.name
FROM Books b
INNER JOIN Authors a ON b.author_id = a.author_id;

LEFT JOIN – All rows from left table

SELECT b.title, m.name
FROM Books b
LEFT JOIN Members m ON b.member_id = m.member_id;

RIGHT JOIN – All rows from right table

SELECT b.title, m.name
FROM Books b
RIGHT JOIN Members m ON b.member_id = m.member_id;
