import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const areaData = [
  { name: "Mon", users: 200, sessions: 400 },
  { name: "Tue", users: 400, sessions: 700 },
  { name: "Wed", users: 300, sessions: 500 },
  { name: "Thu", users: 600, sessions: 800 },
  { name: "Fri", users: 500, sessions: 600 },
];

const barData = [
  { name: "Q1", revenue: 5000 },
  { name: "Q2", revenue: 7000 },
  { name: "Q3", revenue: 4000 },
  { name: "Q4", revenue: 8000 },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Your project summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Active Projects
              </span>
              <Badge>12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completed</span>
              <Badge variant="secondary">24</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend Card */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
          <CardDescription>Project completion rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Activity Card */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Daily active users and sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stackId="2"
                  stroke="hsl(var(--secondary))"
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Revenue</CardTitle>
          <CardDescription>Revenue by quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest project updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "Project A updated",
              "New comment on Project B",
              "Task completed",
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            Create New Project
          </Button>
          <Button className="w-full justify-start" variant="outline">
            View Reports
          </Button>
          <Button className="w-full justify-start" variant="outline">
            Manage Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
