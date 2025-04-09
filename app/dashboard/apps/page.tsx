import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AppCard } from "@/components/app-card"

export default function AppsPage() {
  // Sample apps data
  const apps = [
    {
      id: "1",
      name: "Puzzle Game Pro",
      platform: "Android & iOS",
      status: "Active",
      adUnits: 4,
      revenue: "$1,999.00",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Adventure Runner",
      platform: "Android",
      status: "Active",
      adUnits: 3,
      revenue: "$1,599.00",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Weather Pro",
      platform: "iOS",
      status: "Active",
      adUnits: 2,
      revenue: "$1,299.00",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Fitness Tracker",
      platform: "Android & iOS",
      status: "Active",
      adUnits: 3,
      revenue: "$999.00",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Cooking Master",
      platform: "Android",
      status: "Active",
      adUnits: 2,
      revenue: "$699.00",
      icon: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader title="Your Apps" description="Manage your AdMob-enabled applications" />
      <div className="grid gap-4 grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
