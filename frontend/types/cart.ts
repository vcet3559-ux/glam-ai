// Cart Item Type
export interface CartItem {
  _id: string
  productId: string
  product?: Product
  quantity: number
  selectedShade?: string
  price: number
  discount?: number
  addedAt: Date
}

// Cart Type
export interface Cart {
  _id: string
  userId: string
  items: CartItem[]
  totalItems: number
  totalPrice: number
  totalDiscount: number
  createdAt: Date
  updatedAt: Date
}

// Coupon Type
export interface Coupon {
  _id: string
  code: string
  discount: number
  discountType: 'percentage' | 'fixed'
  minOrderAmount?: number
  maxUses?: number
  usedCount: number
  expiryDate: Date
  active: boolean
  createdAt: Date
}

// Shipping Address Type
export interface ShippingAddress {
  _id: string
  userId: string
  fullName: string
  phoneNumber: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pinCode: string
  country: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

// Delivery Method Type
export type DeliveryMethod = 'standard' | 'express' | 'overnight'

export interface DeliveryOption {
  method: DeliveryMethod
  label: string
  estimatedDays: number
  cost: number
}

// Payment Method Type
export type PaymentMethod =
  | 'cod'
  | 'credit_card'
  | 'debit_card'
  | 'upi'
  | 'net_banking'
  | 'wallet'

// Order Item Type
export interface OrderItem {
  productId: string
  productName: string
  brand: string
  quantity: number
  selectedShade?: string
  price: number
  discount?: number
  totalPrice: number
}

// Order Type
export interface Order {
  _id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  discount: number
  couponCode?: string
  couponDiscount?: number
  shippingFee: number
  tax: number
  grandTotal: number
  shippingAddress: ShippingAddress
  contactEmail: string
  contactPhone: string
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'completed' | 'failed'
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  estimatedDelivery: Date
  createdAt: Date
  updatedAt: Date
}

// Order Summary Type
export interface OrderSummary {
  subtotal: number
  discount: number
  couponDiscount: number
  shippingFee: number
  tax: number
  grandTotal: number
}
