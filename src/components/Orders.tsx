import { useState, useMemo } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Calendar } from './ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar as CalendarIcon, Clock, MapPin, Phone, Star, Download, CheckCircle, Truck, Wrench, User, CreditCard, Search } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const orders = [
  {
    id: 'ORD-001',
    orderId: 'ORD-001',
    service: 'Pool Cleaning',
    company: 'AquaPro Services',
    date: '2024-01-15',
    time: '2:00 PM',
    technician: {
      name: 'Mike Johnson',
      avatar: '/api/placeholder/40/40',
      phone: '(555) 123-4567',
      rating: 4.8
    },
    status: 'upcoming',
    pool: 'Main Pool',
    price: 85,
    discount: 0,
    pointsApplied: 0,
    finalPrice: 85,
    notes: 'Please focus on removing algae buildup near the steps',
    serviceImage: '/api/placeholder/100/100',
    timeline: [
      { time: '1:30 PM', status: 'Order confirmed', completed: true, icon: CheckCircle, date: '2024-01-14' },
      { time: '12:00 PM', status: 'Technician assigned', completed: true, icon: User, date: '2024-01-15' },
      { time: '1:45 PM', status: 'Technician en route', completed: false, icon: Truck, date: '2024-01-15' },
      { time: '2:00 PM', status: 'Service in progress', completed: false, icon: Wrench, date: '2024-01-15' }
    ]
  },
  {
    id: 'ORD-002',
    orderId: 'ORD-002',
    service: 'Chemical Balance',
    company: 'AquaPro Services',
    date: '2024-01-12',
    time: '10:00 AM',
    technician: {
      name: 'Sarah Wilson',
      avatar: '/api/placeholder/40/40',
      phone: '(555) 987-6543',
      rating: 4.9
    },
    status: 'completed',
    pool: 'Main Pool',
    price: 45,
    discount: 5,
    pointsApplied: 200,
    finalPrice: 30,
    notes: '',
    timeline: [
      { time: '10:00 AM', status: 'Technician arrived', completed: true, icon: Truck, date: '2024-01-12' },
      { time: '10:15 AM', status: 'Water testing completed', completed: true, icon: CheckCircle, date: '2024-01-12' },
      { time: '10:30 AM', status: 'Chemicals added', completed: true, icon: Wrench, date: '2024-01-12' },
      { time: '10:45 AM', status: 'Service completed', completed: true, icon: CheckCircle, date: '2024-01-12' }
    ],
    photos: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
    rating: null,
    serviceImage: '/api/placeholder/100/100'
  },
  {
    id: 'ORD-003',
    orderId: 'ORD-003',
    service: 'Equipment Maintenance',
    company: 'TechPool Solutions',
    date: '2024-01-08',
    time: '1:00 PM',
    technician: {
      name: 'Robert Chen',
      avatar: '/api/placeholder/40/40',
      phone: '(555) 456-7890',
      rating: 4.7
    },
    status: 'cancelled',
    pool: 'Main Pool',
    price: 120,
    discount: 0,
    pointsApplied: 0,
    finalPrice: 0,
    notes: 'Cancelled due weather conditions',
    serviceImage: '/api/placeholder/100/100',
    timeline: [
      { time: '12:30 PM', status: 'Order confirmed', completed: true, icon: CheckCircle, date: '2024-01-07' },
      { time: '8:00 AM', status: 'Service cancelled', completed: true, icon: CheckCircle, date: '2024-01-08' }
    ]
  },
  {
    id: 'ORD-004',
    orderId: 'ORD-004',
    service: 'Deep Pool Cleaning',
    company: 'Crystal Clear Pools',
    date: '2024-01-20',
    time: '9:00 AM',
    technician: {
      name: 'Lisa Rodriguez',
      avatar: '/api/placeholder/40/40',
      phone: '(555) 321-9876',
      rating: 4.9
    },
    status: 'upcoming',
    pool: 'Main Pool',
    price: 150,
    discount: 15,
    pointsApplied: 300,
    finalPrice: 120,
    notes: 'Deep cleaning for spring opening',
    serviceImage: '/api/placeholder/100/100',
    timeline: [
      { time: '2:00 PM', status: 'Order confirmed', completed: true, icon: CheckCircle, date: '2024-01-18' },
      { time: '4:00 PM', status: 'Technician assigned', completed: true, icon: User, date: '2024-01-19' }
    ]
  },
  {
    id: 'ORD-005',
    orderId: 'ORD-005',
    service: 'Pool Repair',
    company: 'TechPool Solutions',
    date: '2024-01-05',
    time: '11:00 AM',
    technician: {
      name: 'James Martinez',
      avatar: '/api/placeholder/40/40',
      phone: '(555) 654-3210',
      rating: 4.6
    },
    status: 'completed',
    pool: 'Spa',
    price: 180,
    discount: 0,
    pointsApplied: 0,
    finalPrice: 180,
    notes: 'Tile repair around spa edge',
    serviceImage: '/api/placeholder/100/100',
    timeline: [
      { time: '11:00 AM', status: 'Technician arrived', completed: true, icon: Truck, date: '2024-01-05' },
      { time: '11:30 AM', status: 'Assessment completed', completed: true, icon: CheckCircle, date: '2024-01-05' },
      { time: '1:00 PM', status: 'Repair work started', completed: true, icon: Wrench, date: '2024-01-05' },
      { time: '3:30 PM', status: 'Service completed', completed: true, icon: CheckCircle, date: '2024-01-05' }
    ],
    photos: ['/api/placeholder/200/150', '/api/placeholder/200/150', '/api/placeholder/200/150'],
    rating: 5,
    serviceImage: '/api/placeholder/100/100'
  }
]

