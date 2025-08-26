import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CreditCard, Download, Plus } from 'lucide-react'
import { invoiceHistory } from './accountData'

export default function BillingSection() {
  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-gray-600" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 1234</p>
                <p className="text-sm text-gray-500">Expires 12/26</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 rounded-xl">Default</Badge>
              <Button variant="outline" size="sm" className="rounded-xl">Edit</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full rounded-2xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoiceHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-gray-900">{invoice.id}</span>
                      <Badge className="bg-green-100 text-green-800 rounded-xl">
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {invoice.service} • {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${invoice.amount}</p>
                  <Button variant="ghost" size="sm" className="mt-1 rounded-xl">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}