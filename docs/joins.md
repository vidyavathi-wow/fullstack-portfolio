A JOIN combines rows from two or more tables based on a related column, usually a foreign key.

1. INNER JOIN

Returns rows where there is a match in both tables.

Syntax:

SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;

Example – Books with Authors:

SELECT b.title AS Book_Title, a.name AS Author_Name
FROM Books b
INNER JOIN Authors a
ON b.author_id = a.author_id;

Only books that have a valid author are returned.

2. LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table and matching rows from the right table. If no match exists, right table columns are NULL.

Syntax:

SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column = table2.column;

Example – Books with Members:

SELECT b.title AS Book_Title, m.name AS Borrowed_By
FROM Books b
LEFT JOIN Members m
ON b.member_id = m.member_id;

Returns all books, including those not currently borrowed (NULL for member).

3. RIGHT JOIN (RIGHT OUTER JOIN)

Returns all rows from the right table and matching rows from the left table. If no match exists, left table columns are NULL.

Example – Members with Books:

SELECT m.name AS Member_Name, b.title AS Book_Title
FROM Books b
RIGHT JOIN Members m
ON b.member_id = m.member_id;

Returns all members, including those who haven’t borrowed any books.

4. FULL JOIN (FULL OUTER JOIN)

Returns all rows from both tables, with NULLs where there is no match. Not supported in MySQL; can use a UNION of LEFT JOIN + RIGHT JOIN.

Example:

SELECT b.title AS Book_Title, m.name AS Member_Name
FROM Books b
LEFT JOIN Members m ON b.member_id = m.member_id
UNION
SELECT b.title AS Book_Title, m.name AS Member_Name
FROM Books b
RIGHT JOIN Members m ON b.member_id = m.member_id;

5. CROSS JOIN

Returns all possible combinations (Cartesian product) of rows from the two tables.

Example:

SELECT b.title, m.name
FROM Books b
CROSS JOIN Members m;

If 4 books and 4 members exist, returns 16 rows.

6. SELF JOIN

A table joins with itself, useful for hierarchical data or comparisons within the same table.

Example – Authors from the same country:

SELECT a1.name AS Author1, a2.name AS Author2
FROM Authors a1
JOIN Authors a2
ON a1.country = a2.country
WHERE a1.author_id <> a2.author_id;

7. Multiple Joins

You can join more than two tables.

Example – Books with Authors and Members:

SELECT b.title AS Book_Title,
b.genre,
a.name AS Author_Name,
m.name AS Borrowed_By
FROM Books b
JOIN Authors a ON b.author_id = a.author_id
LEFT JOIN Members m ON b.member_id = m.member_id;

Returns book details, author, and current borrower (if any).

8. Tips

Always join on primary key → foreign key columns.

Use table aliases for readability.

In LEFT JOIN, NULL indicates no match.

Use WHERE after JOIN to filter results.
