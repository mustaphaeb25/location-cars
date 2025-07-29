// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import LoadingSpinner from '../components/LoadingSpinner'; 

// const BlogPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         // --- Dummy Data for Blog Posts ---
//         const dummyPosts = [
//           {
//             id: 1,
//             title: "Top 5 Road Trips in Morocco You Can't Miss",
//             slug: "top-5-road-trips-morocco", // Unique identifier for the URL
//             excerpt: "Morocco offers breathtaking landscapes perfect for an unforgettable road trip. Discover ancient cities, vast deserts, and stunning coastlines.",
//             author: "LuxDrive Team",
//             date: "2025-07-25",
//             imageUrl: "https://images.pexels.com/photos/10851823/pexels-photo-10851823.jpeg",
//             tags: ["Travel", "Morocco", "Adventure"]
//           },
//           {
//             id: 2,
//             title: "Tips for Renting Your First Car: A Beginner's Guide",
//             slug: "tips-renting-first-car",
//             excerpt: "Renting a car for the first time can be daunting. Our guide covers everything from choosing the right vehicle to understanding insurance.",
//             author: "LuxDrive Team",
//             date: "2025-07-20",
//             imageUrl: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg",
//             tags: ["Rental Guide", "Tips", "Beginner"]
//           },
//           {
//             id: 3,
//             title: "Exploring the Atlas Mountains by Car",
//             slug: "exploring-atlas-mountains",
//             excerpt: "Discover the hidden gems and stunning vistas of the Atlas Mountains. A perfect adventure for those who love nature and scenic drives.",
//             author: "Adventure Seeker",
//             date: "2025-07-18",
//             imageUrl: "https://images.pexels.com/photos/6188336/pexels-photo-6188336.jpeg",
//             tags: ["Morocco", "Mountains", "Nature"]
//           }
//         ];
//         setPosts(dummyPosts);
//         // --- End Dummy Data ---

//         // In a real scenario, you'd fetch from an API:
//         // const response = await getBlogPosts(); // Assuming you'd create this API call in services/api.js
//         // setPosts(response.data);
//       } catch (err) {
//         setError("Failed to load blog posts. Please try again later.");
//         console.error("Error fetching blog posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <Container className="my-5 text-center"><LoadingSpinner /></Container>;
//   if (error) return <Container className="my-5 text-center alert alert-danger">{error}</Container>;
//   if (posts.length === 0) return <Container className="my-5 text-center alert alert-info">No blog posts published yet. Check back soon!</Container>;

//   return (
//     <Container className="my-5 fade-in">
//       <h1 className="text-center mb-4">LuxDrive Blog</h1>
//       <p className="lead text-center mb-5 text-muted">
//         Your guide to amazing road trips, rental tips, and car care.
//       </p>

//       <Row xs={1} md={2} lg={3} className="g-4">
//         {posts.map((post) => (
//           <Col key={post.id}>
//             <Card className="h-100 shadow-sm hover-grow">
//               <Card.Img variant="top" src={post.imageUrl} alt={post.title} style={{ height: '200px', objectFit: 'cover' }} />
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title className="h5">{post.title}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted small">
//                   By {post.author} on {new Date(post.date).toLocaleDateString()}
//                 </Card.Subtitle>
//                 <Card.Text className="flex-grow-1">{post.excerpt}</Card.Text>
//                 <div className="mb-2">
//                     {post.tags && post.tags.map(tag => (
//                         <Badge key={tag} bg="info" className="me-1">{tag}</Badge>
//                     ))}
//                 </div>
//                 <Button as={Link} to={`/blog/${post.slug}`} variant="primary" className="mt-auto">
//                   Read More &rarr;
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default BlogPage;