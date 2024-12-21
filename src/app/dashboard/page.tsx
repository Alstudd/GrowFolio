import Dashboard from '@/components/Dashboard'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'

type Props = {}

export const metadata = {
  title: "Dashboard 👨‍💻",
  description: "Dashboard",
}

const page = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect("/")
  }
  return (
    
    <div>
      {/* <main className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
          <DetailsDialog />
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
          <CreateACourseCard />
          <CourseGalleryCard />
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <QuizMeCard />
          <HistoryCard />
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
          <HotTopicsCard />
          <RecentActivityCard />
        </div>
      </main> */}
      <Dashboard/>
    </div>
  )
}

export default page