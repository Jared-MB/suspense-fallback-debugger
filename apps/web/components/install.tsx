import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import PnpmInstall from "@/components/mdx/pnpm-install.mdx";
import NpmInstall from "@/components/mdx/npm-install.mdx";
import YarnInstall from "@/components/mdx/yarn-install.mdx";
import { Terminal } from "lucide-react";

export function Install() {
  return (
    <Tabs defaultValue="pnpm">
      <TabsList className="h-fit w-full justify-start bg-sidebar-accent/50 border-2 border-sidebar/50 border-b-1 border-b-gray-400/10">
        <div className="flex items-center p-2 gap-2">
          <div className="p-2">
            <Terminal className="w-5 h-5" />
          </div>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="yarn">yarn</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="pnpm">
        <PnpmInstall />
      </TabsContent>
      <TabsContent value="npm">
        <NpmInstall />
      </TabsContent>
      <TabsContent value="yarn">
        <YarnInstall />
      </TabsContent>
    </Tabs>
  );
}
