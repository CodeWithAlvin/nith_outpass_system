import { boolean, serial, timestamp, pgTable, varchar, text, date, primaryKey, integer, numeric} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

// NextAuth + users from ~ https://authjs.dev/getting-started/adapters/drizzle
 
export const users = pgTable('user', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  phoneNumber: numeric("phoneNumber"),
  parentsNumber: numeric("parentsNumber"),
  date: timestamp("date", {withTimezone: true }).defaultNow(),
})
 
export const accounts = pgTable(
  'account',
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)


// tables for application
export const visit = pgTable('visit', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  from: timestamp("from", {withTimezone: true }),
  to: timestamp("to", {withTimezone: true }),
  reason: text("reason"),
  status: text("status"),
  place: text("place"),
  isOut:boolean("isOut").default(false),
  date: timestamp("date", {withTimezone: true }).defaultNow()
})
 