import { defineDb, defineTable, column } from 'astro:db';

const Waitlist = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    email: column.text({ unique: true }),
    createdAt: column.date(),
  },
});

export default defineDb({
  tables: {
    Waitlist,
  },
});
