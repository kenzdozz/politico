const create = `
    CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL primary key,
        office int references offices(id),
        party int references parties(id),
        candidate int references users(id),
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
`;

const drop = 'DROP TABLE IF EXISTS candidates CASCADE;';

export { create, drop };
