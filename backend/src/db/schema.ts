import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(), //set by clerk that is why I didb;t use uuid
    email: text("email").unique().notNull(),
    name: text("name"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"}).notNull().defaultNow()
                .$onUpdateFn(() => new Date()),
                


} )


export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    userId: text("user_id").notNull().references( () => users.id, {onDelete: "cascade"}),
    productId: text("product_id").notNull().references( () => products.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
})


//relation defining


export const userRelations = relations(users, ({many}) => ({
    products: many(products), //ts shows that one user is to many users
    comments: many(comments),
}));


export const productRelation = relations(products, ({many, one}) => ({
    comments: many(comments),
    user: one(users, {
        fields: [products.userId], references: [users.id]
    })

}))


const commentsRelations = relations(comments, ({one}) => ({
    users: one(users, {fields: [comments.userId], references: [users.id]}),
    product: one(products, {fields: [comments.userId], references: [products.id]})
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;