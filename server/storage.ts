import {
  users,
  contentRequests,
  type User,
  type UpsertUser,
  type ContentRequest,
  type InsertContentRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations for auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Content operations
  createContentRequest(request: InsertContentRequest, userId?: string): Promise<ContentRequest>;
  getContentRequest(id: number): Promise<ContentRequest | undefined>;
  updateContentRequest(id: number, generatedContent: any): Promise<ContentRequest | undefined>;
  getUserContentRequests(userId: string): Promise<ContentRequest[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations for auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Content operations
  async createContentRequest(insertRequest: InsertContentRequest, userId?: string): Promise<ContentRequest> {
    const [request] = await db
      .insert(contentRequests)
      .values({
        ...insertRequest,
        userId,
      })
      .returning();
    return request;
  }

  async getContentRequest(id: number): Promise<ContentRequest | undefined> {
    const [request] = await db
      .select()
      .from(contentRequests)
      .where(eq(contentRequests.id, id));
    return request;
  }

  async updateContentRequest(id: number, generatedContent: any): Promise<ContentRequest | undefined> {
    const [request] = await db
      .update(contentRequests)
      .set({ generatedContent })
      .where(eq(contentRequests.id, id))
      .returning();
    return request;
  }

  async getUserContentRequests(userId: string): Promise<ContentRequest[]> {
    return await db
      .select()
      .from(contentRequests)
      .where(eq(contentRequests.userId, userId))
      .orderBy(contentRequests.createdAt);
  }
}

export const storage = new DatabaseStorage();
