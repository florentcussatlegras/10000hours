import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const categoryTopicData: Prisma.CategoryTopicCreateInput[] = [
  {
    title: "Musique",
    slug: "musique",
    description: "Aute ut dolore nulla commodo excepteur proident labore dolore esse deserunt. Aliquip excepteur esse aliqua aute ea excepteur dolore deserunt mollit. Est sint aliquip pariatur ad amet Lorem dolor labore non exercitation adipisicing."
  },
  {
    title: "Informatique",
    slug: "informatique",
    description: "Aute ut dolore nulla commodo excepteur proident labore dolore esse deserunt. Aliquip excepteur esse aliqua aute ea excepteur dolore deserunt mollit. Est sint aliquip pariatur ad amet Lorem dolor labore non exercitation adipisicing."
  },
];

export async function main() {
  for (const u of categoryTopicData) {
    await prisma.categoryTopic.create({ data: u });
  }
}

main();