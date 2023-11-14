/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comic', function (table) {
      table.integer('id').defaultTo(knex.raw("(floor(random() * 9000) + 1000)::integer")).primary();
      table.string('title', 255).notNullable();
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('comic'); 
  };
  