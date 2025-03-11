import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Vote,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart2,
  Activity,
  Calendar,
  ChevronDown,
  Bell,
  Settings,
  Search,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaChart, BarChart, DonutChart } from "@tremor/react";
import { ResponsivePie } from '@nivo/pie';

// Mock data
const stats = [
  {
    title: "Total Voters",
    value: "94.5M",
    change: "+2.3%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Votes Cast",
    value: "67.8M",
    change: "+5.4%",
    trend: "up",
    icon: Vote,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Voter Turnout",
    value: "71.7%",
    change: "+3.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Time Remaining",
    value: "48h",
    change: "Ends Soon",
    trend: "neutral",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
  },
];

const voterTurnoutData = [
  { hour: "6 AM", current: 10, previous: 8 },
  { hour: "9 AM", current: 25, previous: 20 },
  { hour: "12 PM", current: 45, previous: 38 },
  { hour: "3 PM", current: 60, previous: 52 },
  { hour: "6 PM", current: 75, previous: 65 },
  { hour: "9 PM", current: 85, previous: 78 },
];

const constituencyData = [
  { name: "Mumbai North", turnout: 78 },
  { name: "Delhi Central", turnout: 82 },
  { name: "Bangalore South", turnout: 75 },
  { name: "Chennai Central", turnout: 85 },
  { name: "Kolkata North", turnout: 79 },
];

const demographicData = [
  { id: "18-25", label: "18-25", value: 25, color: "#3b82f6" },
  { id: "26-35", label: "26-35", value: 30, color: "#10b981" },
  { id: "36-45", label: "36-45", value: 20, color: "#8b5cf6" },
  { id: "46-60", label: "46-60", value: 15, color: "#f59e0b" },
  { id: "60+", label: "60+", value: 10, color: "#ec4899" }
];

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Low voter turnout in Bangalore East district",
    time: "15 min ago",
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
  },
  {
    id: 2,
    type: "success",
    message: "Chennai Central reached 85% voter turnout",
    time: "32 min ago",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    type: "info",
    message: "Voting booths in Mumbai North extended by 1 hour",
    time: "1 hour ago",
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
];

const recentActivity = [
  {
    id: 1,
    constituency: "Delhi Central",
    update: "Voter turnout reached 82%",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    constituency: "Mumbai North",
    update: "New polling station opened at Andheri",
    time: "15 min ago",
    status: "info",
  },
  {
    id: 3,
    constituency: "Bangalore South",
    update: "Technical issue resolved at booth #42",
    time: "28 min ago",
    status: "warning",
  },
  {
    id: 4,
    constituency: "Chennai Central",
    update: "Voter verification process improved",
    time: "45 min ago",
    status: "success",
  },
];

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="container mx-auto space-y-6">
          {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Election Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track real-time voting statistics and analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <Select defaultValue="national">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="national">National View</SelectItem>
                <SelectItem value="state">State View</SelectItem>
                <SelectItem value="district">District View</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Today
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Time Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Last 24 Hours</DropdownMenuItem>
                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>Custom Range</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>

          {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className="font-medium"
                >
                  {stat.change}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
              </CardContent>
            </Card>
            ))}
          </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Voter Turnout Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Voter Turnout Trend</CardTitle>
              <CardDescription>Hourly comparison with previous election</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                className="h-72"
                data={voterTurnoutData}
                index="hour"
                categories={["current", "previous"]}
                colors={["blue", "rose"]}
                valueFormatter={(value) => `${value}%`}
                showLegend
                showGridLines
                showAnimation
                curveType="natural"
                customTooltip={({ payload, active }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-white p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        {payload.map((category, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-500">
                              {category.dataKey === "current" ? "Current" : "Previous"}
                            </span>
                            <span className={`font-bold ${category.dataKey === "current" ? "text-blue-600" : "text-rose-600"}`}>
                              {category.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
            </CardContent>
          </Card>

          {/* Constituency Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Constituency Performance</CardTitle>
              <CardDescription>Top performing constituencies</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <BarChart
                className="h-72"
                data={constituencyData}
                index="name"
                categories={["turnout"]}
                colors={["#10b981"]}
                valueFormatter={(value) => `${value}%`}
                showLegend={false}
                showGridLines
                showAnimation
                customTooltip={({ payload, active }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-lg">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                          {payload[0]?.payload.name}
                        </span>
                        <span className="text-lg font-bold text-emerald-600">
                          {payload[0]?.value}%
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Voter Demographics</CardTitle>
              <CardDescription>Age distribution of voters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsivePie
                  data={demographicData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ datum: 'data.color' }}
                  borderWidth={1}
                  borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]]
                  }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]]
                  }}
                  defs={[
                    {
                      id: 'dots',
                      type: 'patternDots',
                      background: 'inherit',
                      color: 'rgba(255, 255, 255, 0.3)',
                      size: 4,
                      padding: 1,
                      stagger: true
                    },
                    {
                      id: 'lines',
                      type: 'patternLines',
                      background: 'inherit',
                      color: 'rgba(255, 255, 255, 0.3)',
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                    }
                  ]}
                  fill={[
                    { match: { id: '18-25' }, id: 'dots' },
                    { match: { id: '26-35' }, id: 'lines' }
                  ]}
                  legends={[
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      justify: false,
                      translateX: 0,
                      translateY: 56,
                      itemsSpacing: 0,
                      itemWidth: 80,
                      itemHeight: 18,
                      itemTextColor: '#999',
                      itemDirection: 'left-to-right',
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#000'
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </CardContent>
          </Card>
          </div>

        {/* Activity and Alerts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from polling stations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.constituency}</p>
                        <p className="text-sm text-muted-foreground">{activity.update}</p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "default"
                            : activity.status === "warning"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {activity.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Important Alerts</CardTitle>
              <CardDescription>Critical updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-center gap-4 rounded-lg ${alert.bgColor} p-4`}
                    >
                      <alert.icon className={`h-5 w-5 ${alert.color}`} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}