// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Form, InputGroup, Button, Alert } from 'react-bootstrap';
// import CarCard from '../components/CarCard';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { getCars } from '../services/api';
// import { FaSearch, FaFilter, FaSortAmountDown, FaTimes } from 'react-icons/fa';
// import { useTheme } from '../contexts/ThemeContext';

// const CarListingPage = () => {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterBrand, setFilterBrand] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [filterPrice, setFilterPrice] = useState('');
//   const [sortOption, setSortOption] = useState('default');
//   const [showFilters, setShowFilters] = useState(false);
//   const { darkMode } = useTheme();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setLoading(true);
//         const response = await getCars();
//         setCars(response.data);
//         setFilteredCars(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch car listings. Please try again later.");
//         setLoading(false);
//         console.error("Error fetching cars:", err);
//       }
//     };
//     fetchCars();
//   }, []);

//   useEffect(() => {
//     let currentCars = [...cars];

//     // Apply filters
//     if (searchTerm) {
//       currentCars = currentCars.filter(car =>
//         car.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         car.modele.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterBrand) {
//       currentCars = currentCars.filter(car => car.marque.toLowerCase() === filterBrand.toLowerCase());
//     }

//     if (filterStatus) {
//       currentCars = currentCars.filter(car => car.statut.toLowerCase() === filterStatus.toLowerCase());
//     }

//     if (filterPrice) {
//       currentCars = currentCars.filter(car => car.prix_par_jour <= parseFloat(filterPrice));
//     }

//     // Apply sorting
//     switch (sortOption) {
//       case 'price-asc':
//         currentCars.sort((a, b) => a.prix_par_jour - b.prix_par_jour);
//         break;
//       case 'price-desc':
//         currentCars.sort((a, b) => b.prix_par_jour - a.prix_par_jour);
//         break;
//       case 'newest':
//         currentCars.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//         break;
//       default:
//         // Default sorting (by ID or as returned from API)
//         break;
//     }

//     setFilteredCars(currentCars);
//   }, [searchTerm, filterBrand, filterStatus, filterPrice, sortOption, cars]);

//   const uniqueBrands = [...new Set(cars.map(car => car.marque))];
//   const activeFiltersCount = [filterBrand, filterStatus, filterPrice, sortOption !== 'default'].filter(Boolean).length;

//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilterBrand('');
//     setFilterStatus('');
//     setFilterPrice('');
//     setSortOption('default');
//   };

//   return (
//     <div className={`car-listing-page ${darkMode ? 'dark-mode' : ''}`}>
//       <Container className="py-5">
//         <div className="page-header text-center mb-5">
//           <h1 className="page-title">Our Luxury Fleet</h1>
//           <p className="page-subtitle">Find your perfect vehicle for any occasion</p>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="filter-bar mb-5">
//           <div className="main-search">
//             <InputGroup className="mb-3">
//               <InputGroup.Text>
//                 <FaSearch />
//               </InputGroup.Text>
//               <Form.Control
//                 placeholder="Search by brand or model..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//               <Button 
//                 variant={activeFiltersCount ? 'primary' : 'outline-secondary'}
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="filter-toggle"
//               >
//                 <FaFilter className="me-2" />
//                 Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//               </Button>
//             </InputGroup>
//           </div>

//           {showFilters && (
//             <div className="advanced-filters">
//               <Row className="g-3">
//                 <Col md={3}>
//                   <Form.Select 
//                     value={filterBrand} 
//                     onChange={(e) => setFilterBrand(e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Brands</option>
//                     {uniqueBrands.map((brand, index) => (
//                       <option key={index} value={brand}>{brand}</option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Select 
//                     value={filterStatus} 
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Statuses</option>
//                     <option value="disponible">Available</option>
//                     <option value="réservée">Reserved</option>
//                     <option value="en maintenance">Maintenance</option>
//                   </Form.Select>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Control
//                     type="number"
//                     placeholder="Max daily price"
//                     value={filterPrice}
//                     onChange={(e) => setFilterPrice(e.target.value)}
//                     className="price-input"
//                   />
//                 </Col>
//                 <Col md={3}>
//                   <InputGroup>
//                     <InputGroup.Text>
//                       <FaSortAmountDown />
//                     </InputGroup.Text>
//                     <Form.Select 
//                       value={sortOption} 
//                       onChange={(e) => setSortOption(e.target.value)}
//                       className="sort-select"
//                     >
//                       <option value="default">Default</option>
//                       <option value="price-asc">Price: Low to High</option>
//                       <option value="price-desc">Price: High to Low</option>
//                       <option value="newest">Newest Arrivals</option>
//                     </Form.Select>
//                   </InputGroup>
//                 </Col>
//               </Row>
              
//               {activeFiltersCount > 0 && (
//                 <div className="filter-actions mt-3">
//                   <Button 
//                     variant="link" 
//                     onClick={clearFilters}
//                     className="clear-filters"
//                   >
//                     <FaTimes className="me-1" />
//                     Clear all filters
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Results Section */}
//         {loading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <Alert variant="danger" className="text-center">{error}</Alert>
//         ) : filteredCars.length === 0 ? (
//           <div className="no-results text-center py-5">
//             <h3>No cars match your search criteria</h3>
//             <p className="text-muted mb-4">Try adjusting your filters or search term</p>
//             <Button variant="primary" onClick={clearFilters}>
//               Clear all filters
//             </Button>
//           </div>
//         ) : (
//           <>
//             <div className="results-count mb-3">
//               Showing {filteredCars.length} of {cars.length} vehicles
//             </div>
            