const statusTabs = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' }
]

const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM'
]

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [ratingOrder, setRatingOrder] = useState(null)
  const [userRating, setUserRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  
  // Reschedule modal state
  const [rescheduleOrder, setRescheduleOrder] = useState(null)
  const [newDate, setNewDate] = useState(null)
  const [newTime, setNewTime] = useState('')

  // Filter orders based on active tab
  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders
    return orders.filter(order => order.status === activeTab)
  }, [activeTab])

  // Get status counts for tab badges
  const statusCounts = useMemo(() => {
    const counts = { all: orders.length, upcoming: 0, completed: 0, cancelled: 0 }
    orders.forEach(order => {
      if (order.status === 'upcoming') counts.upcoming++
      else if (order.status === 'completed') counts.completed++
      else if (order.status === 'cancelled') counts.cancelled++
    })
    return counts
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-3 py-1">Upcoming</Badge>
      case 'completed':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full px-3 py-1">Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full px-3 py-1">Cancelled</Badge>
      default:
        return <Badge variant="secondary" className="rounded-full px-3 py-1">{status}</Badge>
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'from-blue-50 to-blue-100 border-blue-200'
      case 'completed':
        return 'from-green-50 to-green-100 border-green-200'
      case 'cancelled':
        return 'from-gray-50 to-gray-100 border-gray-200'
      default:
        return 'from-gray-50 to-gray-100 border-gray-200'
    }
  }

  const handleRateService = (order) => {
    setRatingOrder(order)
    setUserRating(0)
    setReviewComment('')
  }

  const submitRating = () => {
    console.log('Rating submitted:', { orderId: ratingOrder.id, rating: userRating, comment: reviewComment })
    setRatingOrder(null)
    setUserRating(0)
    setReviewComment('')
  }

  const handleReschedule = (order) => {
    setRescheduleOrder(order)
    setNewDate(null)
    setNewTime('')
  }

  const submitReschedule = () => {
    if (newDate && newTime) {
      console.log('Reschedule submitted:', { 
        orderId: rescheduleOrder.id, 
        newDate: newDate.toISOString().split('T')[0], 
        newTime 
      })
      setRescheduleOrder(null)
      setNewDate(null)
      setNewTime('')
    }
  }

  const cancelReschedule = () => {
    setRescheduleOrder(null)
    setNewDate(null)
    setNewTime('')
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-6 lg:px-8 py-16 text-center bg-gradient-to-r from-blue-50 to-blue-100">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">My Orders</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track and manage your pool service appointments. View order details, 
          reschedule services, or book additional maintenance.
        </p>
      </div>

      <div className="px-6 lg:px-8 py-16">
        {/* Status Filter Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {statusTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 font-bold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.label}</span>
                  <span className={`ml-2 py-1 px-2 rounded-full text-sm ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {statusCounts[tab.id]}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-8">
            {filteredOrders.map((order) => (
              <Card 
                key={order.id} 
                className={`hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 bg-gradient-to-r ${getStatusColor(order.status)} cursor-pointer rounded-2xl border overflow-hidden`}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    {/* Service Image */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-md flex-shrink-0">
                      <ImageWithFallback
                        src={order.serviceImage}
                        alt={order.service}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{order.service}</h3>
                          <p className="text-gray-600 mb-1">Provided by {order.company}</p>
                          <p className="text-gray-500">Order #{order.orderId}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                          {getStatusBadge(order.status)}
                          <div className="text-right">
                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                              ${order.finalPrice}
                            </p>
                            {order.discount > 0 && (
                              <p className="text-gray-500 line-through">${order.price}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Date & Time */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <CalendarIcon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                            <p className="text-gray-600">{order.time}</p>
                          </div>
                        </div>

                        {/* Technician */}
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                            <AvatarImage src={order.technician.avatar} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                              {order.technician.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-gray-900">{order.technician.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-gray-600">{order.technician.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Pool */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <MapPin className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{order.pool}</p>
                            <p className="text-gray-600">Pool location</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="border-gray-300 hover:bg-white font-medium rounded-xl"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">Order #{selectedOrder?.orderId}</DialogTitle>
                            </DialogHeader>
                            
                            {selectedOrder && (
                              <div className="space-y-8">
                                {/* Order Summary */}
                                <Card className={`bg-gradient-to-r ${getStatusColor(selectedOrder.status)}`}>
                                  <CardContent className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                      <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedOrder.service}</h3>
                                        <p className="text-gray-600 text-lg mb-1">Provided by {selectedOrder.company}</p>
                                        <p className="text-gray-600">{selectedOrder.pool}</p>
                                      </div>
                                      {getStatusBadge(selectedOrder.status)}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div>
                                        <p className="text-gray-600 mb-1">Date</p>
                                        <p className="font-bold text-gray-900">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-600 mb-1">Time</p>
                                        <p className="font-bold text-gray-900">{selectedOrder.time}</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-600 mb-1">Technician</p>
                                        <p className="font-bold text-gray-900">{selectedOrder.technician.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-600 mb-1">Total</p>
                                        <p className="font-bold text-gray-900 text-xl">${selectedOrder.finalPrice}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Technician Details */}
                                <Card>
                                  <CardContent className="p-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                      <User className="w-6 h-6 text-gray-600" />
                                      Technician Details
                                    </h4>
                                    <div className="flex items-center gap-6">
                                      <Avatar className="w-16 h-16 border-2 border-gray-200">
                                        <AvatarImage src={selectedOrder.technician.avatar} />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg">
                                          {selectedOrder.technician.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <h5 className="font-bold text-gray-900 text-lg mb-2">{selectedOrder.technician.name}</h5>
                                        <div className="flex items-center gap-2 mb-2">
                                          <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                              <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                  i < Math.floor(selectedOrder.technician.rating) 
                                                    ? 'fill-yellow-400 text-yellow-400' 
                                                    : 'text-gray-300'
                                                }`}
                                              />
                                            ))}
                                          </div>
                                          <span className="text-gray-600">{selectedOrder.technician.rating}</span>
                                        </div>
                                        <p className="text-gray-600">{selectedOrder.technician.phone}</p>
                                      </div>
                                      <Button variant="outline" className="font-medium rounded-xl">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Contact
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Service Timeline */}
                                <Card>
                                  <CardContent className="p-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                      <Clock className="w-6 h-6 text-gray-600" />
                                      Service Timeline
                                    </h4>
                                    <div className="space-y-4">
                                      {selectedOrder.timeline.map((item, index) => {
                                        const IconComponent = item.icon
                                        return (
                                          <div key={index} className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                              item.completed ? 'bg-green-100' : 'bg-gray-100'
                                            }`}>
                                              <IconComponent className={`w-6 h-6 ${
                                                item.completed ? 'text-green-600' : 'text-gray-400'
                                              }`} />
                                            </div>
                                            <div className="flex-1">
                                              <p className="font-bold text-gray-900">{item.status}</p>
                                              <p className="text-gray-500">{item.date} at {item.time}</p>
                                            </div>
                                            {item.completed && (
                                              <CheckCircle className="w-6 h-6 text-green-500" />
                                            )}
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Service Photos */}
                                {selectedOrder.photos && (
                                  <Card>
                                    <CardContent className="p-8">
                                      <h4 className="text-xl font-bold text-gray-900 mb-6">Service Photos</h4>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {selectedOrder.photos.map((photo, index) => (
                                          <div key={index} className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
                                            <ImageWithFallback 
                                              src={photo} 
                                              alt={`Service photo ${index + 1}`}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* Payment Summary */}
                                <Card>
                                  <CardContent className="p-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                      <CreditCard className="w-6 h-6 text-gray-600" />
                                      Payment Summary
                                    </h4>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Service Price:</span>
                                        <span className="font-medium text-gray-900">${selectedOrder.price}</span>
                                      </div>
                                      {selectedOrder.discount > 0 && (
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Discount:</span>
                                          <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
                                        </div>
                                      )}
                                      {selectedOrder.pointsApplied > 0 && (
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Points Applied ({selectedOrder.pointsApplied} pts):</span>
                                          <span className="font-medium text-green-600">-${(selectedOrder.pointsApplied / 20).toFixed(0)}</span>
                                        </div>
                                      )}
                                      <Separator />
                                      <div className="flex justify-between">
                                        <span className="font-bold text-gray-900">Total Paid:</span>
                                        <span className="font-bold text-gray-900 text-xl">${selectedOrder.finalPrice}</span>
                                      </div>
                                    </div>
                                    <div className="mt-6">
                                      <Button variant="outline" className="w-full font-medium rounded-xl">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Invoice
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Special Instructions */}
                                {selectedOrder.notes && (
                                  <Card>
                                    <CardContent className="p-8">
                                      <h4 className="text-xl font-bold text-gray-900 mb-4">Special Instructions</h4>
                                      <p className="text-gray-600 bg-gray-50 p-4 rounded-2xl">
                                        {selectedOrder.notes}
                                      </p>
                                    </CardContent>
                                  </Card>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                                  {selectedOrder.status === 'upcoming' && (
                                    <>
                                      <Button 
                                        variant="outline" 
                                        className="flex-1 font-medium rounded-xl"
                                        onClick={() => handleReschedule(selectedOrder)}
                                      >
                                        Reschedule
                                      </Button>
                                      <Button variant="outline" className="flex-1 font-medium text-red-600 border-red-200 hover:bg-red-50 rounded-xl">
                                        Cancel
                                      </Button>
                                    </>
                                  )}
                                  {selectedOrder.status === 'completed' && !selectedOrder.rating && (
                                    <Button 
                                      onClick={() => handleRateService(selectedOrder)}
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium rounded-xl"
                                    >
                                      <Star className="w-4 h-4 mr-2" />
                                      Rate Service
                                    </Button>
                                  )}
                                  <Button 
                                    variant="outline" 
                                    className="font-medium rounded-xl"
                                  >
                                    Book Again
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {order.status === 'upcoming' && (
                          <>
                            <Button 
                              variant="outline" 
                              className="border-gray-300 hover:bg-white font-medium rounded-xl"
                              onClick={() => handleReschedule(order)}
                            >
                              Reschedule
                            </Button>
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 font-medium rounded-xl">
                              Cancel
                            </Button>
                          </>
                        )}
                        
                        {order.status === 'completed' && !order.rating && (
                          <Button 
                            onClick={() => handleRateService(order)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium rounded-xl"
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate Service
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No orders found</h3>
            <p className="text-gray-600 mb-8">You don't have any orders matching this filter.</p>
            <Button 
              onClick={() => setActiveTab('all')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium"
            >
              View All Orders
            </Button>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleOrder && (
        <Dialog open={!!rescheduleOrder} onOpenChange={cancelReschedule}>
          <DialogContent 
            className="w-full max-w-none overflow-hidden"
            style={{ 
              width: '700px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            <div className="flex flex-col gap-6 p-6">
              {/* Modal Header */}
              <DialogHeader className="w-full">
                <DialogTitle className="text-2xl font-bold">Reschedule Service</DialogTitle>
              </DialogHeader>

              {/* Service Info Header Card */}
              <div className="w-full bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">{rescheduleOrder.service}</h4>
                <p className="text-gray-600 mb-1">Provided by {rescheduleOrder.company}</p>
                <p className="text-gray-500">Current: {new Date(rescheduleOrder.date).toLocaleDateString()} at {rescheduleOrder.time}</p>
              </div>

              {/* DateTime Column - Vertical Auto Layout */}
              <div className="flex flex-col gap-6">
                {/* Date Section */}
                <div className="w-full">
                  <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gray-600" />
                    Select New Date
                  </h5>
                  <div className="border rounded-xl bg-white overflow-hidden w-full max-w-[520px] mx-auto">
                    <Calendar
                      mode="single"
                      selected={newDate}
                      onSelect={setNewDate}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                      }}
                      numberOfMonths={1}
                      className="w-full mx-auto"
                    />
                  </div>
                </div>

                {/* Time Section */}
                <div className="w-full">
                  <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    Select New Time
                  </h5>
                  <div className="w-full min-w-[320px]">
                    <Select value={newTime} onValueChange={setNewTime}>
                      <SelectTrigger className="w-full h-11 border-gray-300 focus:ring-blue-500">
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newDate && newTime && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <h6 className="font-bold text-blue-900 mb-2">New Appointment</h6>
                      <p className="text-blue-700">
                        {newDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {newTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Buttons - Horizontal Auto Layout */}
              <div className="flex gap-4 pt-6 border-t border-gray-200 justify-end">
                <Button 
                  variant="outline" 
                  onClick={cancelReschedule}
                  className="font-medium rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={submitReschedule}
                  disabled={!newDate || !newTime}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rating Modal */}
      {ratingOrder && (
        <Dialog open={!!ratingOrder} onOpenChange={() => setRatingOrder(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Rate Your Service</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-2">{ratingOrder.service}</h4>
                <p className="text-gray-600">by {ratingOrder.technician.name}</p>
              </div>

              {/* Star Rating */}
              <div className="text-center">
                <p className="text-gray-700 mb-4">How was your service?</p>
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= userRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <p className="text-gray-600">
                    {userRating === 1 && 'Poor'}
                    {userRating === 2 && 'Fair'}
                    {userRating === 3 && 'Good'}
                    {userRating === 4 && 'Very Good'}
                    {userRating === 5 && 'Excellent'}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-gray-700 mb-2">Comments (optional)</label>
                <Textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full border-gray-300 rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setRatingOrder(null)}
                  className="flex-1 font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={submitRating}
                  disabled={userRating === 0}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium disabled:opacity-50"
                >
                  Submit Rating
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}