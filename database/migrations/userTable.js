const create = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL primary key,
        firstname varchar (60) NOT NULL,
        lastname varchar (60) NOT NULL,
        othername varchar (60),
        gender varchar (20),
        email varchar (100) UNIQUE NOT NULL,
        password varchar (255) NOT NULL,
        phonenumber varchar (40) UNIQUE NOT NULL,
        passporturl varchar (255) NOT NULL,
        isadmin varchar (20) DEFAULT 'false',
        emailtoken varchar (500),
        createdat TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modifiedat TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS users CASCADE;';

export { create, drop };
