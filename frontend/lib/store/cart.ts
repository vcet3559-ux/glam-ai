import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Cart } from '@/types/cart'

interface CartStore {
  cart: Cart | null
  loading: boolean
  error: string | null
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setCart: (cart: Cart) => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,
      error: null,

      addToCart: (item: CartItem) => {
        set((state) => {
          if (!state.cart) {
            return {
              cart: {
                _id: '',
                userId: '',
                items: [item],
                totalItems: 1,
                totalPrice: item.price * item.quantity,
                totalDiscount: (item.discount || 0) * item.quantity,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            }
          }

          const existingItem = state.cart.items.find(
            (i) => i.productId === item.productId && i.selectedShade === item.selectedShade
          )

          let updatedItems: CartItem[]
          if (existingItem) {
            updatedItems = state.cart.items.map((i) =>
              i.productId === item.productId && i.selectedShade === item.selectedShade
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          } else {
            updatedItems = [...state.cart.items, item]
          }

          const totalPrice = updatedItems.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
          )
          const totalDiscount = updatedItems.reduce(
            (acc, i) => acc + ((i.discount || 0) * i.quantity),
            0
          )

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              totalItems: updatedItems.length,
              totalPrice,
              totalDiscount,
              updatedAt: new Date(),
            },
          }
        })
      },

      removeFromCart: (productId: string) => {
        set((state) => {
          if (!state.cart) return state

          const updatedItems = state.cart.items.filter(
            (i) => i.productId !== productId
          )

          const totalPrice = updatedItems.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
          )
          const totalDiscount = updatedItems.reduce(
            (acc, i) => acc + ((i.discount || 0) * i.quantity),
            0
          )

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              totalItems: updatedItems.length,
              totalPrice,
              totalDiscount,
              updatedAt: new Date(),
            },
          }
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }

        set((state) => {
          if (!state.cart) return state

          const updatedItems = state.cart.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          )

          const totalPrice = updatedItems.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
          )
          const totalDiscount = updatedItems.reduce(
            (acc, i) => acc + ((i.discount || 0) * i.quantity),
            0
          )

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              totalPrice,
              totalDiscount,
              updatedAt: new Date(),
            },
          }
        })
      },

      clearCart: () => {
        set({
          cart: null,
        })
      },

      setCart: (cart: Cart) => {
        set({ cart })
      },

      getTotalPrice: () => {
        const state = get()
        return state.cart?.totalPrice || 0
      },

      getTotalItems: () => {
        const state = get()
        return state.cart?.totalItems || 0
      },
    }),
    {
      name: 'cart-store',
    }
  )
)
