import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {CalendarDays, MapPin, User} from "lucide-react"
import MainLayout from "@/components/MainLayout.tsx"
import api from "@/api";
import {useEffect, useState} from "react";
import useAuth from "@/context/AuthProvider";

interface Booking {
    bookerId: number
    propertyId: number
    propertyName: string
    location: string
    checkIn: string // localdate
    checkOut: string // localdate
    headcount: number,
    status: "pending" | "confirmed" | "cancelled" // booking dto status enum values
    imageUrl?: string // add to db schema or get the image from the property id implement when hooking up to backend
}

async function getBookingsForUser(userId: number): Promise<Booking[]> {
    try {
        const response = await api.get(`/api/bookings/users/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error?.response?.status, error?.response?.data);
        throw error;
    }
}

export default function BookingsComponent() {

    const {user} = useAuth();

    useEffect(() => {
        getBookingsForUser(user?.id as number).then(setBookings);
    }, []);


    const [bookings, setBookings] = useState<Booking[]>([])
    const currentDate = new Date()

    const isUpcoming = (booking: Booking) => {
        const checkInDate = new Date(booking.checkIn)
        return checkInDate > currentDate && booking.status !== "cancelled"
    }

    const upcomingBookings = bookings.filter(isUpcoming)
    const pastBookings = bookings.filter(booking => !isUpcoming(booking))

    return (
        <MainLayout>
            <div className="w-full max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                        <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <BookingCard key={`${booking.bookerId}-${booking.propertyId}`} booking={booking}
                                             isUpcoming={true}/>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No upcoming bookings</p>
                        )}
                    </TabsContent>
                    <TabsContent value="past">
                        {pastBookings.length > 0 ? (
                            pastBookings.map((booking) => (
                                <BookingCard key={`${booking.bookerId}-${booking.propertyId}`} booking={booking}
                                             isUpcoming={false}/>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No past bookings</p>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    )
}

function BookingCard({booking, isUpcoming}: { booking: Booking; isUpcoming: boolean }) {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                <img
                    src={booking.imageUrl}
                    alt={booking.propertyName}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                />
                <div className="flex-1">
                    <CardTitle className="text-xl">{booking.propertyName}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1"/>
                        {booking.location}
                    </CardDescription>
                </div>
                <Badge
                    variant={
                        isUpcoming
                            ? booking.status === "pending"
                                ? "secondary"
                                : "default"
                            : booking.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                    }
                >
                    {booking.status}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <CalendarDays className="w-4 h-4 mr-2"/>
                    <span>
            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
          </span>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-2"/>
                    <span>Headcount: {booking.headcount}</span>
                </div>
            </CardFooter>
        </Card>
    )
}