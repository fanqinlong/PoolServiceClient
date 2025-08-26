import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { MapPin, Ruler, Droplets, Plus, Calendar, Wrench, Star, Clock, X, CheckCircle, ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { toast } from 'sonner@2.0.3'

const pools = [
  {
    id: 'main-pool',
    name: 'Main Pool',
    address: '123 Oak Street',
    address2: '',
    city: 'Anytown',
    state: 'CA',
    postalCode: '90210',
    country: 'United States',
    size: '20ft x 40ft',
    gallons: '24000',
    type: 'Saltwater',
    heaterType: 'Gas',
    equipment: ['Pump', 'Filter', 'Cleaner'],
    photo: '/api/placeholder/500/300',
    notes: 'Installed in 2020. Saltwater system with automatic cleaner.',
    lastService: '2024-01-12',
    nextService: '2024-01-15',
    serviceHistory: [
      { date: '2024-01-12', service: 'Chemical Balance', technician: 'Sarah Wilson', rating: 5 },
      { date: '2024-01-05', service: 'Pool Cleaning', technician: 'Mike Johnson', rating: 5 },
      { date: '2023-12-28', service: 'Equipment Maintenance', technician: 'Robert Chen', rating: 4 }
    ]
  },
  {
    id: 'spa',
    name: 'Spa',
    address: '123 Oak Street',
    address2: '',
    city: 'Anytown',
    state: 'CA',
    postalCode: '90210',
    country: 'United States',
    size: '8ft x 8ft',
    gallons: '400',
    type: 'Bromine',
    heaterType: 'Electric',
    equipment: ['Pump', 'Filter'],
    photo: '/api/placeholder/500/300',
    notes: 'Attached to main pool. Separate heating system.',
    lastService: '2024-01-10',
    nextService: '2024-01-17',
    serviceHistory: [
      { date: '2024-01-10', service: 'Chemical Balance', technician: 'Sarah Wilson', rating: 5 },
      { date: '2024-01-03', service: 'Deep Clean', technician: 'Mike Johnson', rating: 5 }
    ]
  }
]

const equipmentOptions = ['Pump', 'Filter', 'Skimmer', 'Cleaner', 'Cover']
const countryOptions = ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Australia']

const EditPoolInfoModal = ({ pool, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    waterSystem: '',
    size: '',
    volume: '',
    heaterType: '',
    equipment: [],
    notes: ''
  })
  
  const [errors, setErrors] = useState({})

  // Initialize form data when pool changes
  useEffect(() => {
    if (pool) {
      setFormData({
        name: pool.name || '',
        address: pool.address || '',
        address2: pool.address2 || '',
        city: pool.city || '',
        state: pool.state || '',
        postalCode: pool.postalCode || '',
        country: pool.country || '',
        waterSystem: pool.type || '',
        size: pool.size || '',
        volume: pool.gallons || '',
        heaterType: pool.heaterType || '',
        equipment: pool.equipment || [],
        notes: pool.notes || ''
      })
      setErrors({})
    }
  }, [pool])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
      return () => {
        document.removeEventListener('keydown', handleEscKey)
      }
    }
  }, [isOpen, onClose])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'This field is required'
    if (!formData.city.trim()) newErrors.city = 'This field is required'
    if (!formData.state.trim()) newErrors.state = 'This field is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'This field is required'
    if (!formData.country.trim()) newErrors.country = 'This field is required'
    if (!formData.waterSystem.trim()) newErrors.waterSystem = 'This field is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      toast('Pool info updated', {
        description: 'Your changes were saved successfully.',
        duration: 3000,
        icon: <CheckCircle className="w-4 h-4" />
      })
      onClose()
    }
  }

  const handleEquipmentChange = (equipment, checked) => {
    setFormData(prev => ({
      ...prev,
      equipment: checked 
        ? [...prev.equipment, equipment]
        : prev.equipment.filter(e => e !== equipment)
    }))
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Edit Pool Info</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pool Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                Pool Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Main Pool"
                className={`mt-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-900">Address Line 1</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Street address"
                  className="mt-1 border-gray-300 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="address2" className="text-sm font-medium text-gray-900">Address Line 2</Label>
                <Input
                  id="address2"
                  value={formData.address2}
                  onChange={(e) => handleChange('address2', e.target.value)}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="mt-1 border-gray-300 focus:ring-blue-500"
                />
              </div>

              {/* City, State, Postal Code Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-900">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="City"
                    className={`mt-1 ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-gray-900">
                    Province/State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="State/Province"
                    className={`mt-1 ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>
                
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-medium text-gray-900">
                    Postal Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="Postal Code"
                    className={`mt-1 ${errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Country */}
              <div>
                <Label htmlFor="country" className="text-sm font-medium text-gray-900">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
                  <SelectTrigger className={`mt-1 ${errors.country ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
              </div>
            </div>

            {/* Pool Details - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Water System */}
              <div>
                <Label htmlFor="waterSystem" className="text-sm font-medium text-gray-900">
                  Water System <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.waterSystem} onValueChange={(value) => handleChange('waterSystem', value)}>
                  <SelectTrigger className={`mt-1 ${errors.waterSystem ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}>
                    <SelectValue placeholder="Select water system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chlorine">Chlorine</SelectItem>
                    <SelectItem value="Bromine">Bromine</SelectItem>
                    <SelectItem value="Saltwater">Saltwater</SelectItem>
                  </SelectContent>
                </Select>
                {errors.waterSystem && <p className="mt-1 text-sm text-red-600">{errors.waterSystem}</p>}
              </div>

              {/* Size */}
              <div>
                <Label htmlFor="size" className="text-sm font-medium text-gray-900">Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  placeholder="e.g., 8 ft × 16 ft"
                  className="mt-1 border-gray-300 focus:ring-blue-500"
                />
              </div>

              {/* Volume */}
              <div>
                <Label htmlFor="volume" className="text-sm font-medium text-gray-900">Volume</Label>
                <div className="relative mt-1">
                  <Input
                    id="volume"
                    type="number"
                    value={formData.volume}
                    onChange={(e) => handleChange('volume', e.target.value)}
                    placeholder="24000"
                    className="border-gray-300 focus:ring-blue-500 pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    gallons
                  </span>
                </div>
              </div>

              {/* Heater Type */}
              <div>
                <Label htmlFor="heaterType" className="text-sm font-medium text-gray-900">Heater Type</Label>
                <Select value={formData.heaterType} onValueChange={(value) => handleChange('heaterType', value)}>
                  <SelectTrigger className="mt-1 border-gray-300 focus:ring-blue-500">
                    <SelectValue placeholder="Select heater type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Heat Pump">Heat Pump</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <Label className="text-sm font-medium text-gray-900">Equipment</Label>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {equipmentOptions.map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment}
                      checked={formData.equipment.includes(equipment)}
                      onCheckedChange={(checked) => handleEquipmentChange(equipment, checked)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor={equipment} className="text-sm text-gray-900 cursor-pointer">
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-900">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional information about your pool..."
                rows={4}
                className="mt-1 border-gray-300 focus:ring-blue-500 resize-none"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="px-6 border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

// Pool Detail Panel Component with Improved Layout
const PoolDetailPanel = ({ pool, onBack, onBookService }) => {
  const [isEditingPool, setIsEditingPool] = useState(false)

  const handleEditPool = () => {
    setIsEditingPool(true)
  }

  const handleSavePoolEdit = (formData) => {
    console.log('Saving pool data:', formData)
    setIsEditingPool(false)
  }

  const getPoolTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'saltwater':
        return 'from-blue-500 to-cyan-500'
      case 'chlorine':
        return 'from-green-500 to-emerald-500'
      case 'bromine':
        return 'from-purple-500 to-violet-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="w-full transform transition-all duration-300 ease-out">
      {/* Header with Back Button */}
      <div className="px-6 lg:px-8 py-8 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{pool.name} Details</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">
          Complete information and service history for your {pool.name.toLowerCase()}.
        </p>
      </div>

      <div className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Improved 2-Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
            {/* Pool Image and Basic Info - More responsive sizing */}
            <div className="xl:col-span-2">
              <Card className="overflow-hidden h-fit">
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={pool.photo}
                    alt={pool.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-gradient-to-r ${getPoolTypeColor(pool.type)} text-white shadow-lg`}>
                      {pool.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{pool.name}</h3>
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{pool.address}, {pool.city}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Pool Specifications */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Ruler className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Size</p>
                            <p className="font-bold text-gray-900">{pool.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Capacity</p>
                            <p className="font-bold text-gray-900">{pool.gallons} gal</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Heater Type</span>
                        <span className="font-medium">{pool.heaterType}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Water System</span>
                        <span className="font-medium">{pool.type}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Equipment</span>
                        <span className="font-medium">{pool.equipment.length} items</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-8">
                    <Button 
                      onClick={onBookService}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Book Service
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleEditPool}
                      className="px-4 border-gray-300 hover:bg-gray-50"
                    >
                      <Wrench className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information - Takes up more space */}
            <div className="xl:col-span-3 space-y-8">
              {/* Service Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Service Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Last Service</span>
                      </div>
                      <p className="text-blue-700 font-medium">{new Date(pool.lastService).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Next Service</span>
                      </div>
                      <p className="font-bold text-green-900">{new Date(pool.nextService).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-600" />
                    Equipment & Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {pool.equipment.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-colors">
                        <span className="font-medium text-gray-900">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Service History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pool.serviceHistory.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{service.service}</h4>
                          <p className="text-sm text-gray-600">by {service.technician}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 mb-1">{new Date(service.date).toLocaleDateString()}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < service.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pool Notes */}
              {pool.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pool Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <p className="text-gray-700 leading-relaxed">{pool.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Pool Modal */}
      <EditPoolInfoModal
        pool={pool}
        isOpen={isEditingPool}
        onClose={() => setIsEditingPool(false)}
        onSave={handleSavePoolEdit}
      />
    </div>
  )
}

export default function MyPools({ onNavigateToServices }) {
  const [selectedPool, setSelectedPool] = useState(null)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'detail'
  const [isAddingPool, setIsAddingPool] = useState(false)
  const [isEditingPool, setIsEditingPool] = useState(false)
  const [poolToEdit, setPoolToEdit] = useState(null)
  const [newPool, setNewPool] = useState({
    name: '',
    address: '',
    size: '',
    gallons: '',
    type: '',
    notes: ''
  })

  const handleAddPool = () => {
    setIsAddingPool(false)
    setNewPool({
      name: '',
      address: '',
      size: '',
      gallons: '',
      type: '',
      notes: ''
    })
  }

  const handleEditPool = (pool) => {
    setPoolToEdit(pool)
    setIsEditingPool(true)
  }

  const handleSavePoolEdit = (formData) => {
    console.log('Saving pool data:', formData)
    setIsEditingPool(false)
    setPoolToEdit(null)
  }

  const handleViewDetails = (pool) => {
    setSelectedPool(pool)
    setViewMode('detail')
  }

  const handleBackToList = () => {
    setViewMode('list')
    setSelectedPool(null)
  }

  const handleBookService = () => {
    // Navigate to Services page with transition
    if (onNavigateToServices) {
      setTimeout(() => {
        onNavigateToServices()
      }, 200) // 200ms delay for smooth transition
    }
  }

  const getPoolTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'saltwater':
        return 'from-blue-500 to-cyan-500'
      case 'chlorine':
        return 'from-green-500 to-emerald-500'
      case 'bromine':
        return 'from-purple-500 to-violet-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  // Render Pool Detail View
  if (viewMode === 'detail' && selectedPool) {
    return (
      <PoolDetailPanel
        pool={selectedPool}
        onBack={handleBackToList}
        onBookService={handleBookService}
      />
    )
  }

  // Render Pool List View
  return (
    <div className="w-full transform transition-all duration-300 ease-out">
      {/* Header */}
      <div className="px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">My Pools</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Manage your pool information, view service history, and schedule maintenance 
              for all your pools in one convenient location.
            </p>
          </div>
          <Dialog open={isAddingPool} onOpenChange={setIsAddingPool}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold px-8 py-3 flex-shrink-0">
                <Plus className="w-5 h-5 mr-2" />
                Add Pool
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Add New Pool</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pool-name" className="font-medium">Pool Name</Label>
                    <Input
                      id="pool-name"
                      value={newPool.name}
                      onChange={(e) => setNewPool({ ...newPool, name: e.target.value })}
                      placeholder="e.g., Main Pool"
                      className="border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pool-type" className="font-medium">Pool Type</Label>
                    <Select value={newPool.type} onValueChange={(value) => setNewPool({ ...newPool, type: value })}>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chlorine">Chlorine</SelectItem>
                        <SelectItem value="saltwater">Saltwater</SelectItem>
                        <SelectItem value="bromine">Bromine</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pool-address" className="font-medium">Address</Label>
                  <Input
                    id="pool-address"
                    value={newPool.address}
                    onChange={(e) => setNewPool({ ...newPool, address: e.target.value })}
                    placeholder="Pool location address"
                    className="border-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pool-size" className="font-medium">Dimensions</Label>
                    <Input
                      id="pool-size"
                      value={newPool.size}
                      onChange={(e) => setNewPool({ ...newPool, size: e.target.value })}
                      placeholder="e.g., 20ft x 40ft"
                      className="border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pool-gallons" className="font-medium">Gallons</Label>
                    <Input
                      id="pool-gallons"
                      value={newPool.gallons}
                      onChange={(e) => setNewPool({ ...newPool, gallons: e.target.value })}
                      placeholder="e.g., 24,000"
                      className="border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pool-notes" className="font-medium">Notes</Label>
                  <Textarea
                    id="pool-notes"
                    value={newPool.notes}
                    onChange={(e) => setNewPool({ ...newPool, notes: e.target.value })}
                    placeholder="Additional information about your pool..."
                    rows={3}
                    className="border-gray-200"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddingPool(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddPool} 
                    disabled={!newPool.name || !newPool.address}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Add Pool
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-16">
        {/* Pools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {pools.map((pool) => (
            <Card key={pool.id} className="group hover:shadow-2xl transition-all duration-300 border-gray-200 overflow-hidden">
              {/* Pool Image */}
              <div className="relative h-72 overflow-hidden">
                <ImageWithFallback
                  src={pool.photo}
                  alt={pool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <Badge className={`bg-gradient-to-r ${getPoolTypeColor(pool.type)} text-white shadow-lg`}>
                    {pool.type}
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{pool.name}</h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-5 h-5" />
                    <span>{pool.address}, {pool.city}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                {/* Pool Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Ruler className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Size</p>
                      <p className="font-bold text-gray-900">{pool.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Capacity</p>
                      <p className="font-bold text-gray-900">{pool.gallons} gal</p>
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl mb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Last Service</span>
                      </div>
                      <p className="text-blue-700 font-medium">{new Date(pool.lastService).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Next Service</span>
                      </div>
                      <p className="font-bold text-blue-900">{new Date(pool.nextService).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-gray-300 hover:bg-gray-50 font-medium transition-all duration-300"
                    onClick={() => handleViewDetails(pool)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={handleBookService}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium transition-all duration-200"
                  >
                    Book Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Pool Modal */}
      <EditPoolInfoModal
        pool={poolToEdit}
        isOpen={isEditingPool}
        onClose={() => setIsEditingPool(false)}
        onSave={handleSavePoolEdit}
      />
    </div>
  )
}