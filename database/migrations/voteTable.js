const create = `
    CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        createdby INT REFERENCES users(id),
        office INT REFERENCES offices(id),
        candidate INT REFERENCES candidates(id),
        createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
        UNIQUE (createdby, office)
    );
`;

const drop = 'DROP TABLE IF EXISTS votes;';

export { create, drop };
