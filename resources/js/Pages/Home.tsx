import React from "react";
import { BarChart, Clock, Server, Users } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Head, Link, usePage } from "@inertiajs/react";
const Home = () => {
  const auth: Record<string, any> = usePage().props;
  return (
    <>
      <Head title="Home" />
      <div className="flex flex-col min-h-screen">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 flex-col h-screen bg-muted border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            <div className="p-4 absolute bottom-0 border-t ">
              <Link href="/logout">Logout</Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Welcome {auth?.name}</h1>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => alert("")}
              >
                Logout
              </Button>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    API Requests
                  </CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45.2k</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Response Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42ms</div>
                  <p className="text-xs text-muted-foreground">
                    -3ms from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
