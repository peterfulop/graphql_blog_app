import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('post', (table) => {
    table.string('authorId').notNullable();
    table.foreign('authorId', 'fk_authorId').references('id').inTable('user');
  });
  await knex.schema.alterTable('profile', (table) => {
    table.string('userId').notNullable().unique();
    table.foreign('userId', 'fk_userId').references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('post', (table) => {
    table.dropForeign('fk_authorId');
  });
  await knex.schema.alterTable('profile', (table) => {
    table.dropForeign('fk_userId');
  });
}
