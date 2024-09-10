"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWorkout } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { F } from "@mobily/ts-belt";
import { type NewWorkout } from "@/server/db/types";
import { use, useState } from "react";
import { type GroupedExercises } from "./page";
import ExerciseSelections from "./exercise-selections";
import { createClient } from '@/supabase/browserClient';

export default function CreateForm({
  exercises,
}: {
  exercises: GroupedExercises;
}) {
	const client = createClient()
	const {data: { user}} = use(client.auth.getUser())
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const addId = (id: number) =>
    setSelectedExerciseIds((prevIds) => [...new Set([...prevIds, id])]);
  const removeId = (id: number) =>
    setSelectedExerciseIds((prevIds) =>
      prevIds.filter((prevId) => prevId !== id),
    );
  const router = useRouter();
  if (!user) {
    router.push("/sign-in");
  }
  const userId = F.coerce<string>(user?.id);

  const handleSubmit = async (values: FormData) => {
    const status = values.get("status");
    const name = values.get("workoutName");
    const description = values.get("description");
    const workout = F.coerce<NewWorkout>({
      userId,
      status,
      name,
      description,
    });

    const { result } = await createWorkout(workout, selectedExerciseIds);
    router.push(`/workouts/${result.workoutId}`);

    // console.log(new FormData(e.target as HTMLFormElement));
    // Handle form submission logic here
    // For example, send the data to the backend or update the state
  };

  return (
    <>
      <form
        action={(values) => {
          handleSubmit(values).catch((err) => {
            throw err;
          });
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="workoutName"
            className="block text-sm font-medium text-gray-700"
          >
            Workout Name
          </label>
          <Input
            type="text"
            id="workoutName"
            name="workoutName"
            placeholder="My Workout"
            defaultValue=""
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description (Optional)
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="This is a description of my workout."
            defaultValue=""
            rows={3}
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <Select name="status" defaultValue="public">
            <SelectTrigger className="mt-1 w-[180px] w-full rounded-md border p-2">
              <SelectValue placeholder="public" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ExerciseSelections
          exercises={exercises}
          selectedExerciseIds={selectedExerciseIds}
          addId={addId}
          removeId={removeId}
        />

        <div>
          <Button
            type="submit"
            className="rounded px-4 py-2 font-bold text-white hover:bg-slate-700"
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
}
