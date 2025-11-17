import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@workspace/ui/components/card";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function NextSteps() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link className="group" href="/api">
        <Card className="h-full group-hover:bg-accent transition-colors duration-100">
          <CardContent className="flex flex-col justify-between h-full gap-6">
            <Code2 className="size-8" />
            <div className="flex flex-col gap-2">
              <CardTitle>API Reference</CardTitle>
              <CardDescription className="text-pretty">
                Explore the complete package API.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
