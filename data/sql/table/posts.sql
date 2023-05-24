CREATE TABLE post
(
   `post_id`         INT NOT NULL AUTO_INCREMENT,
   `title`           VARCHAR(255) NOT NULL,
   `subtitle`        VARCHAR(255) NOT NULL,
   `image_url`       LONGTEXT NOT NULL,
   `label`           VARCHAR(255),
   `author`          VARCHAR(255) NOT NULL,
   `author_ur`       LONGTEXT NOT NULL,
   `publish_date`    VARCHAR(255) NOT NULL,
   `small_image_url` LONGTEXT NOT NULL,
   `content`         TEXT NOT NULL,
   `featured`        TINYINT(1) DEFAULT 0,
   PRIMARY KEY (`post_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;