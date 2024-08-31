import { sqliteTable, text, integer, int } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

// Tabela "User"
export const User = sqliteTable('User', {
    userId: text('user_id').primaryKey().notNull(),
    name: text('name').notNull(),
    qualities: text('qualities').notNull(),
    email: text('email').notNull(),
    clerkId: text('clerk_id'),
    role: integer('role').notNull(),
    state: text("state").notNull(),
    city: text("city").notNull(),
    createdAt: int("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
});

export const Organization = sqliteTable('Organization', {
    organizationId: text('organization_id').primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: int("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
});

export const Task = sqliteTable('Task', {
    organizationId: text('organization_id').notNull().references(() => Organization.organizationId),
    taskId: text('task_id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    qualities: text('qualities').notNull(),
    urgency: integer('urgency').notNull(),
    createdAt: int("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
    status: integer('status').notNull()
});

export const TaskRequisition = sqliteTable('TaskRequisition', {
    organizationId: text('organization_id').notNull().references(() => Organization.organizationId),
    taskId: text('task_id').notNull().references(() => Task.taskId),
    requisitionId: text('requisition_id').notNull(),
    quantity: integer('quantity').notNull(),
    joined: integer('joined').notNull()
});

export const UserTask = sqliteTable('UserTask', {
    userId: text('user_id').notNull().references(() => User.userId),
    organizationId: text('organization_id').notNull().references(() => Organization.organizationId),
    taskId: text('task_id').notNull().references(() => Task.taskId),
    status: integer('status').default(1),
    joinDate: int('join_date', { mode: 'timestamp' }).default(sql`(unixepoch())`),
    finishedDate: int('finished_date', { mode: 'timestamp' })
});


// Relações
export const UserRelations = relations(User, ({ one, many }) => ({
    tasks: many(UserTask)
}));

export const OrganizationRelations = relations(Organization, ({ many }) => ({
    tasks: many(Task)
}));

export const TaskRelations = relations(Task, ({ many }) => ({
    taskRequisitions: many(TaskRequisition),
    userTasks: many(UserTask)
}));

export const TaskRequisitionRelations = relations(TaskRequisition, ({ one }) => ({
    task: one(Task, {
        fields: [TaskRequisition.taskId],
        references: [Task.taskId],
    }),
    organization: one(Organization, {
        fields: [TaskRequisition.organizationId],
        references: [Organization.organizationId],
    }),
}));

export const UserTaskRelations = relations(UserTask, ({ one }) => ({
    task: one(Task, {
        fields: [UserTask.taskId],
        references: [Task.taskId],
    }),
    user: one(User, {
        fields: [UserTask.userId],
        references: [User.userId],
    }),
    organization: one(Organization, {
        fields: [UserTask.organizationId],
        references: [Organization.organizationId],
    }),
}));
