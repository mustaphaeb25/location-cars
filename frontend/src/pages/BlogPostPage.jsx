// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Button, Image } from 'react-bootstrap';
// import LoadingSpinner from '../components/LoadingSpinner';

// const BlogPostPage = () => {
//   const { slug } = useParams(); // Get the slug from the URL
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         // --- Dummy Data for Single Blog Post (should match a post from BlogPage.jsx) ---
//         const dummyPosts = [
//             {
//                 id: 1,
//                 title: "Top 5 Road Trips in Morocco You Can't Miss",
//                 slug: "top-5-road-trips-morocco",
//                 excerpt: "Morocco offers breathtaking landscapes perfect for an unforgettable road trip. Discover ancient cities, vast deserts, and stunning coastlines.",
//                 author: "LuxDrive Team",
//                 date: "2025-07-25",
//                 imageUrl: "https://via.placeholder.com/800x400/20B2AA/FFFFFF?text=Morocco+Road+Trip",
//                 content: `
//                     <p>Morocco offers an incredible array of landscapes perfect for a road trip. From the majestic Atlas Mountains to the serene Sahara Desert and vibrant coastal cities, renting a car gives you the freedom to explore at your own pace.</p>
//                     <p>Here are our top 5 recommendations for road trips you can't miss:</p>
//                     <h2>1. Imperial Cities Loop</h2>
//                     <p>Discover the rich history and culture of Fes, Marrakech, Meknes, and Rabat. This route is packed with historical sites, bustling souks, and delicious food. It's a journey through Morocco's historical heartland.</p>
//                     <p><strong>Highlights:</strong> Bahia Palace (Marrakech), Jemaa el-Fna square (Marrakech), Chouara Tannery (Fes), Hassan II Mosque (Casablanca).</p>
//                     <h2>2. Desert Adventure to Merzouga</h2>
//                     <p>For the truly adventurous, a road trip to the Sahara Desert, specifically the Erg Chebbi dunes near Merzouga, is an unforgettable experience. Drive through palm groves, oases, and traditional Berber villages.</p>
//                     <p><strong>Highlights:</strong> Camel trekking at sunset, sleeping under the stars in a desert camp, traditional Berber hospitality.</p>
//                     <h2>3. Coastal Drive: Casablanca to Essaouira</h2>
//                     <p>If you prefer the ocean breeze, a drive along the Atlantic coast offers beautiful beaches, charming fishing towns, and vibrant coastal cities. Essaouira is a particularly captivating destination with its fortified medina and artistic vibe.</p>
//                     <p><strong>Highlights:</strong> El Jadida's Portuguese City, Safi's pottery, Essaouira's medina and seafood.</p>
//                     <h2>4. Chefchaouen & Northern Charms</h2>
//                     <p>Head north to explore the picturesque blue city of Chefchaouen, nestled in the Rif Mountains. This region offers a cooler climate and stunning natural beauty, along with the historical cities of Tangier and Tetouan.</p>
//                     <p><strong>Highlights:</strong> Exploring Chefchaouen's blue alleys, panoramic views from Akchour waterfalls, vibrant markets of Tangier.</p>
//                     <h2>5. Anti-Atlas and Berber Villages</h2>
//                     <p>For a deeper dive into traditional Berber culture and untouched landscapes, venture into the Anti-Atlas mountains. This route offers dramatic rock formations, ancient granaries, and a glimpse into rural Moroccan life.</p>
//                     <p><strong>Highlights:</strong> Tafraoute's painted rocks, Imilchil's marriage festival, traditional argan oil cooperatives.</p>
//                     <p>Remember to choose the right vehicle for your journey. A 4x4 might be ideal for desert adventures, while a compact car is perfect for city exploration. Book your perfect ride with LuxDrive today!</p>
//                 `
//             },
//             {
//                 id: 2,
//                 title: "Tips for Renting Your First Car: A Beginner's Guide",
//                 slug: "tips-renting-first-car",
//                 excerpt: "New to car rentals? Read our essential tips to ensure a smooth and hassle-free experience, from booking to drop-off...",
//                 author: "LuxDrive Team",
//                 date: "2025-07-20",
//                 imageUrl: "https://via.placeholder.com/800x400/5F9EA0/FFFFFF?text=Rental+Tips",
//                 content: `
//                     <p>Renting a car for the first time can seem daunting, but with a few tips, you can make the process smooth and stress-free. Here's what you need to know before you pick up your keys and hit the road:</p>
//                     <h2>1. Book in Advance</h2>
//                     <p>Especially during peak seasons or if you need a specific type of car, booking your car well in advance ensures availability and often secures better rates. Last-minute rentals can be more expensive.</p>
//                     <h2>2. Understand Insurance Options</h2>
//                     <p>Familiarize yourself with the different types of insurance offered (e.g., Collision Damage Waiver (CDW), Theft Protection (TP), Supplemental Liability Insurance (SLI)). Understand what's included in your base rate and what additional coverage you might need. Don't be afraid to ask questions!</p>
//                     <h2>3. Inspect the Car Thoroughly</h2>
//                     <p>Before leaving the rental lot, meticulously inspect the car for any existing damages (scratches, dents, cracks). Take photos or videos as proof and ensure all damages are noted on the rental agreement before you drive away. This protects you from being charged for pre-existing damage.</p>
//                     <h2>4. Know the Fuel Policy</h2>
//                     <p>Most common policies are 'full to full' or 'full to empty'. Be clear about which policy applies to your rental. Returning the car with less fuel than required can result in significant refueling charges.</p>
//                     <h2>5. Check the Mileage Policy</h2>
//                     <p>Confirm if your rental comes with unlimited mileage or if there's a daily/total mileage cap. Exceeding mileage limits can lead to unexpected extra charges.</p>
//                     <h2>6. Familiarize Yourself with the Vehicle</h2>
//                     <p>Before driving off, take a moment to locate essential controls: headlights, wipers, hazards, fuel cap release, and how to operate the transmission (especially if it's different from what you usually drive).</p>
//                     <h2>7. Return on Time</h2>
//                     <p>Returning the car late can incur additional fees, often a full day's rental. If you anticipate a delay, contact the rental company as soon as possible.</p>
//                     <p>By keeping these tips in mind, your first car rental experience will be a breeze, allowing you to focus on enjoying your journey!</p>
//                 `
//             }
//         ];
//         // Find the post by slug
//         const foundPost = dummyPosts.find(p => p.slug === slug);
//         if (foundPost) {
//           setPost(foundPost);
//         } else {
//           setError("Post not found.");
//         }
//         // In a real scenario, you'd fetch from an API:
//         // const response = await getBlogPostBySlug(slug); // Assuming this API call exists
//         // setPost(response.data);
//       } catch (err) {
//         setError("Failed to load post. Please try again later.");
//         console.error("Error fetching blog post:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [slug]);

//   if (loading) return <Container className="my-5 text-center"><LoadingSpinner /></Container>;
//   if (error) return <Container className="my-5 text-center alert alert-danger">{error}</Container>;
//   if (!post) return <Container className="my-5 text-center alert alert-warning">Post not found.</Container>;

//   return (
//     <Container className="my-5 fade-in">
//       <Button variant="outline-secondary" onClick={() => navigate('/blog')} className="mb-4">
//         &larr; Back to Blog
//       </Button>
//       {post.imageUrl && (
//         <Image src={post.imageUrl} alt={post.title} fluid rounded className="mb-4" />
//       )}
//       <h1 className="mb-3">{post.title}</h1>
//       <p className="text-muted mb-4">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
//       {/* dangerouslySetInnerHTML is used because content is likely HTML from a rich text editor */}
//       <div dangerouslySetInnerHTML={{ __html: post.content }} />
//     </Container>
//   );
// };

// export default BlogPostPage;