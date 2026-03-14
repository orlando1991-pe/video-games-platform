CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.games (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NULL,
    genre text NULL,
    image_url text NULL,
    rating numeric(2,1) NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT games_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    "password" text NOT NULL,
    first_name text NULL,
    last_name text NULL,
    phone text NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
);