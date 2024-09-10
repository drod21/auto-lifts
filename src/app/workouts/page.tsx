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
import { createClient } from '@/server/client';
import { redirect } from 'next/navigation';

export default async function ExercisePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
	const user = data.user;

  if (error != null || user == null) {
    redirect('/login')
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
              <TableCell>{workout.createDate.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
