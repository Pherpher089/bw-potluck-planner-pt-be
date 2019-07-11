exports.up = async function(knex) {
  await knex.schema.dropTableIfExists("potluck_planner");
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .integer("userId")
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE")
      .unique()
      .notNullable();
    tbl.string("firstName").notNullable();
    tbl.string("lasttName").notNullable();
    tbl
      .string("email")
      .unique()
      .notNullable();
    tbl
      .string("hash")
      .unique()
      .notNullable();
  });

  await knex.schema.createTable("usersPotlucks", tbl => {
    tbl.increments("id");
    tbl
      .integer("userId")
      .references("id")
      .inTable("users")
      .unique()
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
    tbl
      .integer("potluckId")
      .references("id")
      .inTable("potlucks")
      .unique()
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
    tbl.integer("role").notNullable();
    tbl.integer("attendance");
  });
  await knex.schema.createTable("potlucks", tbl => {
    tbl.increments("id");
    tbl.string("locationName").notNullable();
    tbl.string("locationAddress").notNullable();
  });
  await knex.schema.createTable("potluckItems", tbl => {
    tbl.increments("id");
    tbl
      .integer("potluckitemsId")
      .references("id")
      .inTable("users")
      .references("id")
      .inTable("potlucks")
      .unique()
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
    tbl.string("foodName").notNullable();
    tbl.integer("servings").notNullable();
  });
  await knex.schema.createTable("potluckRequirements", tbl => {
    tbl.increments("id");
    tbl
      .integer("potluckrequirementsId")
      .references("id")
      .inTable("potlucks")
      .unique()
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
    tbl.string("foodType").notNullable();
    tbl.integer("servings").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cohorts_students");
  await knex.schema.dropTableIfExists("students");
  await knex.schema.dropTableIfExists("cohorts");
  await knex.schema.dropTableIfExists("tracks");

  await knex.schema.createTable("potluck_planner", tbl => {
    tbl.increments();
    tbl
      .string("name", 128)
      .notNullable()
      .unique();
  });
};
