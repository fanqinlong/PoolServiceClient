import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Badge } from './components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './components/ui/dropdown-menu'
import { Bell, Waves, ChevronDown, CheckCircle, Clock, Gift, AlertCircle, ArrowLeft, User, Settings, LogOut, Truck, CreditCard, MessageSquare } from 'lucide-react'
import { Toaster } from './components/ui/sonner'
import Dashboard from './components/Dashboard'
import Services from './components/Services'
import Orders from './components/Orders'
import MyPools from './components/MyPools'
import MembershipRewards from './components/MembershipRewards'
import Messages, { getRecentMessages, getUnreadCount } from './components/Messages'
import AccountSettings from './components/AccountSettings'

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'services', label: 'Services' },
  { id: 'orders', label: 'Orders' },
  { id: 'pools', label: 'My Pools' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'messages', label: 'Messages' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [previousTab, setPreviousTab] = useState('dashboard')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const recentMessages = getRecentMessages(5)
  const unreadCount = getUnreadCount()

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (userMenuOpen) {
          setUserMenuOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [userMenuOpen])

  const handleBackFromMessages = () => {
    setActiveTab(previousTab)
  }

  const handleNavigation = (tabId) => {
    setPreviousTab(activeTab)
    setActiveTab(tabId)
    // Close any open dropdowns when navigating
    setUserMenuOpen(false)
  }

  const handleNavigateToServices = () => {
    setPreviousTab(activeTab)
    setActiveTab('services')
    // Close any open dropdowns when navigating
    setUserMenuOpen(false)
  }

  const handleAccountSettings = () => {
    handleNavigation('account')
    setUserMenuOpen(false)
  }

  const handleShippingInfo = () => {
    console.log('Navigate to Shipping Information page')
    setUserMenuOpen(false)
    // In a real app, this would navigate to shipping info page
    setActiveTab('shipping')
  }

  const handlePaymentInfo = () => {
    console.log('Navigate to Payment Information page')
    setUserMenuOpen(false)
    // In a real app, this would navigate to payment info page
    setActiveTab('payment')
  }

  const handleLogout = () => {
    console.log('User logged out - navigate to Login page')
    setUserMenuOpen(false)
    // In a real app, this would handle authentication logout and redirect to login
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigateToServices={handleNavigateToServices} />
      case 'services':
        return <Services />
      case 'orders':
        return <Orders />
      case 'pools':
        return <MyPools onNavigateToServices={handleNavigateToServices} />
      case 'rewards':
        return <MembershipRewards />
      case 'messages':
        return <Messages onBack={handleBackFromMessages} />
      case 'account':
        return <AccountSettings />
      case 'shipping':
        return (
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
            <p className="text-gray-600">Manage your shipping addresses and preferences here.</p>
          </div>
        )
      case 'payment':
        return (
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Payment Information</h1>
            <p className="text-gray-600">Manage your payment methods and billing information here.</p>
          </div>
        )
      default:
        return <Dashboard onNavigateToServices={handleNavigateToServices} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-xl">AquaCare</span>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                  {item.id === 'messages' && unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white p-0 flex items-center justify-center text-xs font-bold shadow-sm border-2 border-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Profile Menu Dropdown */}
              <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Profile menu"
                  >
                    <Avatar className="w-9 h-9 border-2 border-gray-200">
                      <AvatarImage src="/api/placeholder/36/36" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm">JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="font-medium text-gray-900 text-sm">John Doe</p>
                      <p className="text-xs text-gray-500">Silver Member</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 p-2 bg-white rounded-xl shadow-xl border border-gray-100 z-[100] transform-none data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=closed]:scale-95"
                  align="end"
                  sideOffset={8}
                  style={{ 
                    transform: 'none !important',
                    animation: 'none !important'
                  }}
                >
                  {/* Account Settings */}
                  <DropdownMenuItem
                    className="flex items-center gap-3 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors focus:bg-gray-100"
                    onClick={handleAccountSettings}
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Account Settings</span>
                  </DropdownMenuItem>
                  
                  {/* Shipping Information */}
                  <DropdownMenuItem
                    className="flex items-center gap-3 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors focus:bg-gray-100"
                    onClick={handleShippingInfo}
                  >
                    <Truck className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Shipping Information</span>
                  </DropdownMenuItem>
                  
                  {/* Payment Information */}
                  <DropdownMenuItem
                    className="flex items-center gap-3 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors focus:bg-gray-100"
                    onClick={handlePaymentInfo}
                  >
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Payment Information</span>
                  </DropdownMenuItem>

                  {/* Separator */}
                  <DropdownMenuSeparator className="my-2 border-gray-100" />
                  
                  {/* Logout */}
                  <DropdownMenuItem
                    className="flex items-center gap-3 rounded-lg p-3 cursor-pointer hover:bg-red-50 transition-colors focus:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-600">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-100">
            <div className="flex overflow-x-auto py-2 px-2 gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative px-4 py-2 rounded-full font-medium whitespace-nowrap text-sm transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                  {item.id === 'messages' && unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white p-0 flex items-center justify-center text-xs font-bold shadow-sm border border-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full">
        {renderContent()}
      </main>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </div>
  )
}