import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.specificType('id', 'varchar').primary();
    table.text('email').notNullable();
    table.text('name').notNullable();
    table.text('password').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
