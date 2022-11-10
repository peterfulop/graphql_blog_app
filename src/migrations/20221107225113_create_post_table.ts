import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('post', (table) => {
    table.specificType('id', 'varchar').primary();
    table.text('title').notNullable();
    table.text('content').nullable();
    table.boolean('publisched').notNullable().defaultTo(false);
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('post');
}
