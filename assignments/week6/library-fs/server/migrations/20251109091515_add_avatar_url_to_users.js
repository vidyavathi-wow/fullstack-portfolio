exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.string('avatar_url', 255).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('avatar_url');
  });
};
