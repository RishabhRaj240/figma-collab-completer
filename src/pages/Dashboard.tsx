
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Hotel, MapPin, Plane, Calendar, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  const [parent] = useAutoAnimate();

  // Mock data - in a real app this would come from your database
  const bookings = [
    {
      id: 1,
      destination: "Bali, Indonesia",
      checkIn: "2023-09-15",
      checkOut: "2023-09-22",
      status: "Confirmed",
      type: "Hotel",
    },
    {
      id: 2,
      destination: "Paris, France",
      checkIn: "2023-11-10",
      checkOut: "2023-11-17",
      status: "Pending",
      type: "Flight",
    },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4 lg:px-0">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-primary font-bold text-2xl">Travelo</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName || "User"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                <span className="font-medium">{user.fullName}</span>
              </div>
              <SignOutButton>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 lg:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hi, {user.firstName}!</h1>
          <p className="text-gray-600">Welcome to your travel dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <Button 
                    variant={activeTab === 'bookings' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('bookings')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    My Bookings
                  </Button>
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3" ref={parent}>
            {activeTab === 'bookings' && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                  <CardDescription>
                    Manage your upcoming trips and bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div 
                          key={booking.id} 
                          className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              {booking.type === 'Hotel' ? 
                                <Hotel className="h-5 w-5 text-primary" /> : 
                                <Plane className="h-5 w-5 text-primary" />
                              }
                            </div>
                            <div>
                              <h3 className="font-medium">{booking.destination}</h3>
                              <div className="text-sm text-gray-500 mt-1 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You have no bookings yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/">Book a Trip</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'profile' && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Full Name</h3>
                      <p>{user.fullName}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Email</h3>
                      <p>{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Member Since</h3>
                      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-4">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2023 Travelo. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
