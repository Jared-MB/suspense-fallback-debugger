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
import { CodeHeader, CodeHeaderContent, CodeHeaderIcon } from "./code-header";

export function Install() {
  return (
    <Tabs defaultValue="pnpm">
      <TabsList asChild>
        <CodeHeader>
          <CodeHeaderIcon>
            <Terminal className="w-5 h-5" />
          </CodeHeaderIcon>
          <CodeHeaderContent>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
          </CodeHeaderContent>
        </CodeHeader>
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
