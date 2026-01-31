DROP TABLE users;
DROP TYPE user_roles;

CREATE TYPE user_roles AS ENUM ('admin', 'user');

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar TEXT,
    role user_roles NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Define the Primary Key
ALTER TABLE users ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

-- Define the Unique constraint for the email
ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);