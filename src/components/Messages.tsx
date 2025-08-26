import { useState, useMemo } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Bell, AlertCircle, Gift, Settings, CheckCircle, Clock, Star, Wrench, ArrowLeft } from 'lucide-react'

const messages = [
  {
    id: 'msg-001',
    type: 'system',
    title: 'Service Completed',
    description: 'Your pool cleaning service has been completed successfully. Photos and report are now available.',
    date: '2024-01-15',
    time: '3:30 PM',
    read: false,
    icon: CheckCircle,
    iconColor: 'text-green-600',
    priority: 'normal'
  },
  {
    id: 'msg-002',
    type: 'system',
    title: 'Technician En Route',
    description: 'Mike Johnson is on his way for your scheduled pool cleaning service. Expected arrival: 2:15 PM.',
    date: '2024-01-15',
    time: '2:00 PM',
    read: false,
    icon: Clock,
    iconColor: 'text-blue-600',
    priority: 'high'
  },
  {
    id: 'msg-003',
    type: 'promotion',
    title: 'Spring Pool Opening Special',
    description: 'Save 20% on pool opening services this spring! Book now through March 31st.',
    date: '2024-01-14',
    time: '10:00 AM',
    read: true,
    icon: Gift,
    iconColor: 'text-orange-600',
    priority: 'normal'
  },
  {
    id: 'msg-004',
    type: 'system',
    title: 'Payment Processed',
    description: 'Your payment of $85.00 for pool cleaning service has been successfully processed.',
    date: '2024-01-12',
    time: '11:45 AM',
    read: true,
    icon: CheckCircle,
    iconColor: 'text-green-600',
    priority: 'normal'
  },
  {
    id: 'msg-005',
    type: 'system',
    title: 'Service Reminder',
    description: 'Your weekly pool maintenance is scheduled for tomorrow at 10:00 AM with Sarah Wilson.',
    date: '2024-01-11',
    time: '4:00 PM',
    read: false,
    icon: Bell,
    iconColor: 'text-blue-600',
    priority: 'normal'
  },
  {
    id: 'msg-006',
    type: 'promotion',
    title: 'Refer a Friend Program',
    description: 'Earn $25 credit for every friend you refer! They get 15% off their first service too.',
    date: '2024-01-10',
    time: '2:30 PM',
    read: true,
    icon: Star,
    iconColor: 'text-yellow-600',
    priority: 'normal'
  },
  {
    id: 'msg-007',
    type: 'system',
    title: 'Equipment Issue Detected',
    description: 'Our technician noticed your pool filter may need attention. We recommend scheduling a maintenance check.',
    date: '2024-01-08',
    time: '5:15 PM',
    read: true,
    icon: AlertCircle,
    iconColor: 'text-red-600',
    priority: 'high'
  },
  {
    id: 'msg-008',
    type: 'system',
    title: 'Service Review Request',
    description: 'How was your recent pool repair service? Your feedback helps us improve our services.',
    date: '2024-01-05',
    time: '6:00 PM',
    read: true,
    icon: Star,
    iconColor: 'text-yellow-600',
    priority: 'normal'
  },
  {
    id: 'msg-009',
    type: 'promotion',
    title: 'Winter Pool Care Tips',
    description: 'Get ready for winter! Download our free guide for winterizing your pool properly.',
    date: '2024-01-03',
    time: '9:00 AM',
    read: true,
    icon: Settings,
    iconColor: 'text-blue-600',
    priority: 'normal'
  },
  {
    id: 'msg-010',
    type: 'system',
    title: 'New Service Available',
    description: 'We now offer automated pool maintenance systems! Schedule a consultation to learn more.',
    date: '2024-01-01',
    time: '12:00 PM',
    read: true,
    icon: Wrench,
    iconColor: 'text-purple-600',
    priority: 'normal'
  }
]

const messageTabs = [
  { id: 'all', label: 'All' },
  { id: 'system', label: 'System Updates' },
  { id: 'promotion', label: 'Promotions' }
]

export default function Messages({ onBack }) {
  const [activeTab, setActiveTab] = useState('all')

  // Filter messages based on active tab
  const filteredMessages = useMemo(() => {
    if (activeTab === 'all') return messages
    return messages.filter(message => message.type === activeTab)
  }, [activeTab])

  // Get message counts for tab badges
  const messageCounts = useMemo(() => {
    const counts = { 
      all: messages.length, 
      system: messages.filter(m => m.type === 'system').length,
      promotion: messages.filter(m => m.type === 'promotion').length
    }
    return counts
  }, [])

  // Get unread count
  const unreadCount = useMemo(() => {
    return messages.filter(message => !message.read).length
  }, [])

  const markAsRead = (messageId) => {
    // In a real app, this would update the backend
    console.log('Marking message as read:', messageId)
  }

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Marking all messages as read')
  }

  const formatDate = (date) => {
    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-6 lg:px-8 py-16 text-center bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Messages</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with service notifications, promotions, and important system updates. 
          Never miss an important message about your pool care.
        </p>
      </div>

      <div className="px-6 lg:px-8 py-16">
        {/* Back Button and Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            {onBack && (
              <Button 
                onClick={onBack}
                variant="outline" 
                size="sm" 
                className="rounded-full p-2 hover:bg-gray-100 border-gray-200"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Your Messages</h2>
              {unreadCount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-3 py-1">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              variant="outline" 
              className="border-gray-300 hover:bg-gray-50 font-medium rounded-xl"
            >
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Message Type Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {messageTabs.map((tab) => (
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
                    {messageCounts[tab.id]}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length > 0 ? (
          <div className="space-y-4">
            {filteredMessages.map((message) => {
              const IconComponent = message.icon
              return (
                <Card 
                  key={message.id} 
                  className={`hover:shadow-lg transition-all duration-200 cursor-pointer rounded-2xl border ${
                    !message.read 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-md' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => markAsRead(message.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Message Icon */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        !message.read ? 'bg-white shadow-sm' : 'bg-gray-50'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${message.iconColor}`} />
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className={`text-lg ${!message.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                              {message.title}
                            </h3>
                            {!message.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            {message.priority === 'high' && (
                              <Badge className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                                Priority
                              </Badge>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm text-gray-500">{formatDate(message.date)}</p>
                            <p className="text-xs text-gray-400">{message.time}</p>
                          </div>
                        </div>
                        
                        <p className={`leading-relaxed ${
                          !message.read ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                          {message.description}
                        </p>

                        {/* Message Type Badge */}
                        <div className="mt-3">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs rounded-full px-2 py-1 ${
                              message.type === 'system' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {message.type === 'system' ? 'System Update' : 'Promotion'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No messages found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              No messages match the selected category. Check back later for updates.
            </p>
            <Button 
              onClick={() => setActiveTab('all')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium rounded-xl"
            >
              View All Messages
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Export messages data and utility functions for use in the notification dropdown
export { messages }

export const getRecentMessages = (limit = 5) => {
  return messages
    .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
    .slice(0, limit)
}

export const getUnreadCount = () => {
  return messages.filter(message => !message.read).length
}