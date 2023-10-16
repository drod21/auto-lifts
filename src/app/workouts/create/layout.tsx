import { PropsWithChildren } from "react";

export default function CreateWorkoutLayout({
  children,
}: PropsWithChildren<object>) {
  return (
    <>
      <h1 className="justify-start">Create workout</h1>
      <div>{children}</div>
    </>
  );
}
