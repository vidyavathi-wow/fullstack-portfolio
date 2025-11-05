A subquery (also called an inner query or nested query) is a query inside another query. It can return a single value, a row, or a set of values to be used by the outer query.

1. Types of Subqueries
   Type Description
   Single-row subquery Returns a single value. Used with =, <, >, etc.
   Multiple-row subquery Returns multiple values. Used with IN, ANY, ALL.
   Multiple-column subquery Returns multiple columns. Used with IN or EXISTS.
   Correlated subquery Refers to columns from the outer query. Evaluates row by row.
2. Single-Row Subquery

Example – Find books published in the latest year:

SELECT title, published_year
FROM Books
WHERE published_year = (
SELECT MAX(published_year)
FROM Books
);

Inner query finds the latest year.

Outer query retrieves books published in that year.

3. Multiple-Row Subquery

Example – Find books by authors from the UK:

SELECT title
FROM Books
WHERE author_id IN (
SELECT author_id
FROM Authors
WHERE country = 'United Kingdom'
);

Inner query returns all authors from the UK.

Outer query selects books written by those authors.

4. Multiple-Column Subquery

Example – Find books and authors where book and author match a specific condition:

SELECT title, author_id
FROM Books
WHERE (author_id, published_year) IN (
SELECT author_id, published_year
FROM Books
WHERE published_year > 2000
);

Returns books published after 2000 along with the author_id.

5. Correlated Subquery

A correlated subquery references a column from the outer query, evaluated row by row.

Example – Find books whose published year is greater than the average year of all books by the same author:

SELECT b1.title, b1.author_id, b1.published_year
FROM Books b1
WHERE b1.published_year > (
SELECT AVG(b2.published_year)
FROM Books b2
WHERE b2.author_id = b1.author_id
);

Inner query calculates the average published year for each author.

Outer query compares each book’s year with its author’s average.

6. EXISTS Subquery

Returns TRUE if the subquery returns any row, otherwise FALSE.

Example – Find authors who have written books:

SELECT name
FROM Authors a
WHERE EXISTS (
SELECT 1
FROM Books b
WHERE b.author_id = a.author_id
);

Returns authors with at least one book in the Books table.

7. NOT IN Subquery

Find items that do not match a subquery result.

Example – Find authors who have not written any books:

SELECT name
FROM Authors
WHERE author_id NOT IN (
SELECT author_id
FROM Books
);

Tips for Subqueries

Use subqueries when you need intermediate results.

Prefer JOINs when possible for performance on large datasets.

Correlated subqueries can be slower because they evaluate row by row.

Use EXISTS for efficient existence checks.
