import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Crown, Star, Gift, Clock, Zap, Trophy, ArrowRight } from 'lucide-react'

const membershipTiers = [
  {
    name: 'Basic',
    color: 'from-gray-400 to-gray-500',
    pointsRequired: 0,
    benefits: ['Standard pricing', 'Email support', 'Service reminders'],
    icon: '🥉'
  },
  {
    name: 'Silver',
    color: 'from-gray-400 to-gray-600',
    pointsRequired: 1000,
    benefits: ['5% discount on services', 'Priority booking', 'Phone support', 'Quarterly pool health report'],
    icon: '🥈'
  },
  {
    name: 'Gold',
    color: 'from-yellow-400 to-yellow-600',
    pointsRequired: 2500,
    benefits: ['10% discount on services', 'Free emergency service', '24/7 support', 'Monthly pool optimization', 'Equipment warranty extension'],
    icon: '🥇'
  },
  {
    name: 'Platinum',
    color: 'from-purple-400 to-purple-600',
    pointsRequired: 5000,
    benefits: ['15% discount on services', 'Free monthly maintenance', 'Personal pool consultant', 'Premium equipment upgrades', 'Exclusive member events'],
    icon: '💎'
  }
]

const pointsHistory = [
  { date: '2024-01-12', description: 'Pool Cleaning Service', points: 85, type: 'earned' },
  { date: '2024-01-10', description: 'Referral Bonus', points: 100, type: 'earned' },
  { date: '2024-01-08', description: 'Redeemed: $10 Service Credit', points: -200, type: 'redeemed' },
  { date: '2024-01-05', description: 'Chemical Balance Service', points: 45, type: 'earned' },
  { date: '2024-01-03', description: 'Equipment Maintenance', points: 120, type: 'earned' }
]

const availableCoupons = [
  {
    id: 1,
    title: '$10 off Pool Cleaning',
    description: 'Valid for any pool cleaning service',
    pointsCost: 200,
    expiryDate: '2024-02-15',
    code: 'CLEAN10',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    title: 'Free Chemical Test',
    description: 'Complimentary water testing and analysis',
    pointsCost: 150,
    expiryDate: '2024-02-28',
    code: 'TESTFREE',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 3,
    title: '20% off Equipment Service',
    description: 'Discount on equipment maintenance or repair',
    pointsCost: 400,
    expiryDate: '2024-03-15',
    code: 'EQUIP20',
    color: 'from-purple-400 to-purple-600'
  }
]

export default function MembershipRewards() {
  const currentPoints = 1247
  const currentTier = 'Silver'
  const nextTier = 'Gold'
  const pointsToNext = 2500 - currentPoints

  const progressPercentage = (currentPoints / 2500) * 100

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Membership & Rewards</h1>
        <p className="text-lg text-gray-600">Earn points with every service and unlock exclusive benefits</p>
      </div>

      {/* Current Status Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🥈</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Silver Member</h2>
                <p className="text-blue-100">Member since January 2023</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{currentPoints.toLocaleString()}</div>
              <p className="text-blue-100">Points Balance</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/90">Progress to {nextTier}</span>
              <span className="text-white/90">{pointsToNext} points to go</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-white to-white/90 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>Silver (1,000 pts)</span>
              <span>Gold (2,500 pts)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="benefits" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="bg-gray-100 rounded-2xl p-1">
            <TabsTrigger value="benefits" className="rounded-2xl font-medium">Membership Benefits</TabsTrigger>
            <TabsTrigger value="rewards" className="rounded-2xl font-medium">Available Rewards</TabsTrigger>
            <TabsTrigger value="history" className="rounded-2xl font-medium">Points History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {membershipTiers.map((tier, index) => {
              const isCurrentTier = tier.name === currentTier
              const isUnlocked = currentPoints >= tier.pointsRequired
              
              return (
                <Card 
                  key={tier.name} 
                  className={`relative rounded-3xl transition-all duration-200 ${
                    isCurrentTier ? 'ring-2 ring-blue-500 shadow-lg' : 
                    isUnlocked ? 'shadow-md hover:shadow-lg' : 'opacity-75'
                  }`}
                >
                  {isCurrentTier && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-sm">
                      Current Tier
                    </Badge>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-2">{tier.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                      <p className="text-gray-600">{tier.pointsRequired.toLocaleString()} points required</p>
                    </div>
                    
                    <div className="space-y-3">
                      {tier.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isUnlocked ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <div className={`w-3 h-3 rounded-full ${
                              isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          </div>
                          <span className={`text-sm ${isUnlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Redeem Points for Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCoupons.map((coupon) => (
                <Card key={coupon.id} className="rounded-3xl hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${coupon.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                        <Gift className="w-8 h-8 text-gray-600" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{coupon.title}</h4>
                      <p className="text-sm text-gray-600">{coupon.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Cost:</span>
                          <span className="font-bold text-blue-600">{coupon.pointsCost} points</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Expires:</span>
                          <span className="text-sm text-gray-700">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className={`w-full rounded-2xl font-semibold ${
                          currentPoints >= coupon.pointsCost 
                            ? `bg-gradient-to-r ${coupon.color} hover:shadow-md text-white` 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={currentPoints < coupon.pointsCost}
                      >
                        {currentPoints >= coupon.pointsCost ? 'Redeem Now' : 'Insufficient Points'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Points Earning Guide */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">How to Earn Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2">Book Services</h4>
                  <p className="text-blue-700">Earn 1 point for every $1 spent on pool services</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2">Leave Reviews</h4>
                  <p className="text-blue-700">Get 25 bonus points for each service review</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2">Refer Friends</h4>
                  <p className="text-blue-700">Earn 100 points for each friend you refer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Points Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pointsHistory.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'earned' ? (
                          <Trophy className="w-6 h-6 text-green-600" />
                        ) : (
                          <Gift className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}