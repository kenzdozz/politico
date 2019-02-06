const create = `
    CREATE TABLE IF NOT EXISTS petitions (
        id SERIAL primary key,
        createdBy int references users(id),
        office int references offices(id),
        body varchar (500) NOT NULL,
        createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS petitions CASCADE;';

export { create, drop };
