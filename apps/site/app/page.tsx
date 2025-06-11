import Whiteboard from "./components/Whiteboard";
import { Button } from "@madts/ui-kit";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 p-4">
      <Whiteboard />
      <Button variant="outline">Example Button</Button>
    </main>
  );
}
