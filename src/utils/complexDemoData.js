const complexDemoData = `
const { useState, useEffect, useCallback, useMemo, useRef } = React;
const { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} = Recharts;
const { 
  Sun, Moon, Wind, Droplet, Battery, Info, Search, 
  User, LogOut, Menu, X, ShoppingCart, Mail, Phone,
  MapPin, Facebook, Twitter, Instagram, LinkedIn
} = LucideReact;

// Simulated data
const energyData = [
  { name: 'Jan', solar: 4000, wind: 2400, hydro: 2400 },
  { name: 'Feb', solar: 3000, wind: 1398, hydro: 2210 },
  { name: 'Mar', solar: 2000, wind: 9800, hydro: 2290 },
  { name: 'Apr', solar: 2780, wind: 3908, hydro: 2000 },
  { name: 'May', solar: 1890, wind: 4800, hydro: 2181 },
  { name: 'Jun', solar: 2390, wind: 3800, hydro: 2500 },
  { name: 'Jul', solar: 3490, wind: 4300, hydro: 2100 },
];

const productData = [
  { id: 1, name: 'Solar Panel X1', price: 299.99, category: 'solar', stock: 50 },
  { id: 2, name: 'Wind Turbine Pro', price: 1299.99, category: 'wind', stock: 20 },
  { id: 3, name: 'Hydro Generator H2O', price: 799.99, category: 'hydro', stock: 30 },
  { id: 4, name: 'Energy Storage Unit', price: 599.99, category: 'storage', stock: 40 },
  { id: 5, name: 'Smart Energy Meter', price: 149.99, category: 'smart', stock: 100 },
];

// Utility functions
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const generateRandomData = (length, max) => {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
};

// Custom hooks
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Components
const Header = ({ currentPage, setCurrentPage, theme, toggleTheme, isLoggedIn, setIsLoggedIn }) => (
  <header className={\`bg-\${theme === 'dark' ? 'gray-800' : 'green-600'} text-white p-4\`}>
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">EcoEnergy Solutions</h1>
      <nav className="hidden md:block">
        <ul className="flex space-x-4">
          {['home', 'about', 'dashboard', 'products', 'contact'].map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={\`hover:text-green-200 \${currentPage === page ? 'underline' : ''} capitalize\`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center">
            <LogOut size={20} className="mr-2" /> Logout
          </button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)} className="flex items-center">
            <User size={20} className="mr-2" /> Login
          </button>
        )}
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </div>
  </header>
);

const Footer = ({ theme }) => (
  <footer className={\`bg-\${theme === 'dark' ? 'gray-800' : 'green-600'} text-white p-4 mt-12\`}>
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">EcoEnergy Solutions</h3>
        <p>Empowering a sustainable future through innovative renewable energy solutions.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ul>
          <li className="flex items-center mb-2"><Mail size={16} className="mr-2" /> info@ecoenergy.com</li>
          <li className="flex items-center mb-2"><Phone size={16} className="mr-2" /> +1 (555) 123-4567</li>
          <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 Green Street, Eco City, EC 12345</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-green-300"><Facebook size={24} /></a>
          <a href="#" className="hover:text-green-300"><Twitter size={24} /></a>
          <a href="#" className="hover:text-green-300"><Instagram size={24} /></a>
          <a href="#" className="hover:text-green-300"><LinkedIn size={24} /></a>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center">
      <p>&copy; 2024 EcoEnergy Solutions. All rights reserved.</p>
    </div>
  </footer>
);

const EnergyChart = ({ data }) => (
  <div className="h-64 md:h-96">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="solar" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="wind" stroke="#82ca9d" />
        <Line type="monotone" dataKey="hydro" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const EnergyTypeCard = ({ icon: Icon, title, description, value, unit }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <Icon className="w-12 h-12 text-green-500 mb-4" />
    <h3 className="text-gray-600 dark:text-gray-300 text-xl font-semibold mb-2 ">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
      {value} {unit}
    </div>
  </div>
);

const SearchBar = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Simulated API call for suggestions
      const mockSuggestions = ['Solar Panels', 'Wind Turbines', 'Hydro Solutions', 'Energy Storage']
        .filter(item => item.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <div className="flex items-center border rounded-full overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className={\`flex-grow p-2 outline-none \${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}\`}
        />
        <button className={\`p-2 \${theme === 'dark' ? 'bg-gray-600' : 'bg-green-500'} text-white\`}>
          <Search size={20} />
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className={\`absolute z-10 w-full mt-1 border rounded-md shadow-lg \${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}\`}>
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => setSearchTerm(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={\`fixed bottom-4 right-4 \${bgColor} text-white p-4 rounded-md shadow-lg flex items-center\`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X size={20} />
      </button>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Pages
const HomePage = ({ theme }) => {
  const [currentEnergy, setCurrentEnergy] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEnergy(prev => (prev + 1) % 101);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="container mx-auto mt-8 p-4">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Welcome to EcoEnergy Solutions</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300">Empowering a sustainable future through innovative renewable energy solutions.</p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Current Energy Production</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <Battery className="w-16 h-16 text-green-500 mr-4" />
            <div className="text-gray-600 dark:text-gray-300 text-4xl font-bold">{currentEnergy}%</div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Energy Production Overview</h2>
        <EnergyChart data={energyData} />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Energy Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EnergyTypeCard 
            icon={Sun} 
            title="Solar Energy"
            description="Harness the power of the sun with our advanced solar panels."
            value={4.5}
            unit="kW"
          />
          <EnergyTypeCard 
            icon={Wind} 
            title="Wind Energy"
            description="Capture the wind's potential with our efficient turbines."
            value={3.2}
            unit="MW"
          />
          <EnergyTypeCard 
            icon={Droplet} 
            title="Hydro Energy"
            description="Utilize the force of water with our hydro solutions."
            value={2.8}
            unit="GW"
          />
        </div>
      </section>
    </main>
    );
};

const AboutPage = ({ theme }) => {
  return (
    <main className="container mx-auto mt-8 p-4">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">About EcoEnergy Solutions</h2>
        <div className={\`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md \${theme === 'dark' ? 'text-white' : 'text-gray-800'}\`}>
          <div className="flex items-start mb-6">
            <Info className="w-12 h-12 text-green-500 mr-4 flex-shrink-0" />
            <p>
              EcoEnergy Solutions is at the forefront of renewable energy innovation. 
              Founded in 2010, we've been dedicated to creating a sustainable future 
              through cutting-edge solar, wind, and hydro technologies.
            </p>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="mb-6">
            To accelerate the world's transition to sustainable energy by providing 
            efficient, affordable, and accessible renewable energy solutions.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Our Achievements</h3>
          <ul className="list-disc list-inside">
            <li>Installed over 1 million solar panels worldwide</li>
            <li>Developed cutting-edge wind turbine technology with 30% higher efficiency</li>
            <li>Pioneered small-scale hydro solutions for remote areas, benefiting 500,000 people</li>
            <li>Reduced carbon emissions by an estimated 5 million tons annually</li>
            <li>Awarded "Green Innovation of the Year" for three consecutive years</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Dr. Emily Chen", role: "Chief Technology Officer", bio: "Ph.D. in Renewable Energy Systems, 15 years of research experience." },
            { name: "Michael Rodriguez", role: "Head of Sustainability", bio: "Environmental policy expert, former advisor to UN on climate change." },
            { name: "Sarah Johnson", role: "Director of Operations", bio: "MBA, led large-scale solar installations across three continents." }
          ].map((member, index) => (
            <div key={index} className={\`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md \${theme === 'dark' ? 'text-white' : 'text-gray-800'}\`}>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-green-600 dark:text-green-400 mb-2">{member.role}</p>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const DashboardPage = ({ theme }) => {
  const energyProduction = useMemo(() => ({
    solar: generateRandomData(7, 100),
    wind: generateRandomData(7, 100),
    hydro: generateRandomData(7, 100)
  }), []);

  const totalProduction = energyProduction.solar.reduce((a, b) => a + b, 0) +
                          energyProduction.wind.reduce((a, b) => a + b, 0) +
                          energyProduction.hydro.reduce((a, b) => a + b, 0);

  const pieData = [
    { name: 'Solar', value: energyProduction.solar.reduce((a, b) => a + b, 0) },
    { name: 'Wind', value: energyProduction.wind.reduce((a, b) => a + b, 0) },
    { name: 'Hydro', value: energyProduction.hydro.reduce((a, b) => a + b, 0) }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <main className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-8">Energy Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {['Solar', 'Wind', 'Hydro'].map((type, index) => (
          <div key={index} className={\`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md \${theme === 'dark' ? 'text-white' : 'text-gray-800'}\`}>
            <h3 className="text-xl font-semibold mb-2">{type} Energy</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {energyProduction[type.toLowerCase()].reduce((a, b) => a + b, 0)} kWh
            </p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Weekly Production</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="solar" fill="#0088FE" />
                <Bar dataKey="wind" fill="#00C49F" />
                <Bar dataKey="hydro" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Energy Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => \`\${name} \${(percent * 100).toFixed(0)}%\`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className={\`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md \${theme === 'dark' ? 'text-white' : 'text-gray-800'}\`}>
        <h3 className="text-2xl font-bold mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-lg font-semibold">Total Production</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalProduction} kWh</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Carbon Offset</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{(totalProduction * 0.7).toFixed(2)} tons</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Efficiency Rate</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{(Math.random() * (0.95 - 0.85) + 0.85).toFixed(2) * 100}%</p>
          </div>
        </div>
      </div>
    </main>
  );
};

const ProductsPage = ({ theme, addToast }) => {
  const [products, setProducts] = useState(productData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    addToast(\`Added \${product.name} to cart\`, 'success');
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setIsModalOpen(false);
    addToast('Product updated successfully', 'success');
  };

  return (
    <main className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-8">Our Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className={\`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md \${theme === 'dark' ? 'text-white' : 'text-gray-800'}\`}>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-green-600 dark:text-green-400 text-lg font-bold mb-2">{formatCurrency(product.price)}</p>
            <p className="mb-4">Category: {product.category}</p>
            <p className="mb-4">In Stock: {product.stock}</p>
            <div className="flex justify-between">
              <button 
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Product"
      >
        {selectedProduct && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSaveProduct({
              ...selectedProduct,
              name: e.target.name.value,
              price: parseFloat(e.target.price.value),
              stock: parseInt(e.target.stock.value)
            });
          }}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input type="text" name="name" defaultValue={selectedProduct.name} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input type="number" name="price" defaultValue={selectedProduct.price} step="0.01" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Stock</label>
              <input type="number" name="stock" defaultValue={selectedProduct.stock} className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Changes</button>
          </form>
        )}
      </Modal>
    </main>
  );
};

const ContactPage = ({ theme, addToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    addToast('Message sent successfully!', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="mb-4">We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={\`w-full p-2 border rounded \${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}\`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={\`w-full p-2 border rounded \${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}\`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className={\`w-full p-2 border rounded \${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}\`}
              ></textarea>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Send Message
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Office</h3>
          <div className={\`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md \${theme === 'dark' ? 'text-white' : 'text-gray-800'}\`}>
            <p className="flex items-center mb-2">
              <MapPin className="mr-2" size={20} />
              123 Green Street, Eco City, EC 12345
            </p>
            <p className="flex items-center mb-2">
              <Phone className="mr-2" size={20} />
              +1 (555) 123-4567
            </p>
            <p className="flex items-center mb-4">
              <Mail className="mr-2" size={20} />
              info@ecoenergy.com
            </p>
            <h4 className="text-xl font-semibold mb-2">Business Hours</h4>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className={\`text-\${theme === 'dark' ? 'white' : 'gray-800'} hover:text-green-500\`}><Facebook size={24} /></a>
              <a href="#" className={\`text-\${theme === 'dark' ? 'white' : 'gray-800'} hover:text-green-500\`}><Twitter size={24} /></a>
              <a href="#" className={\`text-\${theme === 'dark' ? 'white' : 'gray-800'} hover:text-green-500\`}><Instagram size={24} /></a>
              <a href="#" className={\`text-\${theme === 'dark' ? 'white' : 'gray-800'} hover:text-green-500\`}><LinkedIn size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  }, [theme]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage theme={theme} />;
      case 'about':
        return <AboutPage theme={theme} />;
      case 'dashboard':
        return <DashboardPage theme={theme} />;
      case 'products':
        return <ProductsPage theme={theme} addToast={addToast} />;

      default:
        return <HomePage theme={theme} />;
    }
  };

  return (
    <div className={\`min-h-screen \${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}\`}>
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        theme={theme} 
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="mb-4">
        <SearchBar theme={theme} />
      </div>
      {renderPage()}
     
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
    </div>
  );
};

const Component = App;
`;

export default complexDemoData;
