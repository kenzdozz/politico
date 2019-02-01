const create = `
    CREATE TABLE votes (
        id SERIAL primary key,
        createdBy int references users(id),
        office int references offices(id),
        candidate int references candidates(id),
        createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS votes CASCADE;';

export { create, drop };
