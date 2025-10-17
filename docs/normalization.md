Normalization is the process of organizing a database to reduce redundancy and improve data integrity.

1. Objectives of Normalization

Eliminate duplicate data.

Ensure data dependencies make sense (only store related data in a table).

Make the database flexible for queries and updates.

2. Normal Forms (NF)
   First Normal Form (1NF)

Ensure each column contains atomic values (no multiple values in one column).

Each row is unique.

Example – Not 1NF:

book_id title authors
1 Book1 John, Alice

Normalized (1NF):

book_id title author
1 Book1 John
1 Book1 Alice
Second Normal Form (2NF)

Must be in 1NF.

Remove partial dependency (no column depends on part of a composite primary key).

Applies only to tables with composite keys.

Example – Not 2NF:

book_id author_id author_country
1 101 UK

author_country depends only on author_id, not the full primary key (book_id, author_id).

Normalized (2NF):

Books Table: book_id, title

Authors Table: author_id, name, country

Books_Authors Table: book_id, author_id

Third Normal Form (3NF)

Must be in 2NF.

Remove transitive dependency (non-key column depends on another non-key column).

Example – Not 3NF:
| member_id | name | email | branch_name | branch_address |

branch_address depends on branch_name, not the primary key (member_id).

Normalized (3NF):

Members Table: member_id, name, email, branch_id

Branches Table: branch_id, branch_name, branch_address

Boyce-Codd Normal Form (BCNF)

A stricter version of 3NF.

Every determinant must be a candidate key.

3. Benefits of Normalization

Reduces data redundancy.

Improves data integrity and consistency.

Makes updates, inserts, and deletes easier.

Simplifies query logic.

4. Summary Table of Normal Forms

Normal Form Requirement Example Fix

1NF Atomic columns, unique rows Split multi-valued authors into separate rows
2NF No partial dependency Separate books and authors when using composite key
3NF No transitive dependency Move branch info to separate table
BCNF Every determinant is a candidate key Ensure stricter key dependency
