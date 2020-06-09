exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("VIN").unique();
    tbl.string("make");
    tbl.string("model");
    tbl.string("mileage");
    tbl.boolean("transmission").notNullable();
    tbl.text("status").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
