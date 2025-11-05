An Entity-Relationship Diagram (ERD) is a visual representation of a database’s entities, their attributes, and the relationships between them. It helps in designing a database before creating tables.

1. Key Components of ERD

Entity

Represents a real-world object or concept.

Typically becomes a table in the database.

Example: Books, Authors, Members.

Attributes

Properties of an entity (become table columns).

Example for Books: book_id, title, genre, published_year.

Primary Key (PK)

Unique identifier for each entity.

Example: book_id for Books.

Foreign Key (FK)

Links one entity to another.

Example: author_id in Books references Authors.

Relationship

Defines how entities are related.

Types:

One-to-One (1:1) – Each row in Table A matches only one row in Table B.

One-to-Many (1:N) – Each row in Table A can have multiple rows in Table B.

Many-to-Many (M:N) – Rows in Table A can have multiple rows in Table B and vice versa (usually resolved with a junction table).

2. ERD Symbols (Text-Based)
   Symbol Meaning
   Rectangle Entity (table)
   Oval Attribute (column)
   Underline Primary Key
   Diamond Relationship
   Line Connection between entities
   Crow’s Foot Indicates “many” in relationships
3. ERD Example – Library Database
   Entities and Attributes

Books

book_id (PK)

title

genre

published_year

author_id (FK)

member_id (FK)

Authors

author_id (PK)

name

country

Members

member_id (PK)

name

email

join_date

Relationships
Relationship Type Notes
Authors → Books One-to-Many (1:N) One author can write many books
Members → Books One-to-Many (1:N) One member can borrow many books
