import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Calendar, Clock, Trophy, Plus, Wrench, Sparkles, ArrowRight, Star, User, Phone, CheckCircle, Truck, CreditCard, Download, MapPin } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export default function Dashboard({ onNavigateToServices }) {
  const [selectedService, setSelectedService] = useState(null)

  const upcomingOrders = [
    {
      id: '001',
      service: 'Pool Cleaning',
      company: 'AquaPro Services',
      date: 'Today, 2:00 PM',
      technician: {
        name: 'Mike Johnson',
        avatar: '/api/placeholder/40/40',
        phone: '(555) 123-4567',
        rating: 4.8
      },
      pool: 'Main Pool',
      status: 'confirmed',
      serviceImage: '/api/placeholder/100/100',
      price: 85,
      discount: 0,
      pointsApplied: 0,
      finalPrice: 85,
      notes: 'Please focus on removing algae buildup near the steps',
      timeline: [
        { time: '1:30 PM', status: 'Order confirmed', completed: true, icon: CheckCircle, date: 'Today' },
        { time: '12:00 PM', status: 'Technician assigned', completed: true, icon: User, date: 'Today' },
        { time: '1:45 PM', status: 'Technician en route', completed: false, icon: Truck, date: 'Today' },
        { time: '2:00 PM', status: 'Service in progress', completed: false, icon: Wrench, date: 'Today' }
      ]
    },
    {
      id: '002',
      service: 'Chemical Balance',
      company: 'AquaPro Services',
      date: 'Tomorrow, 10:00 AM',
      technician: {
        name: 'Sarah Wilson',
        avatar: '/api/placeholder/40/40',
        phone: '(555) 987-6543',
        rating: 4.9
      },
      pool: 'Main Pool',
      status: 'scheduled',
      serviceImage: '/api/placeholder/100/100',
      price: 45,
      discount: 5,
      pointsApplied: 200,
      finalPrice: 30,
      notes: '',
      timeline: [
        { time: '9:30 AM', status: 'Order confirmed', completed: true, icon: CheckCircle, date: 'Yesterday' },
        { time: '9:00 AM', status: 'Technician assigned', completed: true, icon: User, date: 'Today' },
        { time: '9:45 AM', status: 'Technician en route', completed: false, icon: Truck, date: 'Tomorrow' },
        { time: '10:00 AM', status: 'Service in progress', completed: false, icon: Wrench, date: 'Tomorrow' }
      ]
    },
    {
      id: '003',
      service: 'Equipment Check',
      company: 'TechPool Solutions',
      date: 'Friday, 1:00 PM',
      technician: {
        name: 'Robert Chen',
        avatar: '/api/placeholder/40/40',
        phone: '(555) 456-7890',
        rating: 4.7
      },
      pool: 'Spa',
      status: 'scheduled',
      serviceImage: '/api/placeholder/100/100',
      price: 120,
      discount: 0,
      pointsApplied: 0,
      finalPrice: 120,
      notes: 'Annual equipment maintenance check',
      timeline: [
        { time: '12:00 PM', status: 'Order confirmed', completed: true, icon: CheckCircle, date: 'Tuesday' },
        { time: '11:00 AM', status: 'Technician assigned', completed: true, icon: User, date: 'Wednesday' },
        { time: '12:45 PM', status: 'Technician en route', completed: false, icon: Truck, date: 'Friday' },
        { time: '1:00 PM', status: 'Service in progress', completed: false, icon: Wrench, date: 'Friday' }
      ]
    }
  ]

  const promotions = [
    {
      title: 'Summer Pool Package',
      description: 'Save 25% on weekly maintenance',
      image: '/api/placeholder/400/200',
      discount: '25% OFF',
      color: 'from-orange-400 to-pink-500'
    },
    {
      title: 'Equipment Upgrade',
      description: '15% off all equipment installations',
      image: '/api/placeholder/400/200',
      discount: '15% OFF',
      color: 'from-green-400 to-teal-500'
    },
    {
      title: 'Refer & Earn',
      description: 'Get $50 credit for each referral',
      image: '/api/placeholder/400/200',
      discount: '$50 CREDIT',
      color: 'from-purple-400 to-blue-500'
    }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">Confirmed</Badge>
      case 'scheduled':
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">Scheduled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'from-green-50 to-green-100 border-green-200'
      case 'scheduled':
        return 'from-blue-50 to-blue-100 border-blue-200'
      default:
        return 'from-gray-50 to-gray-100 border-gray-200'
    }
  }

  const handleBookService = () => {
    // Navigate to Services page with 200ms transition
    if (onNavigateToServices) {
      setTimeout(() => {
        onNavigateToServices()
      }, 200)
    }
  }

  const handleViewDetails = (service) => {
    setSelectedService(service)
  }

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="relative z-10 px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-blue-200" />
              <span className="text-blue-200 font-medium">Welcome back!</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Hey John! 👋</h1>
            <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-2xl">
              Your pool is looking great! Ready to book your next service?
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-3 transition-all duration-200"
                onClick={handleBookService}
              >
                <Wrench className="w-5 h-5 mr-2" />
                Book Service
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-3">
                <Plus className="w-5 h-5 mr-2" />
                Add Pool
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16"></div>
      </div>

      {/* Overview Cards */}
      <div className="px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500 rounded-3xl flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-900 mb-1">Today</div>
                  <p className="text-blue-700 font-medium">Next Service</p>
                </div>
              </div>
              <p className="text-blue-800">Pool cleaning at 2:00 PM</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-green-500 rounded-3xl flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-900 mb-1">1,247</div>
                  <p className="text-green-700 font-medium">Rewards Points</p>
                </div>
              </div>
              <p className="text-green-800">Silver Member Status</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-purple-500 rounded-3xl flex items-center justify-center">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-900 mb-1">$340</div>
                  <p className="text-purple-700 font-medium">This Month</p>
                </div>
              </div>
              <p className="text-purple-800">5 services completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Services */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Services</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {upcomingOrders.map((order) => (
              <Card 
                key={order.id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center">
                        <Wrench className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{order.service}</h4>
                        <p className="text-gray-600 mb-2">
                          {order.date} • <span className="text-gray-500 text-sm">Provided by {order.company}</span>
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{order.technician.name}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{order.pool}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(order.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="font-medium"
                            onClick={() => handleViewDetails(order)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Service Details - {selectedService?.service}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedService && (
                            <div className="space-y-8">
                              {/* Service Summary */}
                              <Card className={`bg-gradient-to-r ${getStatusColor(selectedService.status)}`}>
                                <CardContent className="p-8">
                                  <div className="flex items-center justify-between mb-6">
                                    <div>
                                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedService.service}</h3>
                                      <p className="text-gray-600 text-lg mb-1">Provided by {selectedService.company}</p>
                                      <p className="text-gray-600">{selectedService.pool}</p>
                                    </div>
                                    {getStatusBadge(selectedService.status)}
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                      <p className="text-gray-600 mb-1">Date</p>
                                      <p className="font-bold text-gray-900">{selectedService.date}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600 mb-1">Technician</p>
                                      <p className="font-bold text-gray-900">{selectedService.technician.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600 mb-1">Pool</p>
                                      <p className="font-bold text-gray-900">{selectedService.pool}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600 mb-1">Total</p>
                                      <p className="font-bold text-gray-900 text-xl">${selectedService.finalPrice}</p>
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
                                      <AvatarImage src={selectedService.technician.avatar} />
                                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg">
                                        {selectedService.technician.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <h5 className="font-bold text-gray-900 text-lg mb-2">{selectedService.technician.name}</h5>
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center gap-1">
                                          {[...Array(5)].map((_, i) => (
                                            <Star
                                              key={i}
                                              className={`w-4 h-4 ${
                                                i < Math.floor(selectedService.technician.rating) 
                                                  ? 'fill-yellow-400 text-yellow-400' 
                                                  : 'text-gray-300'
                                              }`}
                                            />
                                          ))}
                                        </div>
                                        <span className="text-gray-600">{selectedService.technician.rating}</span>
                                      </div>
                                      <p className="text-gray-600">{selectedService.technician.phone}</p>
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
                                    {selectedService.timeline.map((item, index) => {
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
                                      <span className="font-medium text-gray-900">${selectedService.price}</span>
                                    </div>
                                    {selectedService.discount > 0 && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Discount:</span>
                                        <span className="font-medium text-green-600">-${selectedService.discount}</span>
                                      </div>
                                    )}
                                    {selectedService.pointsApplied > 0 && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Points Applied ({selectedService.pointsApplied} pts):</span>
                                        <span className="font-medium text-green-600">-${(selectedService.pointsApplied / 20).toFixed(0)}</span>
                                      </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between">
                                      <span className="font-bold text-gray-900">Total:</span>
                                      <span className="font-bold text-gray-900 text-xl">${selectedService.finalPrice}</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Special Instructions */}
                              {selectedService.notes && (
                                <Card>
                                  <CardContent className="p-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">Special Instructions</h4>
                                    <p className="text-gray-600 bg-gray-50 p-4 rounded-2xl">
                                      {selectedService.notes}
                                    </p>
                                  </CardContent>
                                </Card>
                              )}

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                                <Button variant="outline" className="flex-1 font-medium rounded-xl">
                                  Reschedule
                                </Button>
                                <Button variant="outline" className="flex-1 font-medium text-red-600 border-red-200 hover:bg-red-50 rounded-xl">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Special Offers</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              See All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${promo.color} text-white px-3 py-1 rounded-2xl font-bold text-sm shadow-lg`}>
                    {promo.discount}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                  <p className="text-gray-600 mb-6">{promo.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}