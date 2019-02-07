const create = `
    CREATE TABLE IF NOT EXISTS petitions (
        id SERIAL PRIMARY KEY,
        createdby INT REFERENCES users(id),
        office INT REFERENCES offices(id),
        body VARCHAR (1500) NOT NULL,
        evidence VARCHAR (1500),
        createdon TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS petitions;';

export { create, drop };
