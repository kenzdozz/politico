const create = `
    CREATE TABLE users (
        id SERIAL primary key,
        firstname varchar (60) NOT NULL,
        lastname varchar (60) NOT NULL,
        othername varchar (60),
        email varchar (100) UNIQUE NOT NULL,
        password varchar (255) NOT NULL,
        phonenumber varchar (40) UNIQUE NOT NULL,
        passporturl varchar (255) UNIQUE NOT NULL,
        isAdmin varchar (20) DEFAULT 'false',
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modifiedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS users CASCADE;';

export { create, drop };
