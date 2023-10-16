import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GroupedExercises } from "./page";
import { useId } from "react";
import ExerciseCard from "@/app/exercises/exercise-card";

type Props = {
  exercises: GroupedExercises;
  selectedExerciseIds: number[];
  addId: (id: number) => void;
  removeId: (id: number) => void;
};
export default function ExerciseSelections({
  exercises,
  selectedExerciseIds,
  addId,
  removeId,
}: Props) {
  const id = useId();
  const exerciseGroup: (keyof GroupedExercises)[] = Object.keys(
    exercises,
  ) as unknown as (keyof GroupedExercises)[];
  const isSelected = (id: number) => selectedExerciseIds.includes(id);
  return (
    <Tabs defaultValue="account" className="w-fit">
      <TabsList>
        {exerciseGroup.map((group) => (
          <TabsTrigger key={`${id}-${group}`} value={group}>
            {group}
          </TabsTrigger>
        ))}
      </TabsList>
      {exerciseGroup.map((group: keyof typeof exercises) => (
        <TabsContent
          className="grid auto-cols-max grid-cols-3 gap-4"
          key={`${id}-${group}`}
          value={group}
        >
          {exercises[group]?.map((exercise) => {
            const isSelectedId = isSelected(exercise.exerciseId);

            return (
              <section
                className={isSelectedId ? "border-2 border-slate-500" : ""}
                key={exercise.exerciseId}
                onClick={() => {
                  isSelectedId
                    ? removeId(exercise.exerciseId)
                    : addId(exercise.exerciseId);
                }}
              >
                <ExerciseCard exercise={exercise} />
              </section>
            );
          })}
        </TabsContent>
      ))}
    </Tabs>
  );
}
