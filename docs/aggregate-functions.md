1. COUNT() – Count total books
   SELECT COUNT(book_id) AS Total_Books
   FROM Books;

Result:
Returns the total number of books in the library.

2. SUM() – Sum of published years (illustrative)
   SELECT SUM(published_year) AS Total_Years
   FROM Books;

Result:
Adds up all the published_year values from the Books table.

3. AVG() – Average published year
   SELECT AVG(published_year) AS Average_Year
   FROM Books;

Result:
Returns the average year of publication of all books.

4. MIN() – Earliest published book
   SELECT MIN(published_year) AS Earliest_Year
   FROM Books;

Result:
Shows the smallest (earliest) published_year in the Books table.

5. MAX() – Latest published book
   SELECT MAX(published_year) AS Latest_Year
   FROM Books;

Result:
Shows the largest (latest) published_year in the Books table.

6. GROUP BY – Count books per author
   SELECT a.name AS Author_Name, COUNT(b.book_id) AS Total_Books
   FROM Books b
   JOIN Authors a ON b.author_id = a.author_id
   GROUP BY a.name;

Result:
Shows each author and how many books they have in the library.

7. HAVING – Authors with more than 1 book
   SELECT a.name AS Author_Name, COUNT(b.book_id) AS Total_Books
   FROM Books b
   JOIN Authors a ON b.author_id = a.author_id
   GROUP BY a.name
   HAVING COUNT(b.book_id) > 1;

Result:
Displays only authors who have more than 1 book.
