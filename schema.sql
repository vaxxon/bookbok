drop database if exists bookbok_db;
create database bookbok_db;
\c bookbok_db;

create table authors (
    id serial primary key,
    first_name text,
    last_name text
);

insert into authors (first_name, last_name) values ('Robin', 'Hobb');
insert into authors (first_name, last_name) values ('George R. R.', 'Martin');
insert into authors (first_name, last_name) values ('J. R. R.', 'Tolkien');
insert into authors (first_name, last_name) values ('Susanna', 'Clarke');
insert into authors (first_name, last_name) values ('Gregory', 'Maguire');

create table books (
    id serial primary key,
    title text,
    publishing_year int,
    genre_id int
);

insert into books (title, publishing_year) values ('Ship of Magic', 1996);
insert into books (title, publishing_year) values ('The Winds of Winter', 2046);
insert into books (title, publishing_year) values ('The Lord of the Rings', 1946);
insert into books (title, publishing_year) values ('Piranesi', 2020);
insert into books (title, publishing_year) values ('Wicked', 1994);

