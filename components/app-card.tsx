"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Layers, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface App {
  id: string
  name: string
  platform: string
  status: string
  adUnits: number
  revenue: string
  icon: string
}

interface AppCardProps {
  app: App
}

export function AppCard({ app }: AppCardProps) {
  // Determine badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "pending":
        return "outline"
      case "inactive":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // Check if revenue is positive (contains a + sign)
  const isPositiveRevenue = app.revenue.includes("+")

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b">
        <div className="h-14 w-14 overflow-hidden rounded-lg shadow-sm">
          <Image
            src={app.icon || "/placeholder.svg?height=56&width=56"}
            alt={app.name}
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{app.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs font-normal">
              {app.platform}
            </Badge>
            <Badge variant={getBadgeVariant(app.status)} className="text-xs">
              {app.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col p-3 rounded-lg bg-muted/50">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" />
              Ad Units
            </span>
            <span className="font-medium text-lg mt-1">{app.adUnits}</span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-muted/50">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {isPositiveRevenue ? (
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              Revenue
            </span>
            <span className={`font-medium text-lg mt-1 ${isPositiveRevenue ? "text-green-600" : "text-red-600"}`}>
              {app.revenue}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="gap-1">
          <Layers className="h-4 w-4" />
          Ad Units
        </Button>
        <Button size="sm" className="gap-1" asChild>
          <Link href={`/dashboard/apps/${app.id}`}>
            Manage
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
