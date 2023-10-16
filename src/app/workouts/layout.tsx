import type { PropsWithChildren } from "react";

const WorkoutsLayout: React.FC = ({ children }: PropsWithChildren<object>) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="w-full bg-white px-4 py-2 shadow-lg sm:p-20 md:p-10">
        <div className="mt-5">
          {children} {/* Placeholder for the data table */}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsLayout;
