
export interface Order {
  id: number
  buyerId: string
  shippingAddress: ShippingAddress
  orderDate: string
  orderItems: OrderItem[]
  orderStatus: string
  subtotal: number
  deliveryFee: number
  total: number
}

export interface ShippingAddress {
  fullName: string
  address1: string
  address2: string
  city: string
  county: string
  postcode: string
  country: string
}

export interface OrderItem {
  productId: number
  name: string
  image: string
  price: number
  quantity: number
}
