create schema blueone;

create table blueone.client(
    id serial primary key,
    name text not null,
    gender text not null,
    born date not null,
    age number not null,
    city text not null,
)

create table blueone.city(
    id serial primary key,
    city text not null,
    country text not null,
)