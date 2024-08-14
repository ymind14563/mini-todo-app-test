create database codingon2 default character set utf8 collate utf8_general_ci;

SHOW databases;

use codingon2;

DROP TABLE IF EXISTS todo;

CREATE TABLE Todo (
id INT NOT NULL PRIMARY KEY auto_increment,
title VARCHAR(100) NOT NULL,
done BOOLEAN NOT NULL DEFAULT false
);

DESC todo;

SELECT * FROM todo;

INSERT INTO todo VALUES (null, 'my todo1', 0);
INSERT INTO todo VALUES (null, 'my todo2', 1);
INSERT INTO todo VALUES (null, 'my todo3', 0);
INSERT INTO todo VALUES (null, 'my todo4', 0);
INSERT INTO todo VALUES (null, 'my todo5', 1);
INSERT INTO todo VALUES (null, 'my todo6', 0);

UPDATE todo SET title='내가 할일 1번' WHERE id = 1;

DELETE FROM todo WHERE id = 7;

SELECT * FROM mysql.user;
CREATE USER 'user'@'%' IDENTIFIED BY '12345678';
CREATE USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY '12345678';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;