const create = `
    CREATE TABLE offices (
        id SERIAL primary key,
        type varchar (60) NOT NULL,
        name varchar (100) NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modifiedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS offices CASCADE;';

export { create, drop };
