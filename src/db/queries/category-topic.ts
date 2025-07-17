import type { CategoryTopic } from "@prisma/client";
import { db } from "@/db";
 
export function fetchCategoryTopics(): Promise<CategoryTopic[]> {
  return db.categoryTopic.findMany({
    orderBy: {
      title: 'asc'
    }
  });
}