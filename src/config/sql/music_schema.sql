DROP SCHEMA IF EXISTS music_life;
CREATE SCHEMA music_life;
USE music_life;

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `music_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(40) NOT NULL,
  `release_date` DATETIME NOT NULL,
  `url` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(100),
  `monthly_counter` INT DEFAULT 0,
  `total_counter` BIGINT DEFAULT 0,
  `album_id` BIGINT UNSIGNED DEFAULT NULL,
   PRIMARY KEY (music_id),
   CONSTRAINT `fk_music_album` FOREIGN KEY (album_id) REFERENCES album (album_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `user_music` (
  `uuid` BIGINT UNSIGNED NOT NULL,
  `music_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (uuid, music_id),
  CONSTRAINT fk_user_music_user FOREIGN KEY (uuid) REFERENCES user (uuid) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_user_music_music FOREIGN KEY (music_id) REFERENCES music (music_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genre_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `image_url` VARCHAR(100),
   PRIMARY KEY (genre_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `artist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(100),
   PRIMARY KEY (artist_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `playlist_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `uuid` BIGINT UNSIGNED NOT NULL,
  `image_url` VARCHAR(100),
   PRIMARY KEY (playlist_id),
   CONSTRAINT fk_playlist_user FOREIGN KEY (uuid) REFERENCES user (uuid) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `playlist_music`
--

CREATE TABLE `playlist_music` (
  `playlist_id` BIGINT UNSIGNED NOT NULL,
  `music_id` BIGINT UNSIGNED NOT NULL,
   PRIMARY KEY (playlist_id, music_id),
   CONSTRAINT fk_playlist_music_playlist FOREIGN KEY (playlist_id) REFERENCES playlist (playlist_id) ON DELETE RESTRICT ON UPDATE CASCADE,
   CONSTRAINT fk_playlist_music_music FOREIGN KEY (music_id) REFERENCES music (music_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(40) UNIQUE,
  `display_name` VARCHAR(40) NOT NULL,
  `username` VARCHAR(40) NOT NULL UNIQUE,
  `del_flg` TINYINT DEFAULT 0,
  `validation` TINYINT DEFAULT 0, 
  `image_url` VARCHAR(100),
  `default_avatar` TINYINT DEFAULT 0,
  `refresh_token` TEXT NULL,
  `secret` CHAR(60),
   PRIMARY KEY (uuid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `uuid` BIGINT UNSIGNED NOT NULL,
  `music_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (comment_id),
   CONSTRAINT fk_comment_user FOREIGN KEY (uuid) REFERENCES user (uuid) ON DELETE RESTRICT ON UPDATE CASCADE,
   CONSTRAINT fk_comment_music FOREIGN KEY (music_id) REFERENCES music (music_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40) NOT NULL UNIQUE,
  `del_flg` TINYINT DEFAULT 0,
  `refresh_token` TEXT NULL,
  `secret` CHAR(60) NOT NULL,
   PRIMARY KEY (admin_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `album_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(40) NOT NULL,
  `release_date` DATETIME NOT NULL,
  `image_url` VARCHAR(100),
  `description` TEXT,
   PRIMARY KEY (album_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `music_genre`
--

CREATE TABLE `music_genre` (
  `music_id` BIGINT UNSIGNED NOT NULL,
  `genre_id` INT UNSIGNED NOT NULL,
   PRIMARY KEY (music_id, genre_id),
   CONSTRAINT fk_music_genre_music FOREIGN KEY (music_id) REFERENCES music (music_id) ON DELETE RESTRICT ON UPDATE CASCADE,
   CONSTRAINT fk_music_genre_genre FOREIGN KEY (genre_id) REFERENCES genre (genre_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `music_artist`
--

CREATE TABLE `music_artist` (
  `music_id` BIGINT UNSIGNED NOT NULL,
  `artist_id` INT UNSIGNED NOT NULL,
   PRIMARY KEY (music_id, artist_id),
   CONSTRAINT fk_music_artist_music FOREIGN KEY (music_id) REFERENCES music (music_id) ON DELETE RESTRICT ON UPDATE CASCADE,
   CONSTRAINT fk_music_artist_artist FOREIGN KEY (artist_id) REFERENCES artist (artist_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `common`
--

CREATE TABLE `common` (
  `key` VARCHAR(20) NOT NULL,
  `value` VARCHAR(20) NOT NULL,
  `remark` VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `album_artist`
--

CREATE TABLE `album_artist` (
  `album_id` BIGINT UNSIGNED NOT NULL,
  `artist_id` INT UNSIGNED NOT NULL,
   PRIMARY KEY (album_id, artist_id),
   CONSTRAINT fk_album_artist_album FOREIGN KEY (album_id) REFERENCES album (album_id) ON DELETE RESTRICT ON UPDATE CASCADE,
   CONSTRAINT fk_album_artist_artist FOREIGN KEY (artist_id) REFERENCES artist (artist_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `suggestplaylist` (
  `suggest_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `image_url` VARCHAR(100),
  PRIMARY KEY (suggest_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_suggest` (
  `suggest_id` BIGINT UNSIGNED NOT NULL,
  `uuid` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (suggest_id, uuid),
  CONSTRAINT fk_user_suggest_user FOREIGN KEY (uuid) REFERENCES user (uuid) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_user_suggest_suggest FOREIGN KEY (suggest_id) REFERENCES suggestplaylist (suggest_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `suggest_music` (
  `suggest_id` BIGINT UNSIGNED NOT NULL,
  `music_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (suggest_id, music_id),
  CONSTRAINT fk_suggest_music_music FOREIGN KEY (music_id) REFERENCES music (music_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_suggest_music_suggest FOREIGN KEY (suggest_id) REFERENCES suggestplaylist (suggest_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Config mysql
-- mysql -u root
-- USE mysql;
-- CREATE USER 'auth' IDENTIFIED BY 'auth';
-- FLUSH PRIVILEGES;
-- GRANT ALL PRIVILEGES ON music_life.admin TO 'auth';
-- FLUSH PRIVILEGES;
-- GRANT ALL PRIVILEGES ON music_life.user TO 'auth';
-- FLUSH PRIVILEGES;