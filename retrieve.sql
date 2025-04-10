select count(*) from books;
select * from books order by title asc;
select * from authors order by last_name asc;
select * from books order by publishing_year asc;
select title from books where genre_id is (select id from genres where name like 'fantasy');
select title from books where genre_id is (select id from genres where name like 'fantasy') or (select id from genres where name like 'science fiction');
select b.title, a.first_name, a.last_name from books join books_authors on books.id = books_authors.book_id join authors on books_authors.author_id = authors.id;