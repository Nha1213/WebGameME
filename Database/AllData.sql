
CREATE TABLE IF NOT EXISTS user (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    create_at datetime DEFAULT CURRENT_TIMESTAMP,
    status tinyint(1) DEFAULT 1
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS Prize_Pool (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    place varchar(255) NOT NULL UNIQUE,
    price float NOT NULL,
    team_id varchar(255) NOT NULL;
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS team (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    team_name varchar(255) NOT NULL UNIQUE,
    image varchar(255) NOT NULL,
    Status int(11) DEFAULT 1,
    description text
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;



