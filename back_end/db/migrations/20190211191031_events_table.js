exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(tbl) {
    tbl.increments()

    tbl
      .string('name', 128)
      .notNullable()

    tbl
      .string('date')
      .notNullable()

    tbl
      .string('location', 128)
      .notNullable()

    tbl
      .integer('lat')
      .notNullable()

    tbl
      .integer('lon')
      .notNullable()

    tbl
      .string('img_url')

    tbl
      .string('raiting')

    tbl
      .string('price')

    tbl.string('url')


    tbl
      .string('venue', 255)
      .notNullable()

    tbl
      .string('author', 128)
      .notNullable()

    tbl
      .boolean('invite_only')
      .defaultTo(false)

    tbl
      .integer('user_id')
      .notNullable()

    tbl
      .integer('total_comments')
      .defaultTo(0)

    tbl
      .integer('total_users')
      .defaultTo(1)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};