const create = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR (60) NOT NULL,
        lastname VARCHAR (60) NOT NULL,
        othername VARCHAR (60),
        gender VARCHAR (20),
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        phonenumber VARCHAR (40) UNIQUE NOT NULL,
        passporturl VARCHAR (255) NOT NULL,
        isadmin BOOLEAN DEFAULT 'false',
        emailtoken VARCHAR (500),
        createdat TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modifiedat TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS users CASCADE;';

export { create, drop };
