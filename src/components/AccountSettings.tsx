import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import ProfileSection from './account/ProfileSection'
import SecuritySection from './account/SecuritySection'
import BillingSection from './account/BillingSection'
import PreferencesSection from './account/PreferencesSection'

export default function AccountSettings() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street, Anytown, CA 90210'
  })

  const [notifications, setNotifications] = useState({
    serviceReminders: true,
    promotionalEmails: true,
    smsUpdates: true,
    technicalAlerts: true
  })

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'PST',
    currency: 'USD'
  })

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (setting, value) => {
    setNotifications(prev => ({ ...prev, [setting]: value }))
  }

  const handlePreferenceChange = (setting, value) => {
    setPreferences(prev => ({ ...prev, [setting]: value }))
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-lg text-gray-600">Manage your personal information and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="bg-gray-100 rounded-2xl p-1">
            <TabsTrigger value="profile" className="rounded-2xl font-medium">Profile</TabsTrigger>
            <TabsTrigger value="security" className="rounded-2xl font-medium">Security</TabsTrigger>
            <TabsTrigger value="billing" className="rounded-2xl font-medium">Billing</TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-2xl font-medium">Preferences</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile">
          <ProfileSection 
            personalInfo={personalInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySection />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSection />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesSection 
            notifications={notifications}
            preferences={preferences}
            onNotificationChange={handleNotificationChange}
            onPreferenceChange={handlePreferenceChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}