import { redirect } from 'next/navigation';
import { db } from '@/db';
import { fetchCategoryTopics } from '@/db/queries/category-topic';
import {Select, SelectItem} from "@heroui/react";
import TopicCreateForm from '@/components/topics/topic-create-form';

export default async function TopicCreatePage() {

    const categoryTopics = await(fetchCategoryTopics());
    console.log(categoryTopics);

    // // Create a new record in the database
    // const topic = await db.topic.create({
    //     data: {
    //         title: title,
    //         description: description,
    //         slug: slug,
    //         categoryTopicId: category,
    //     }
    // });

    return (
         <div className="space-y-3">
            <TopicCreateForm categories={categoryTopics} />
         </div>
    );
}


