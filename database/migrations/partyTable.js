const create = `
    CREATE TABLE IF NOT EXISTS parties (
        id SERIAL primary key,
        name varchar (60) NOT NULL,
        acronym varchar (60),
        hqAddress varchar (255) NOT NULL,
        logoUrl varchar (255) NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modifiedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS parties CASCADE;';

export { create, drop };
