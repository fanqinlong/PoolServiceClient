import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { User } from 'lucide-react'

interface ProfileSectionProps {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
  onPersonalInfoChange: (field: string, value: string) => void
}

export default function ProfileSection({ personalInfo, onPersonalInfoChange }: ProfileSectionProps) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <Avatar className="w-24 h-24 border-4 border-gray-200">
            <AvatarImage src="/api/placeholder/96/96" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-2xl">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">John Doe</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600">Silver Member</span>
              <span className="text-2xl">🥈</span>
            </div>
            <Button variant="outline" className="rounded-2xl">
              Change Photo
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="font-medium">First Name</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => onPersonalInfoChange('firstName', e.target.value)}
                className="rounded-2xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="font-medium">Last Name</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => onPersonalInfoChange('lastName', e.target.value)}
                className="rounded-2xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="email" className="font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => onPersonalInfoChange('email', e.target.value)}
                className="rounded-2xl border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="font-medium">Phone Number</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => onPersonalInfoChange('phone', e.target.value)}
                className="rounded-2xl border-gray-200"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="font-medium">Address</Label>
            <Input
              id="address"
              value={personalInfo.address}
              onChange={(e) => onPersonalInfoChange('address', e.target.value)}
              className="rounded-2xl border-gray-200"
            />
          </div>

          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl font-semibold">
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}