import Whiteboard from '../../components/Whiteboard'
import SquareBuilder from '@madts/demos/area-perimeter'

export default function HelloShapesPage() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <div className="relative h-[80vh] w-full border">
        <Whiteboard />
        <SquareBuilder />
      </div>
    </main>
  )
}
