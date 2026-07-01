/**
 * Community Spirit — Main Application Shell
 * Design: Living Terrarium (Organic Minimalism)
 * Layout: Icon Rail (left) + Main Content Area + Demo Control Bar (bottom)
 */

import { useDemo } from "@/contexts/DemoContext";
import { AppShell } from "@/components/AppShell";
import { WorldView } from "@/components/views/WorldView";
import { TaskView } from "@/components/views/TaskView";
import { OpsView } from "@/components/views/OpsView";
import { DemoControlBar } from "@/components/DemoControlBar";

export default function Home() {
  const { activeView } = useDemo();

  return (
    <AppShell>
      <div className="flex-1 overflow-hidden">
        {activeView === "world" && <WorldView />}
        {activeView === "task" && <TaskView />}
        {activeView === "ops" && <OpsView />}
      </div>
      <DemoControlBar />
    </AppShell>
  );
}
