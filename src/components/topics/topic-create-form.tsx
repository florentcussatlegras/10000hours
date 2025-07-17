'use client';

import { useActionState, startTransition } from "react";

import {Input} from "@heroui/input";
import {Textarea} from "@heroui/input";
import {Button, ButtonGroup} from "@heroui/button";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";
import {Select, SelectSection, SelectItem} from "@heroui/select";
import FormButton from '@/components/common/form-button';
import createTopic from '@/actions/create-topic';
import type { CategoryTopic } from "@prisma/client";
// import * as actions from "@/actions";

interface TopicCreateFormProps {
  categories: CategoryTopic[]
}

export default function TopicCreateForm({ categories }: TopicCreateFormProps) {

  const [formState, action, isPending] = useActionState(createTopic, {
    errors: {}
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div>

        <Popover placement="left">

            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>

            <PopoverContent>

                <form onSubmit={handleSubmit}>

                  <div className="flex flex-col gap-4 p-4 w-80">

                      <h3 className="text-lg">Create a Topic</h3>

                      <Input
                        name="title"
                        label="title"
                        labelPlacement="outside"
                        placeholder="Title"
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                      />

                      <div className="bg-red-400">
                        {formState.errors.title?.join(', ')}
                      </div>

                      <Textarea
                        name="description"
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Describe your topic"
                        isInvalid={!!formState.errors.description}
                        errorMessage={formState.errors.description?.join(', ')}
                      />

                      <Select className="max-w-xs" label="Select a category" name="category">
                        {categories.map((category) => (
                          <SelectItem key={category.id}>{category.title}</SelectItem>
                        ))}
                      </Select>

                      {formState.errors._form ? (
                        <div className="rounded p-2 bg-red-200 border border-red-400">
                          {formState.errors._form?.join(', ')}
                        </div>
                      ) : null}

                      <FormButton isLoading={isPending}>Save</FormButton>

                  </div>

                </form>

            </PopoverContent>

        </Popover>
    </div>
  );
}
