import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Separator } from '../ui/separator'
import { Shield, Mail, Phone } from 'lucide-react'

export default function SecuritySection() {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-gray-600" />
          Password & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Change Password</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="font-medium">Current Password</Label>
              <Input id="currentPassword" type="password" className="rounded-2xl border-gray-200" />
            </div>
            <div>
              <Label htmlFor="newPassword" className="font-medium">New Password</Label>
              <Input id="newPassword" type="password" className="rounded-2xl border-gray-200" />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="font-medium">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="rounded-2xl border-gray-200" />
            </div>
            <Button variant="outline" className="rounded-2xl">Update Password</Button>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Login Methods</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email & Password</p>
                  <p className="text-sm text-gray-500">john.doe@email.com</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">SMS Verification</p>
                  <p className="text-sm text-gray-500">Enabled for secure login</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}