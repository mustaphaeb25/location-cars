import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiBarChart2, 
  FiTrendingUp, FiPieChart, FiRefreshCw 
} from 'react-icons/fi';
import { 
  FaCar, FaRegChartBar, FaRegCalendarAlt, 
  FaMoneyBillWave, FaUserClock 
} from 'react-icons/fa';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { darkMode } = useTheme();
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with your actual API calls
  const [analyticsData, setAnalyticsData] = useState({
    revenue: [],
    bookings: [],
    vehicleTypes: [],
    userActivity: []
  });

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setAnalyticsData(generateMockData(timeRange));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const generateMockData = (range) => {
    // This would be replaced with actual API calls
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const vehicleTypes = ['Sedan', 'SUV', 'Luxury', 'Sports', 'Van'];
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return {
      revenue: range === 'month' ? 
        months.map(m => ({ name: m, revenue: Math.floor(Math.random() * 50000) + 20000 })) :
        weekDays.map(d => ({ name: d, revenue: Math.floor(Math.random() * 15000) + 5000 })),
      
      bookings: range === 'month' ?
        months.map(m => ({ name: m, bookings: Math.floor(Math.random() * 200) + 50 })) :
        weekDays.map(d => ({ name: d, bookings: Math.floor(Math.random() * 50) + 10 })),
      
      vehicleTypes: vehicleTypes.map(v => ({ 
        name: v, 
        value: Math.floor(Math.random() * 100) + 20 
      })),
      
      userActivity: [
        { name: 'New Users', value: Math.floor(Math.random() * 300) + 100 },
        { name: 'Returning', value: Math.floor(Math.random() * 200) + 50 },
        { name: 'Inactive', value: Math.floor(Math.random() * 100) + 20 }
      ]
    };
  };

  const COLORS = ['#3a7bd5', '#00d2ff', '#00b09b', '#f46b45', '#ed213a'];
  const CARD_COLORS = {
    revenue: '#3a7bd5',
    bookings: '#00b09b',
    vehicles: '#f46b45',
    users: '#8e2de2'
  };

  if (loading) {
    return (
      <div className={`analytics-loading ${darkMode ? 'dark-mode' : ''}`}>
        <div className="loading-spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className={`analytics-page ${darkMode ? 'dark-mode' : ''}`}>
      <Container fluid="xxl" className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="analytics-header">
              <h1 className="page-title">Analytics Dashboard</h1>
              <div className="time-range-selector">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary">
                    <FaRegCalendarAlt className="me-2" />
                    {timeRange === 'month' ? 'Monthly' : 'Weekly'} View
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTimeRange('week')}>Weekly</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTimeRange('month')}>Monthly</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button 
                  className="refresh-btn"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setAnalyticsData(generateMockData(timeRange));
                      setLoading(false);
                    }, 800);
                  }}
                >
                  <FiRefreshCw />
                </button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Summary Cards */}
        <Row className="mb-4 g-4">
          <Col xl={3} lg={6} md={6}>
            <SummaryCard 
              icon={<FiDollarSign />}
              title="Total Revenue"
              value={`$${(analyticsData.revenue.reduce((a, b) => a + b.revenue, 0)).toLocaleString()}`}
              change="+12.5%"
              color={CARD_COLORS.revenue}
            />
          </Col>
          <Col xl={3} lg={6} md={6}>
            <SummaryCard 
              icon={<FaCar />}
              title="Total Bookings"
              value={analyticsData.bookings.reduce((a, b) => a + b.bookings, 0)}
              change="+8.2%"
              color={CARD_COLORS.bookings}
            />
          </Col>
          <Col xl={3} lg={6} md={6}>
            <SummaryCard 
              icon={<FiUsers />}
              title="Active Users"
              value={analyticsData.userActivity[0].value + analyticsData.userActivity[1].value}
              change="+5.7%"
              color={CARD_COLORS.users}
            />
          </Col>
          <Col xl={3} lg={6} md={6}>
            <SummaryCard 
              icon={<FaUserClock />}
              title="Avg. Rental Days"
              value="3.2"
              change="-1.3%"
              color="#00d2ff"
            />
          </Col>
        </Row>

        {/* Main Charts */}
        <Row className="mb-4 g-4">
          <Col xl={8} lg={12}>
            <ChartCard 
              title="Revenue Trend"
              icon={<FiTrendingUp />}
              color={CARD_COLORS.revenue}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2d3748' : '#eee'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#a0aec0' : '#6c757d'} />
                  <YAxis stroke={darkMode ? '#a0aec0' : '#6c757d'} />
                  <Tooltip 
                    contentStyle={{
                      background: darkMode ? '#1e293b' : '#fff',
                      borderColor: darkMode ? '#334155' : '#ddd'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={CARD_COLORS.revenue} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={4} lg={6}>
            <ChartCard 
              title="Vehicle Type Distribution"
              icon={<FaCar />}
              color={CARD_COLORS.vehicles}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.vehicleTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.vehicleTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      background: darkMode ? '#1e293b' : '#fff',
                      borderColor: darkMode ? '#334155' : '#ddd'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={6} lg={6}>
            <ChartCard 
              title="Booking Activity"
              icon={<FaRegChartBar />}
              color={CARD_COLORS.bookings}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.bookings}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2d3748' : '#eee'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#a0aec0' : '#6c757d'} />
                  <YAxis stroke={darkMode ? '#a0aec0' : '#6c757d'} />
                  <Tooltip 
                    contentStyle={{
                      background: darkMode ? '#1e293b' : '#fff',
                      borderColor: darkMode ? '#334155' : '#ddd'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="bookings" 
                    fill={CARD_COLORS.bookings} 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={6} lg={12}>
            <ChartCard 
              title="User Activity"
              icon={<FiUsers />}
              color={CARD_COLORS.users}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.userActivity}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.userActivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      background: darkMode ? '#1e293b' : '#fff',
                      borderColor: darkMode ? '#334155' : '#ddd'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row>
          <Col>
            <RecentActivityCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Component for Summary Cards
const SummaryCard = ({ icon, title, value, change, color }) => {
  const { darkMode } = useTheme();
  const isPositive = change.startsWith('+');

  return (
    <div 
      className={`summary-card ${darkMode ? 'dark-mode' : ''}`}
      style={{ '--card-color': color }}
    >
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
        <div className={`card-change ${isPositive ? 'positive' : 'negative'}`}>
          {change} {isPositive ? '↑' : '↓'}
        </div>
      </div>
      <div className="card-decoration"></div>
    </div>
  );
};

// Component for Chart Cards
const ChartCard = ({ title, icon, color, children }) => {
  const { darkMode } = useTheme();

  return (
    <div 
      className={`chart-card ${darkMode ? 'dark-mode' : ''}`}
      style={{ '--card-color': color }}
    >
      <div className="card-header">
        <div className="header-icon">
          {icon}
        </div>
        <h3 className="header-title">{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
      <div className="card-decoration"></div>
    </div>
  );
};

// Component for Recent Activity
const RecentActivityCard = () => {
  const { darkMode } = useTheme();
  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Booked a Tesla Model S', time: '10 mins ago', status: 'completed' },
    { id: 2, user: 'Sarah Smith', action: 'Cancelled booking', time: '25 mins ago', status: 'cancelled' },
    { id: 3, user: 'Mike Johnson', action: 'Extended rental', time: '1 hour ago', status: 'pending' },
    { id: 4, user: 'Emma Wilson', action: 'New account created', time: '2 hours ago', status: 'completed' },
    { id: 5, user: 'David Brown', action: 'Submitted review', time: '3 hours ago', status: 'completed' }
  ];

  return (
    <div className={`activity-card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="card-header">
        <h3 className="header-title">Recent Activity</h3>
      </div>
      <div className="activity-list">
        {recentActivity.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              {activity.status === 'completed' ? (
                <div className="icon-completed">✓</div>
              ) : activity.status === 'cancelled' ? (
                <div className="icon-cancelled">✕</div>
              ) : (
                <div className="icon-pending">⏳</div>
              )}
            </div>
            <div className="activity-content">
              <p className="activity-text">
                <span className="user-name">{activity.user}</span> {activity.action}
              </p>
              <p className="activity-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;