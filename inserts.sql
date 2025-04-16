insert into authors (first_name, last_name) values ('Bret Easton', 'Ellis');
insert into authors (first_name, last_name) values ('Scott', 'Adams');
insert into authors (first_name, last_name) values ('J. K.', 'Rowling');

insert into genres (name) values ('children''s literature');
insert into genres (name) values ('true crime');
insert into genres (name) values ('comics');

insert into books (title, genre_id, publishing_year) values ('American Psycho', (select id from genres where name = 'true crime'), 1991);
insert into books (title, genre_id, publishing_year) values ('Harry Potter and the Poop from a Butt', (select id from genres where name = 'childrens literature'), 1996);

insert into books_authors (book_id, author_id) values ((select id from books where title = 'American Psycho'), (select id from authors where first_name = 'Bret Easton'));
insert into books_authors (book_id, author_id) values ((select id from books where title = 'Harry Potter and the Poop from a Butt'), (select id from authors where first_name = 'J. K.'));