//             <Row xs={1} md={2} lg={3} xl={4} className="g-4">
//               {filteredCars.map((car) => (
//                 <Col key={car.id}>
//                   <CarCard car={car} />
//                 </Col>
//               ))}
//             </Row>
//           </>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default CarListingPage;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCars } from '../services/api';
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes, FaCar } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';


const CarListingPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getCars();
        setCars(response.data);
        setFilteredCars(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car listings. Please try again later.");
        setLoading(false);
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let currentCars = [...cars];

    // Apply filters
    if (searchTerm) {
      currentCars = currentCars.filter(car =>
        car.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modele.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBrand) {
      currentCars = currentCars.filter(car => car.marque.toLowerCase() === filterBrand.toLowerCase());
    }

    if (filterStatus) {
      currentCars = currentCars.filter(car => car.statut.toLowerCase() === filterStatus.toLowerCase());
    }

    if (filterPrice) {
      currentCars = currentCars.filter(car => car.prix_par_jour <= parseFloat(filterPrice));
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        currentCars.sort((a, b) => a.prix_par_jour - b.prix_par_jour);
        break;
      case 'price-desc':
        currentCars.sort((a, b) => b.prix_par_jour - a.prix_par_jour);
        break;
      case 'newest':
        currentCars.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        // Default sorting (by ID or as returned from API)
        break;
    }

    setFilteredCars(currentCars);
  }, [searchTerm, filterBrand, filterStatus, filterPrice, sortOption, cars]);

  const uniqueBrands = [...new Set(cars.map(car => car.marque))];
  const activeFiltersCount = [filterBrand, filterStatus, filterPrice, sortOption !== 'default'].filter(Boolean).length;

  const clearFilters = () => {
    setSearchTerm('');
    setFilterBrand('');
    setFilterStatus('');
    setFilterPrice('');
    setSortOption('default');
  };

  return (
    <div className={`car-listing-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <div className="cars-hero">
        <div className="hero-overlay">
          <Container>
            <div className="hero-content text-center">
              <div className="hero-icon">
                <FaCar />
              </div>
              <h1 className="hero-title">Our Luxury Fleet</h1>
              <p className="hero-subtitle">
                Discover the perfect vehicle for every journey
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        {/* Search and Filter Bar */}
        <div className="filter-bar mb-5">
          <div className="main-search">
            <InputGroup className="mb-3">
              <InputGroup.Text className="search-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search by brand, model, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <Button 
                variant={activeFiltersCount ? 'primary' : 'outline-secondary'}
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle"
              >
                <FaFilter className="me-2" />
                Filters {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount}</span>}
              </Button>
            </InputGroup>
          </div>

          {showFilters && (
            <div className="advanced-filters animate__animated animate__fadeIn">
              <Row className="g-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="filter-label">Brand</Form.Label>
                    <Form.Select 
                      value={filterBrand} 
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Brands</option>
                      {uniqueBrands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="filter-label">Status</Form.Label>
                    <Form.Select 
                      value={filterStatus} 
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Statuses</option>
                      <option value="disponible">Available</option>
                      <option value="réservée">Reserved</option>
                      <option value="en maintenance">Maintenance</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="filter-label">Max Daily Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter max price"
                      value={filterPrice}
                      onChange={(e) => setFilterPrice(e.target.value)}
                      className="price-input"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="filter-label">Sort By</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="sort-icon">
                        <FaSortAmountDown />
                      </InputGroup.Text>
                      <Form.Select 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value)}
                        className="sort-select"
                      >
                        <option value="default">Recommended</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest Arrivals</option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              
              {activeFiltersCount > 0 && (
                <div className="filter-actions mt-3 text-center">
                  <Button 
                    variant="link" 
                    onClick={clearFilters}
                    className="clear-filters"
                  >
                    <FaTimes className="me-1" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-5">
            <LoadingSpinner />
            <p className="mt-3">Loading our premium fleet...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            <h5>Couldn't load vehicles</h5>
            <p>{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()} className="mt-2">
              Try Again
            </Button>
          </Alert>
        ) : filteredCars.length === 0 ? (
          <div className="no-results text-center py-5">
            <div className="no-results-icon mb-4">
              <FaCar />
            </div>
            <h3>No vehicles match your search</h3>
            <p className="text-muted mb-4">Try adjusting your filters or search term</p>
            <Button variant="primary" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <div className="results-header mb-4">
              <div className="results-count">
                Showing <span className="highlight">{filteredCars.length}</span> of {cars.length} vehicles
              </div>
              <div className="sort-mobile d-md-none">
                <Form.Select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </Form.Select>
              </div>
            </div>
            
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {filteredCars.map((car) => (
                <Col key={car.id}>
                  <CarCard car={car} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default CarListingPage;