import Image from "next/image";
import { type WorkoutExercise, type Exercise } from "@/server/db/types";
import * as Card from "@/components/ui/card";
import { match, P } from "ts-pattern";

type Props = {
  exercise: Exercise;
  workoutExercise?: Pick<
    WorkoutExercise,
    "sets" | "reps" | "weight" | "restTimer"
  >;
};

export default function ExerciseCard({ exercise, workoutExercise }: Props) {
  // tailwind card with exercise info and a picture of the exercise
  return (
    <Card.Card className="min-h-full">
      <Card.CardHeader>
        <Card.CardTitle>{exercise.name}</Card.CardTitle>
        <Card.CardDescription>{exercise.description}</Card.CardDescription>
        <Card.CardContent>
          {exercise.imageUrl != null && (
            <Image
              src={exercise.imageUrl}
              alt={exercise.name}
              className="h-full w-full object-cover"
              width={200}
              height={200}
            />
          )}
        </Card.CardContent>
        {match(workoutExercise)
          .with(P.not(P.nullish), () => (
            <Card.CardDescription>
              <section>
                {workoutExercise?.sets} x {workoutExercise?.reps} @{" "}
              </section>
              <section>{workoutExercise?.weight} lbs </section>
              <section>Rest for {workoutExercise?.restTimer} seconds</section>
            </Card.CardDescription>
          ))
          .otherwise(() => null)}
      </Card.CardHeader>
    </Card.Card>
  );
}
