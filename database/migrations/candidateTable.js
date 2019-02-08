const create = `
    CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id),
        party INT REFERENCES parties(id),
        candidate INT REFERENCES users(id),
        approved BOOLEAN DEFAULT FALSE,
        mandate VARCHAR (1500),
        createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE (office, candidate)
    );
`;

const drop = 'DROP TABLE IF EXISTS candidates CASCADE;';

export { create, drop };
