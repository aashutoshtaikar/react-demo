/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'John Doe', image: null },
    { id: 2, name: 'Jane Smith', image: null },
    { id: 3, name: 'Alice Johnson', image: null },
    { id: 4, name: 'Bob Brown', image: null },
    { id: 5, name: 'Charlie Davis', image: null }
  ]);
};
