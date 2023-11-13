/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comic').del()
  await knex('comic').insert([
    {title: 'NARUTO'},
    {title: 'ONE PIECE'},
    {title: 'DRAGON BALL'},
    {title: 'BREACH'},
  ]);
};
