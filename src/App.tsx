import React, { useState } from 'react';
import { Menu, ShoppingCart, User, Home, UtensilsCrossed } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  menu: MenuItem[];
}

const popularDishes: MenuItem[] = [
  {
    name: "Margherita Pizza",
    price: 18,
    description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dragon Roll",
    price: 24,
    description: "Eel, cucumber, avocado with tobiko topping",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Butter Chicken",
    price: 22,
    description: "Creamy tomato curry with tender chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

const todaysSpecials: MenuItem[] = [
  {
    name: "Truffle Pasta",
    price: 32,
    description: "Fresh fettuccine with black truffle and cream sauce",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Wagyu Beef Ramen",
    price: 28,
    description: "Rich tonkotsu broth with premium wagyu slices",
    image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tandoori Platter",
    price: 36,
    description: "Assorted grilled meats with mint chutney",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Casa Mia",
    cuisine: "Italian",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    menu: [
      {
        name: "Truffle Risotto",
        price: 28,
        description: "Creamy Arborio rice with black truffle and Parmigiano-Reggiano",
        image: "https://images.unsplash.com/photo-1633964913295-ceb43956657e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Osso Buco",
        price: 34,
        description: "Braised veal shanks with gremolata and saffron risotto",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Tiramisu",
        price: 12,
        description: "Classic Italian dessert with mascarpone and coffee",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 2,
    name: "Sakura",
    cuisine: "Japanese",
    image: "https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    menu: [
      {
        name: "Sushi Platter",
        price: 32,
        description: "Assorted fresh nigiri and maki rolls",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Ramen",
        price: 18,
        description: "Tonkotsu ramen with chashu pork",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Tempura",
        price: 24,
        description: "Assorted seafood and vegetable tempura",
        image: "https://images.unsplash.com/photo-1584583570840-0a3d88497593?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: 3,
    name: "Taj Mahal",
    cuisine: "Indian",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    menu: [
      {
        name: "Butter Chicken",
        price: 22,
        description: "Creamy tomato curry with tender chicken",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Biryani",
        price: 24,
        description: "Aromatic rice with spiced lamb",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Naan Basket",
        price: 8,
        description: "Assorted freshly baked Indian breads",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showProcessed, setShowProcessed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      toast.success('Successfully logged in!');
    }
  };

  const addToCart = (item: MenuItem) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`Added ${item.name} to cart!`);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowProcessed(true);
      setTimeout(() => {
        setShowProcessed(false);
        setCart([]);
        toast.success('Thank you for your order! Your food will be delivered soon.');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setSelectedRestaurant(null)} 
                className="flex items-center hover:text-amber-600 transition-colors"
              >
                <Home className="h-6 w-6 mr-2" />
                <span className="text-xl md:text-2xl font-serif text-amber-800">Casa Mia</span>
              </button>
              <div className="hidden md:flex items-center space-x-8 ml-8">
                <button 
                  onClick={() => setSelectedRestaurant(null)}
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Home
                </button>
                <button 
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Restaurants
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="relative hover:text-amber-600 transition-colors"
                onClick={() => isLoggedIn && cart.length > 0 && handleCheckout()}
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                className="hover:text-amber-600 transition-colors"
                onClick={() => !isLoggedIn && setIsLoginOpen(true)}
              >
                <User className="h-6 w-6" />
              </button>
              <button 
                className="md:hidden hover:text-amber-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  setSelectedRestaurant(null);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                Restaurants
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Processing Modal */}
      {showProcessed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <UtensilsCrossed className="h-16 w-16 mx-auto mb-4 text-amber-600 animate-spin" />
            <h2 className="text-xl md:text-2xl font-serif mb-2">Processing Your Order</h2>
            <p className="text-gray-600">Please wait while we confirm your order...</p>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl md:text-2xl font-serif mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedRestaurant ? (
        // Restaurant Detail View
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl md:text-3xl font-serif mb-8">{selectedRestaurant.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {selectedRestaurant.menu.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-800 font-bold">${item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Home View
        <>
          {/* Hero Section */}
          <div className="relative h-[300px] md:h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Italian Restaurant"
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-5xl font-serif mb-4">Welcome to Casa Mia</h1>
                <p className="text-lg md:text-xl">Authentic Italian Cuisine Since 1985</p>
              </div>
            </div>
          </div>

          {/* Today's Specials Section */}
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-serif text-center mb-8 md:mb-12 text-amber-800">Today's Specials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {todaysSpecials.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-bold">${item.price}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Dishes Section */}
          <section className="py-12 md:py-16 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-serif text-center mb-8 md:mb-12 text-amber-800">Popular Dishes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {popularDishes.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-bold">${item.price}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Restaurants Section */}
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-serif text-center mb-8 md:mb-12 text-amber-800">Our Restaurants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {restaurants.map((restaurant) => (
                  <div 
                    key={restaurant.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{restaurant.name}</h3>
                      <p className="text-gray-600">{restaurant.cuisine} Cuisine</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cart Summary */}
          {isLoggedIn && cart.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4 md:mx-0">
              <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
              <div className="max-h-48 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-2 bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;