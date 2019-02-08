const create = `
    CREATE TABLE IF NOT EXISTS offices (
        id SERIAL PRIMARY KEY,
        type VARCHAR (60) NOT NULL,
        name VARCHAR (100) NOT NULL,
        createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        modifiedat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
`;

const drop = 'DROP TABLE IF EXISTS offices CASCADE;';

export { create, drop };
