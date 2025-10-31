exports.seed = async function (knex) {
  await knex('books').insert([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      published_year: 1925,
      genre: 'Fiction',
    },
    {
      title: '1984',
      author: 'George Orwell',
      published_year: 1949,
      genre: 'Dystopian',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      published_year: 1960,
      genre: 'Fiction',
    },
  ]);
};
