"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
// import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

// const profile = {
//   name: "alex",
//   age: 20,
//   coords: {
//     lat: 0,
//     lng: 15,
//   },
//   setAge(age: number): void {
//     this.age = age;
//   },
// };

// const { age }: { age: number } = profile;
// const {
//   coords: { lat, lng },
// }: { coords: { lat: number; lng: number } } = profile;

// const createTopicSchema = z.object({
//   name: z
//     .string()
//     .min(3)
//     .regex(/^[a-z-]+$/, {
//       message: "Must be lowercase letters or dashes whithout spaces",
//     }),
//   description: z.string().min(10),
// });

const createTopicSchema = z.object({
  title: z.string()
          .min(3, {
            message: "The name must contains at least 3 characters"
          })
          .regex(/^[a-z-]+$/, {
            message: "The name must contains lowercase letters or dashes whithout spaces",
          }),
  description: z.string()
                .min(10, {
                  message: "The description must contains at least 10 characters"
                }),
                category: z.string(),
});

interface CreateTopicFormState {
  errors: {
    title?: string[];
    description?: string[];
    category?: string[];
    _form?: string[];
  }
}

export default async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {

  const result = createTopicSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category")
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // const session = await auth();
  // if (!session || !session.user) {
  //   return {
  //     errors: {
  //       _form: ["You must be signed in to do this."],
  //     },
  //   };
  // }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        slug: result.data.title,
        categoryTopicId: result.data.category,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
