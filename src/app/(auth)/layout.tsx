import type { ReactNode } from "react";
import Image from "next/image";
import { Users } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <Users className="h-8 w-8" />
                <span>MentorConnect</span>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
