import { useState, useMemo } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Calendar } from './ui/calendar'
import { CalendarIcon, Droplets, Wrench, Zap, TestTube, Clock, CheckCircle, ArrowLeft, ArrowRight, Waves, X, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { ImageWithFallback } from './figma/ImageWithFallback'

const services = [
  {
    id: 'cleaning-1',
    name: 'Pool Cleaning',
    company: 'AquaPro Services',
    description: 'Complete pool cleaning including skimming, vacuuming, and brushing walls',
    price: 85,
    duration: '1-2 hours',
    icon: Droplets,
    popular: true,
    image: '/api/placeholder/400/250',
    features: ['Surface skimming', 'Vacuuming', 'Brush walls & tiles', 'Empty baskets'],
    createdAt: '2024-01-15'
  },
  {
    id: 'chemical-1',
    name: 'Chemical Balance',
    company: 'AquaPro Services',
    description: 'Professional water testing and chemical adjustment for optimal swimming conditions',
    price: 45,
    duration: '30-45 mins',
    icon: TestTube,
    popular: false,
    image: '/api/placeholder/400/250',
    features: ['Water testing', 'pH adjustment', 'Chlorine balancing', 'Algae prevention'],
    createdAt: '2024-01-12'
  },
  {
    id: 'equipment-1',
    name: 'Equipment Service',
    company: 'TechPool Solutions',
    description: 'Complete inspection and maintenance of pumps, filters, and pool equipment',
    price: 120,
    duration: '2-3 hours',
    icon: Wrench,
    popular: false,
    image: '/api/placeholder/400/250',
    features: ['Pump inspection', 'Filter cleaning', 'Equipment diagnostics', 'Performance optimization'],
    createdAt: '2024-01-10'
  },
  {
    id: 'repair-1',
    name: 'Pool Repair',
    company: 'TechPool Solutions',
    description: 'Expert repair services for tiles, liner, and equipment issues',
    price: 150,
    duration: '2-4 hours',
    icon: Zap,
    popular: false,
    image: '/api/placeholder/400/250',
    features: ['Tile repair', 'Liner patching', 'Equipment fixes', '90-day warranty'],
    createdAt: '2024-01-08'
  },
  {
    id: 'opening-1',
    name: 'Pool Opening',
    company: 'Seasonal Pool Care',
    description: 'Complete pool opening service for the swimming season',
    price: 200,
    duration: '3-4 hours',
    icon: Waves,
    popular: true,
    image: '/api/placeholder/400/250',
    features: ['Remove winter cover', 'Equipment startup', 'Water testing', 'Initial cleaning'],
    createdAt: '2024-01-20'
  },
  {
    id: 'maintenance-1',
    name: 'Weekly Maintenance',
    company: 'AquaPro Services',
    description: 'Regular weekly maintenance to keep your pool crystal clear',
    price: 75,
    duration: '1 hour',
    icon: Clock,
    popular: true,
    image: '/api/placeholder/400/250',
    features: ['Regular cleaning', 'Chemical testing', 'Equipment check', 'Filter maintenance'],
    createdAt: '2024-01-18'
  },
  {
    id: 'cleaning-2',
    name: 'Deep Pool Cleaning',
    company: 'Crystal Clear Pools',
    description: 'Intensive deep cleaning service for heavily soiled pools',
    price: 150,
    duration: '3-4 hours',
    icon: Droplets,
    popular: false,
    image: '/api/placeholder/400/250',
    features: ['Algae removal', 'Deep vacuuming', 'Tile scrubbing', 'Filter backwash'],
    createdAt: '2024-01-14'
  },
  {
    id: 'chemical-2',
    name: 'Water Testing & Analysis',
    company: 'Crystal Clear Pools',
    description: 'Comprehensive water analysis with detailed report and recommendations',
    price: 35,
    duration: '30 mins',
    icon: TestTube,
    popular: false,
    image: '/api/placeholder/400/250',
    features: ['12-point water test', 'Digital report', 'Chemical recommendations', 'Treatment plan'],
    createdAt: '2024-01-16'
  },
  {
    id: 'equipment-2',
    name: 'Pump & Filter Service',
    company: 'Seasonal Pool Care',
    description: 'Specialized pump and filter maintenance and repair service',
    price: 95,
    duration: '1-2 hours',
    icon: Wrench,
    popular: false,
    image: '/api/placeholder/400/250',
    features: ['Pump inspection', 'Filter cleaning/replacement', 'Motor check', 'Performance testing'],
    createdAt: '2024-01-11'
  }
]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

const pools = [
  { id: 'main', name: 'Main Pool', address: '123 Oak Street' },
  { id: 'spa', name: 'Spa', address: '123 Oak Street' }
]

const sortOptions = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' }
]

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedPool, setSelectedPool] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [bookingStep, setBookingStep] = useState(1)
  
  // Filter and sort states
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [sortBy, setSortBy] = useState('popular')

  // Get unique companies for filter chips
  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(services.map(service => service.company))]
    return uniqueCompanies.sort()
  }, [])

  // Add/remove company from selected filters
  const toggleCompany = (company) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    )
  }

  // Clear all company filters
  const clearAllCompanyFilters = () => {
    setSelectedCompanies([])
  }

  // Filter and sort services
  const filteredAndSortedServices = useMemo(() => {
    let filtered = services.filter(service => {
      const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(service.company)
      return matchesCompany
    })

    // Sort services
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'popular':
        filtered.sort((a, b) => {
          if (a.popular && !b.popular) return -1
          if (!a.popular && b.popular) return 1
          return 0
        })
        break
      default:
        break
    }

    return filtered
  }, [selectedCompanies, sortBy])

  const handleBookService = (service) => {
    setSelectedService(service)
    setBookingStep(1)
  }

  const handleNextStep = () => {
    if (bookingStep < 5) {
      setBookingStep(bookingStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1)
    }
  }

  const resetBooking = () => {
    setSelectedService(null)
    setSelectedPool('')
    setSelectedDate(null)
    setSelectedTime('')
    setNotes('')
    setBookingStep(1)
  }

  const stepTitles = {
    1: 'Select Your Pool',
    2: 'Choose Date',
    3: 'Pick Time',
    4: 'Review & Notes',
    5: 'Booking Confirmed!'
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-6 lg:px-8 py-16 text-center bg-gradient-to-r from-blue-50 to-blue-100">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Pool Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional pool maintenance and repair services by certified technicians. 
          Choose from our comprehensive range of services to keep your pool pristine.
        </p>
      </div>

      <div className="px-6 lg:px-8 py-16">
        {/* Filter and Sort Bar */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left Side: Company Filter Chips */}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-4">Filter by Company:</h4>
                <div className="flex flex-wrap gap-2">
                  {companies.map((company) => (
                    <button
                      key={company}
                      onClick={() => toggleCompany(company)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                        selectedCompanies.includes(company)
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{company}</span>
                      {selectedCompanies.includes(company) && (
                        <X className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                  
                  {selectedCompanies.length > 0 && (
                    <button
                      onClick={clearAllCompanyFilters}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <span className="font-medium">Clear All</span>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side: Sort Dropdown */}
              <div className="lg:w-64 flex-shrink-0">
                <h4 className="font-medium text-gray-900 mb-4">Sort by:</h4>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <SelectValue placeholder="Sort by..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-gray-600">
            <span>
              Showing {filteredAndSortedServices.length} of {services.length} services
              {selectedCompanies.length > 0 && (
                <span> from {selectedCompanies.length === 1 ? selectedCompanies[0] : `${selectedCompanies.length} companies`}</span>
              )}
            </span>
          </div>
        </div>

        {/* Services Grid */}
        {filteredAndSortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedServices.map((service) => {
              return (
                <Card 
                  key={service.id} 
                  className="group relative hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-gray-100 overflow-hidden cursor-pointer rounded-2xl"
                >
                  {service.popular && (
                    <Badge className="absolute top-6 left-6 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg rounded-full px-3 py-1">
                      ⭐ Popular
                    </Badge>
                  )}
                  
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <CardContent className="p-8">
                    {/* Service Name */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-500">Provided by {service.company}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-gray-500 mb-6">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                        ${service.price}
                      </span>
                      <span className="text-gray-500 ml-2">per service</span>
                    </div>

                    {/* Book Now Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => handleBookService(service)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold py-4 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl"
                        >
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader className="text-center pb-4">
                          <DialogTitle className="text-2xl font-bold">
                            {stepTitles[bookingStep]}
                          </DialogTitle>
                          <div className="flex justify-center mt-4">
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((step) => (
                                <div
                                  key={step}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    step <= bookingStep ? 'bg-blue-500' : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </DialogHeader>
                        
                        {bookingStep === 1 && (
                          <div className="space-y-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Waves className="w-8 h-8 text-white" />
                              </div>
                              <p className="text-gray-600">Which pool needs {selectedService?.name.toLowerCase()}?</p>
                            </div>
                            <div className="space-y-3">
                              {pools.map((pool) => (
                                <div
                                  key={pool.id}
                                  onClick={() => setSelectedPool(pool.id)}
                                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    selectedPool === pool.id
                                      ? 'border-blue-500 bg-blue-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="font-medium text-gray-900">{pool.name}</div>
                                  <div className="text-gray-500">{pool.address}</div>
                                </div>
                              ))}
                            </div>
                            <Button 
                              onClick={handleNextStep} 
                              disabled={!selectedPool}
                              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold"
                            >
                              Continue <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}

                        {bookingStep === 2 && (
                          <div className="space-y-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <CalendarIcon className="w-8 h-8 text-white" />
                              </div>
                              <p className="text-gray-600">When would you like your service?</p>
                            </div>
                            <div className="flex justify-center">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="border-gray-200"
                                disabled={(date) => date < new Date()}
                              />
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={handlePreviousStep} className="flex-1">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                              </Button>
                              <Button onClick={handleNextStep} disabled={!selectedDate} className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold">
                                Continue <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {bookingStep === 3 && (
                          <div className="space-y-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                              </div>
                              <p className="text-gray-600">What time works best for you?</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {timeSlots.map((time) => (
                                <div
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                                    selectedTime === time
                                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={handlePreviousStep} className="flex-1">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                              </Button>
                              <Button onClick={handleNextStep} disabled={!selectedTime} className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold">
                                Continue <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {bookingStep === 4 && (
                          <div className="space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl">
                              <h4 className="font-bold text-blue-900 mb-4">Booking Summary</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Service:</span>
                                  <span className="font-medium text-blue-900">{selectedService?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Company:</span>
                                  <span className="font-medium text-blue-900">{selectedService?.company}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Pool:</span>
                                  <span className="font-medium text-blue-900">{pools.find(p => p.id === selectedPool)?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Date:</span>
                                  <span className="font-medium text-blue-900">{selectedDate ? format(selectedDate, 'PPP') : ''}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Time:</span>
                                  <span className="font-medium text-blue-900">{selectedTime}</span>
                                </div>
                                <div className="border-t border-blue-200 pt-3">
                                  <div className="flex justify-between">
                                    <span className="text-blue-700">Total:</span>
                                    <span className="font-bold text-blue-900 text-xl">${selectedService?.price}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block font-medium text-gray-900 mb-2">Special Instructions (Optional)</label>
                              <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any special instructions for our technician..."
                                rows={3}
                                className="border-gray-200"
                              />
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={handlePreviousStep} className="flex-1">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                              </Button>
                              <Button onClick={handleNextStep} className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-semibold">
                                Confirm & Pay
                              </Button>
                            </div>
                          </div>
                        )}

                        {bookingStep === 5 && (
                          <div className="space-y-6 text-center py-4">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                              <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-green-900 mb-2">Booking Confirmed! 🎉</h3>
                              <p className="text-gray-600">
                                You'll receive a confirmation email shortly with technician details and tracking information.
                              </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl">
                              <p className="font-medium text-gray-900 mb-2">Order #ORD-{Date.now().toString().slice(-6)}</p>
                              <p className="text-gray-600">Expected arrival: {selectedTime}</p>
                              <p className="text-gray-600">Service by: {selectedService?.company}</p>
                            </div>
                            <Button onClick={resetBooking} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold">
                              Book Another Service
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          // Empty state when no services match filters
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No services found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              No services match your current filter criteria. Try selecting different companies or clear all filters.
            </p>
            <Button 
              onClick={clearAllCompanyFilters}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}