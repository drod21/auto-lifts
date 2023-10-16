import { currentUser } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/api";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { workouts as userWorkouts } from "@/server/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { baseNavClassName } from "@/components/nav-utils";

export default async function ExercisePage() {
  const user = await currentUser();
  const hasUser = (user: User | null): user is User => user !== null;
  if (!hasUser(user)) {
    return <div>Not logged in</div>;
  }

  const workouts = await db
    .select()
    .from(userWorkouts)
    .where(eq(userWorkouts.userId, user.id));

  return (
    <div>
      <div className="flex  justify-between">
        <h1 className="text-2xl font-semibold">Workouts</h1>
        <Link className={baseNavClassName} href="/workouts/create">
          Create
        </Link>
      </div>
      <Table>
        <TableCaption>
          {!workouts.length
            ? "No workouts found, create one to get started."
            : "A list of your workouts."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow key={workout.workoutId}>
              <TableCell className="font-medium">
                <Link
                  className={baseNavClassName}
                  href={`/workouts/${workout.workoutId}`}
                >
                  {workout.name}
                </Link>
              </TableCell>
              <TableCell>{workout.description}</TableCell>
              <TableCell>{workout.createDate.toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
