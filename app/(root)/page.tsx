
import { Clock, Car, Inbox, User, Factory, ArrowRight, ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback } from "../shared/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/components/ui/card'

export default function DashboardPage() {
  // Simulated data for latest events and vehicles on objects
  const latestEvents = [
    {
      id: '1',
      type: 'ENTER',
      user: { name: 'Іван Петренко', avatar: '/placeholder-user.png' },
      vehicle: null,
      location: 'Головний офіс',
      timestamp: '2025-08-06T10:30:00Z',
      comment: null,
    },
    {
      id: '2',
      type: 'EXIT',
      user: null,
      vehicle: { plate: 'АА1234КК', model: 'Ford Transit' },
      location: 'Склад №1',
      timestamp: '2025-08-06T10:15:00Z',
      comment: 'Доставка вантажу А',
    },
    {
      id: '3',
      type: 'ENTER',
      user: { name: 'Олена Коваль', avatar: '/placeholder-user.png' },
      vehicle: null,
      location: 'Виробничий цех',
      timestamp: '2025-08-06T09:45:00Z',
      comment: null,
    },
    {
      id: '4',
      type: 'ENTER',
      user: null,
      vehicle: { plate: 'ВВ5678ЛЛ', model: 'MAN TGL' },
      location: 'Головний офіс',
      timestamp: '2025-08-06T09:30:00Z',
      comment: 'Забір документів',
    },
  ]

  const vehiclesOnObjects = [
    { location: 'Головний офіс', vehicles: [{ plate: 'АА1234КК', model: 'Ford Transit' }, { plate: 'ВВ5678ЛЛ', model: 'MAN TGL' }] },
    { location: 'Склад №1', vehicles: [{ plate: 'СС9012ММ', model: 'Mercedes Sprinter' }] },
    { location: 'Виробничий цех', vehicles: [] },
  ]

  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 1) return 'щойно';
    if (diffMinutes < 60) return `${diffMinutes} хв тому`;
    if (diffHours < 24) return `${diffHours} год тому`;
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900">
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">Панель управління</h2>

        {/* General Graphs/Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активні співробітники</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +2 за останній день
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активні транспортні засоби</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +1 за останній тиждень
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Сьогоднішні перевірки</CardTitle>
              <Inbox className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                +15% порівняно з вчора
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Latest Events */}
          <Card>
            <CardHeader>
              <CardTitle>Останні події</CardTitle>
              <CardDescription>Останні в'їзди та виїзди персоналу та транспорту.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4">
                    {event.type === 'ENTER' ? (
                      <ArrowRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowLeft className="h-5 w-5 text-red-500" />
                    )}
                    {event.user ? (
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={event.user.avatar || "/placeholder.svg"} alt={`@${event.user.name}`} />
                        <AvatarFallback>{event.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Car className="h-9 w-9 text-muted-foreground" />
                    )}
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {event.user ? event.user.name : event.vehicle?.plate}
                        {' '}
                        <span className="text-muted-foreground">
                          {event.type === 'ENTER' ? 'увійшов' : 'виїхав'} з
                        </span>
                        {' '}
                        {event.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeAgo(event.timestamp)}
                        {event.comment && ` - ${event.comment}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vehicles on Objects */}
          <Card>
            <CardHeader>
              <CardTitle>Техніка на об'єктах</CardTitle>
              <CardDescription>Поточне розташування транспортних засобів.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclesOnObjects.map((obj) => (
                  <div key={obj.location} className="grid gap-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Factory className="h-4 w-4 text-muted-foreground" />
                      {obj.location}
                    </h4>
                    {obj.vehicles.length > 0 ? (
                      <ul className="list-disc pl-6 text-sm text-muted-foreground">
                        {obj.vehicles.map((vehicle) => (
                          <li key={vehicle.plate}>{vehicle.plate} ({vehicle.model})</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground pl-6">Немає техніки на цьому об'єкті.</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
