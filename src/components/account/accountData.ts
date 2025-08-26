export const invoiceHistory = [
  {
    id: 'INV-2024-001',
    date: '2024-01-12',
    service: 'Pool Cleaning',
    amount: 85,
    status: 'Paid'
  },
  {
    id: 'INV-2024-002',
    date: '2024-01-10',
    service: 'Chemical Balance',
    amount: 45,
    status: 'Paid'
  },
  {
    id: 'INV-2024-003',
    date: '2024-01-05',
    service: 'Equipment Maintenance',
    amount: 120,
    status: 'Paid'
  }
]

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' }
]

export const timezoneOptions = [
  { value: 'PST', label: 'Pacific Standard Time' },
  { value: 'MST', label: 'Mountain Standard Time' },
  { value: 'CST', label: 'Central Standard Time' },
  { value: 'EST', label: 'Eastern Standard Time' }
]

export const currencyOptions = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'CAD', label: 'CAD ($)' },
  { value: 'EUR', label: 'EUR (€)' }
]

export const notificationSettings = [
  {
    key: 'serviceReminders',
    title: 'Service Reminders',
    description: 'Get notified about upcoming appointments'
  },
  {
    key: 'promotionalEmails',
    title: 'Promotional Emails',
    description: 'Receive special offers and promotions'
  },
  {
    key: 'smsUpdates',
    title: 'SMS Updates',
    description: 'Real-time updates via text message'
  },
  {
    key: 'technicalAlerts',
    title: 'Technical Alerts',
    description: 'Important system and service alerts'
  }
]