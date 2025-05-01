-- drop database if exists bookbok_db;

-- create database bookbok;

-- \c bookbok

CREATE TABLE "books" (
  "id" serial,
  "title" varchar,
  "genre_id" int,
  "publishing_year" int,
  PRIMARY KEY ("id")
);

CREATE TABLE "books_users" (
  "id" serial,
  "user_id" int,
  "book_id" int,
  "status" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "genres" (
  "id" serial,
  "name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "users" (
  "id" serial,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "salt" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "comments" (
  "id" serial,
  "user_id" int,
  "comment" varchar,
  "book_id" int,
  "created" timestamp,
  PRIMARY KEY ("id")
);

CREATE TABLE "books_authors" (
  "id" serial,
  "book_id" int,
  "author_id" int,
  PRIMARY KEY ("id")
);

CREATE TABLE "authors" (
  "id" serial,
  "first_name" varchar,
  "last_name" varchar,
  PRIMARY KEY ("id")
);