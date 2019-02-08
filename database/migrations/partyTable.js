const create = `
    CREATE TABLE IF NOT EXISTS parties (
        id SERIAL PRIMARY KEY,
        name VARCHAR (60) NOT NULL,
        acronym VARCHAR (60),
        hqaddress VARCHAR (255) NOT NULL,
        logourl VARCHAR (255) NOT NULL,
        createdat TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modifiedat TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS parties CASCADE;';

export { create, drop };
