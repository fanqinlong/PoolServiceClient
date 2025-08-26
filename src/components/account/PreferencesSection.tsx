import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Bell, Globe, HeadphonesIcon, Mail, Phone } from 'lucide-react'
import { notificationSettings, languageOptions, timezoneOptions, currencyOptions } from './accountData'

interface PreferencesSectionProps {
  notifications: Record<string, boolean>
  preferences: {
    language: string
    timezone: string
    currency: string
  }
  onNotificationChange: (setting: string, value: boolean) => void
  onPreferenceChange: (setting: string, value: string) => void
}

export default function PreferencesSection({ 
  notifications, 
  preferences, 
  onNotificationChange, 
  onPreferenceChange 
}: PreferencesSectionProps) {
  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-gray-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationSettings.map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-medium text-gray-900">{setting.title}</p>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <Switch 
                checked={notifications[setting.key]}
                onCheckedChange={(checked) => onNotificationChange(setting.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-gray-600" />
            App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="language" className="font-medium">Language</Label>
            <Select value={preferences.language} onValueChange={(value) => onPreferenceChange('language', value)}>
              <SelectTrigger className="rounded-2xl border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone" className="font-medium">Timezone</Label>
            <Select value={preferences.timezone} onValueChange={(value) => onPreferenceChange('timezone', value)}>
              <SelectTrigger className="rounded-2xl border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {timezoneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currency" className="font-medium">Currency</Label>
            <Select value={preferences.currency} onValueChange={(value) => onPreferenceChange('currency', value)}>
              <SelectTrigger className="rounded-2xl border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {currencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <HeadphonesIcon className="w-6 h-6" />
            Customer Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start rounded-2xl border-blue-200 hover:bg-blue-100">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" className="justify-start rounded-2xl border-blue-200 hover:bg-blue-100">
              <Phone className="w-4 h-4 mr-2" />
              Phone Support
            </Button>
          </div>
          <div className="p-4 bg-blue-100 rounded-2xl">
            <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-3">
              Our customer support team is available Monday-Friday, 8 AM - 6 PM PST
            </p>
            <p className="text-sm text-blue-700">
              <strong>Phone:</strong> (555) 123-POOL<br />
              <strong>Email:</strong> support@aquacare.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}