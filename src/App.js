import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, MapPin, Phone, Mail, Clock, Star, 
  Menu, X, ChevronRight, Check, Instagram, Facebook, 
   ShieldCheck 
} from 'lucide-react';

/* ========================================
  DATA & CONFIGURATION
  ========================================
*/

const STORE_INFO = {
  name: "Peekaboo The Kids Palace",
  location: "Sundarapuram, Coimbatore, Tamil Nadu",
  phone: "+91 98765 43210",
  email: "hello@peekabookidspalace.com",
  hours: "Mon-Sat 9AM-8PM, Sun 10AM-6PM"
};

const THEME = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  text: '#1F2937',
  textLight: '#6B7280',
  bg: '#F9FAFB',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  gradientHover: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const PRODUCT_CATEGORIES = [
  {
    id: 1,
    name: "Educational Toys",
    description: "STEM kits, learning games, puzzles, and brain development toys for all ages",
    image: "/edt.png",
    items: ["STEM Robotics Kits", "Building Blocks", "Science Experiment Sets", "Educational Puzzles", "Learning Tablets"]
  },
  {
    id: 2,
    name: "Baby Care Products",
    category: "Baby Care",
    description: "Organic and safe baby care essentials for your little ones",
    image: "/BCareP.png",
    items: ["Baby Lotions & Oils", "Diapers", "Baby Powder", "Organic Soaps", "Feeding Bottles"]
  },
  
  {
    id: 4,
    name: "Soft Toys & Plushies",
    description: "Cuddly teddy bears, stuffed animals, and comfort companions",
    image: "/BTeddy.png",
    items: ["Giant Teddy Bears", "Stuffed Animals", "Character Plushies", "Baby Soft Toys", "Pillows & Cushions"]
  },
  {
    id: 5,
    name: "Baby Dress",
    description: "Classic and modern board games for family entertainment",
    image: "/dress.png",
    items: ["Baby Bodysuits", "Tops & Shirts", "Ruffled skirts.", "Coats"]
  },
  {
    id: 6,
    name: "Baby Accessories",
    description: "Essential baby accessories designed for comfort, safety, and everyday convenience",
    image: "/BACC.png",
    items: ["Walking supporters", "Baby carriers", "Feeding bottles", "Bath kits"]
  },
];

const GALLERY_DATA = [
  { id: 1, type: "Store", image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80", title: "Store Front" },
  { id: 2, type: "Toys", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80", title: "Toy Collection" },
  { id: 3, type: "Baby", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80", title: "Baby Products" },
  { id: 4, type: "Events", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", title: "Store Opening" },
  { id: 5, type: "Toys", image: "https://images.unsplash.com/photo-1560582861-45078880e48e?w=800&q=80", title: "Educational Section" },
  { id: 6, type: "Baby", image: "https://images.unsplash.com/photo-1616627988077-b301f31b5c58?w=800&q=80", title: "Baby Care Corner" },
  { id: 7, type: "Events", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80", title: "Kids Birthday Party" },
  { id: 8, type: "Store", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", title: "Interior View" },
  { id: 9, type: "Toys", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80", title: "Electronic Toys" },
  { id: 10, type: "Baby", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80", title: "Infant Products" },
  { id: 11, type: "Events", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", title: "Art Workshop" },
  { id: 12, type: "Store", image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80", title: "Shopping Area" },
];

/* ========================================
  STYLES (CSS-IN-JS)
  ========================================
*/

const styles = {
  container: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    color: THEME.text,
    backgroundColor: THEME.bg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #E5E7EB',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  logo: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: '1.5rem',
    fontWeight: '800',
    background: THEME.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: 'pointer',
    letterSpacing: '-0.5px',
  },
hero: {
    position: 'relative',
    minHeight: '85vh',
    
    // Corrected line below:
    background: `url("/peekaboo/public/store.png")`, 
    // Note: I added a leading '/' assuming 'peekaboo' is a folder in your public directory.
    // If the image is directly in the public folder, use: url("/Gemini_Generated_Image_714ucu714ucu714u.png")
    
    backgroundSize: 'cover',   
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '2rem',
}
  ,
  heroContent: {
    maxWidth: '1200px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
    zIndex: 10,
  },
  heading: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: '3.5rem',
    lineHeight: '1.1',
    fontWeight: '800',
    marginBottom: '1.5rem',
    color: '#111827',
  },
  button: {
    padding: '0.8rem 1.8rem',
    borderRadius: '50px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
  },
  primaryBtn: {
    background: THEME.gradient,
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
  },
  secondaryBtn: {
    background: 'white',
    color: THEME.primary,
    border: `2px solid ${THEME.primary}`,
  },
  section: {
    padding: '5rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  card: {
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: THEME.shadow,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #F3F4F6',
    position: 'relative',
  },
  footer: {
    background: '#111827',
    color: 'white',
    padding: '4rem 2rem',
    marginTop: 'auto',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  modalContent: {
    background: 'white',
    borderRadius: '1.5rem',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  featureIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'rgba(99, 102, 241, 0.1)',
    color: THEME.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  }
};

/* ========================================
  COMPONENTS
  ========================================
*/

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap');
    
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    
    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: ${THEME.shadowHover} !important;
    }
    
    .float-anim-1 { animation: float 6s ease-in-out infinite; }
    .float-anim-2 { animation: float 8s ease-in-out infinite reverse; }
    .float-anim-3 { animation: float 7s ease-in-out infinite 1s; }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

    @media (max-width: 768px) {
      .hero-title { font-size: 2.5rem !important; }
      .mobile-hide { display: none !important; }
      .grid-mobile { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

const Button = ({ children, variant = 'primary', style, ...props }) => (
  <button 
    style={{
      ...styles.button,
      ...(variant === 'primary' ? styles.primaryBtn : styles.secondaryBtn),
      ...style
    }}
    onMouseEnter={(e) => {
      if (variant === 'primary') e.target.style.background = THEME.gradientHover;
    }}
    onMouseLeave={(e) => {
      if (variant === 'primary') e.target.style.background = THEME.gradient;
    }}
    {...props}
  >
    {children}
  </button>
);

const SectionHeading = ({ title, subtitle, align = 'center' }) => (
  <div style={{ textAlign: align, marginBottom: '3rem' }}>
    <h3 style={{ 
      color: THEME.secondary, 
      textTransform: 'uppercase', 
      letterSpacing: '2px', 
      fontSize: '0.875rem', 
      fontWeight: '700',
      marginBottom: '0.5rem'
    }}>
      {subtitle}
    </h3>
    <h2 style={{ 
      fontFamily: '"Poppins", sans-serif', 
      fontSize: '2.5rem', 
      color: '#111827',
      margin: 0
    }}>
      {title}
    </h2>
    <div style={{ 
      width: '80px', 
      height: '4px', 
      background: THEME.gradient, 
      margin: align === 'center' ? '1.5rem auto 0' : '1.5rem 0 0',
      borderRadius: '2px'
    }}></div>
  </div>
);

const Home = ({ setPage, openCategoryModal }) => (
  <div className="fade-in">
    {/* HERO SECTION */}
    <div style={styles.hero}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '3rem', opacity: 0.2 }} className="float-anim-1">🎈</div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', fontSize: '4rem', opacity: 0.2 }} className="float-anim-2">🧸</div>
      <div style={{ position: 'absolute', top: '15%', right: '20%', fontSize: '2rem', opacity: 0.2 }} className="float-anim-3">⭐</div>

      <div style={styles.heroContent}>
        <div>
          <span style={{ 
            background: 'rgba(99, 102, 241, 0.1)', 
            color: THEME.primary, 
            padding: '0.5rem 1rem', 
            borderRadius: '20px', 
            fontWeight: '600', 
            fontSize: '0.9rem',
            display: 'inline-block',
            marginBottom: '1.5rem'
          }}>
            #1 Kids Store in Coimbatore
          </span>
          <h1 className="hero-title" style={styles.heading}>
            Where Little Dreams <br/>
            <span style={{ 
              background: THEME.gradient, 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>Come to Life</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: THEME.textLight, marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Discover a magical collection of premium toys, safe baby care products, and educational kits. Located in the heart of Sundarapuram.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => window.scrollTo({ top: document.getElementById('products-section').offsetTop - 80, behavior: 'smooth' })}>
              Explore Products <ShoppingBag size={18} />
            </Button>
            <Button variant="outline" onClick={() => setPage('contact')}>Visit Store <MapPin size={18} /></Button>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', color: THEME.textLight, fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color={THEME.success} /> Safe & Non-Toxic
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={16} color={THEME.warning} /> 4.9/5 Rating
            </div>
          </div>
        </div>
        
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '100%', 
            paddingBottom: '100%', 
            background: 'linear-gradient(135deg, #E0E7FF 0%, #F3E8FF 100%)', 
            borderRadius: '50% 40% 60% 50% / 50% 50% 60% 40%',
            position: 'relative',
            animation: 'float 8s ease-in-out infinite'
          }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10rem' }}>
              🦄
            </div>
          </div>
        </div>
      </div>
    </div>

    

    {/* PRODUCT CATEGORIES SECTION */}
    <div id="products-section" style={{ ...styles.section, background: 'white' }}>
      <SectionHeading title="Our Product Range" subtitle="What We Offer" />
      <p style={{ textAlign: 'center', color: THEME.textLight, maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
        Browse through our extensive collection of toys, games, and baby care products
      </p>
      <div style={styles.grid}>
        {PRODUCT_CATEGORIES.map(category => (
          <CategoryCard key={category.id} category={category} onOpen={openCategoryModal} />
        ))}
      </div>
    </div>

    {/* TESTIMONIALS */}
    <div style={styles.section}>
      <SectionHeading title="Happy Parents" subtitle="Testimonials" />
      <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {[
          { name: "Priya S.", role: "Mother of 2", text: "Peekaboo has the best collection in Coimbatore! The educational toys really helped my son with his focus.", rating: 5 },
          { name: "Rahul K.", role: "Tech Lead", text: "Bought the STEM kit for my niece. Great quality and genuine pricing. Highly recommended!", rating: 5 },
          { name: "Anitha R.", role: "Doctor", text: "I love their organic baby care range. It's hard to find such authentic products locally.", rating: 4 }
        ].map((review, idx) => (
          <div key={idx} style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: THEME.shadow }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < review.rating ? THEME.warning : '#E5E7EB'} color={i < review.rating ? THEME.warning : '#E5E7EB'} />
              ))}
            </div>
            <p style={{ fontStyle: 'italic', color: '#4B5563', marginBottom: '1.5rem', lineHeight: 1.6 }}>"{review.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: THEME.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                {review.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#111827' }}>{review.name}</div>
                <div style={{ fontSize: '0.8rem', color: THEME.textLight }}>{review.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="fade-in" style={styles.section}>
    <SectionHeading title="Our Story" subtitle="About Us" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
      <div>
        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#111827' }}>More Than Just A Toy Store</h3>
        <p style={{ color: THEME.textLight, marginBottom: '1.5rem', lineHeight: 1.7 }}>
          Founded in 2023 in Sundarapuram, Coimbatore, <strong>Peekaboo The Kids Palace</strong> was born from a simple idea: children deserve the best start in life. We aren't just selling products; we are curating experiences that foster growth, joy, and safety.
        </p>
        <p style={{ color: THEME.textLight, marginBottom: '2rem', lineHeight: 1.7 }}>
          Our mission is to provide parents with access to world-class educational tools and safe care products. We believe in the power of play to shape the future.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: THEME.primary }}>5k+</div>
            <div style={{ color: THEME.textLight }}>Happy Customers</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: THEME.primary }}>500+</div>
            <div style={{ color: THEME.textLight }}>Unique Products</div>
          </div>
        </div>
      </div>
      <div style={{ 
  height: '400px',
  borderRadius: '2rem',
  overflow: 'hidden',
  boxShadow: THEME.shadow
}}>
  <img
    src="/store.png"   // ← change to your image path
    alt="Peekaboo Store"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</div>
    </div>

    <div style={{ marginTop: '5rem' }}>
      <h3 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem' }}>Our Core Values</h3>
      <div style={styles.grid}>
        {['Child Safety First', 'Educational Value', 'Ethical Sourcing', 'Community Focus', 'Customer Delight', 'Continuous Innovation'].map((val, idx) => (
          <div key={idx} style={{ 
            padding: '1.5rem', 
            background: 'white', 
            borderRadius: '1rem', 
            borderLeft: `4px solid ${THEME.primary}`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            fontWeight: '600'
          }}>
            {val}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Store', 'Toys', 'Baby', 'Events'];
  
  const filteredImages = activeTab === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(img => img.type === activeTab);

  return (
    <div className="fade-in" style={styles.section}>
      <SectionHeading title="Peek Inside" subtitle="Gallery" />
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? `2px solid ${THEME.primary}` : '2px solid transparent',
              padding: '0.5rem 1rem',
              color: activeTab === tab ? THEME.primary : THEME.textLight,
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filteredImages.map(img => (
          <div key={img.id} style={{ 
            height: '250px', 
            borderRadius: '1rem', 
            overflow: 'hidden', 
            position: 'relative',
            cursor: 'pointer'
          }} className="hover-lift">
            <img 
              src={img.image} 
              alt={img.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: '600'
            }}>
              {img.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="fade-in" style={styles.section}>
    <SectionHeading title="Visit Us" subtitle="Get In Touch" />
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: THEME.shadow }}>
          <div style={styles.featureIcon}><MapPin size={24} /></div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Address</h4>
            <p style={{ margin: 0, color: THEME.textLight }}>{STORE_INFO.location}</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: THEME.shadow }}>
          <div style={styles.featureIcon}><Phone size={24} /></div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Phone</h4>
            <p style={{ margin: 0, color: THEME.textLight }}>{STORE_INFO.phone}</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: THEME.shadow }}>
          <div style={styles.featureIcon}><Mail size={24} /></div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Email</h4>
            <p style={{ margin: 0, color: THEME.textLight }}>{STORE_INFO.email}</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: THEME.shadow }}>
          <div style={styles.featureIcon}><Clock size={24} /></div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Store Hours</h4>
            <p style={{ margin: 0, color: THEME.textLight }}>{STORE_INFO.hours}</p>
          </div>
        </div>

       <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
  <a 
    href="https://www.facebook.com/peekaboo.thekidspalace/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <div style={{ 
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: THEME.primary,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }} className="hover-lift">
      <Facebook size={20} />
    </div>
  </a>

  <a 
    href="https://www.instagram.com/peekaboo_thekidspalace/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <div style={{ 
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: THEME.primary,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }} className="hover-lift">
      <Instagram size={20} />
    </div>
  </a>
</div>
</div>

      <a
  href="https://google.com/maps/search/?api=1&query=10.95402408055,76.974197747266"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none', color: 'inherit' }}
>
  <div style={{ 
    height: '100%',
    minHeight: '400px',
    background: '#E5E7EB',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer'
  }} className="hover-lift">

    <div style={{ 
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#6B7280'
    }}>
      <MapPin size={48} style={{ marginBottom: '1rem' }} />
      <span style={{ fontWeight: '600' }}>Open in Google Maps</span>
      <span style={{ fontSize: '0.9rem' }}>
        Sundarapuram, Coimbatore
      </span>
    </div>

  </div>
</a>
    </div>
  </div>
);

const CategoryCard = ({ category, onOpen }) => (
  <div style={styles.card} className="hover-lift" onClick={() => onOpen(category)}>
    <div style={{ height: '200px', overflow: 'hidden' }}>
      <img 
        src={category.image} 
        alt={category.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.75rem 0', fontWeight: '700', color: '#111827' }}>
        {category.name}
      </h3>
      <p style={{ color: THEME.textLight, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
        {category.description}
      </p>
      <button style={{
        background: 'transparent',
        border: `2px solid ${THEME.primary}`,
        color: THEME.primary,
        padding: '0.5rem 1.5rem',
        borderRadius: '50px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease'
      }}>
        View Details <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const CategoryModal = ({ category, onClose }) => {
  if (!category) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()} className="fade-in">
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 1 }}
        >
          <X size={24} />
        </button>
        
        <div style={{ height: '300px', overflow: 'hidden' }}>
          <img 
            src={category.image} 
            alt={category.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontFamily: '"Poppins", sans-serif' }}>{category.name}</h2>
          
          <p style={{ color: '#4B5563', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.1rem' }}>
            {category.description}
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#111827' }}>Products Available:</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {category.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#374151' }}>
                  <div style={{ background: '#E0E7FF', padding: '4px', borderRadius: '50%', display: 'flex' }}>
                    <Check size={14} color={THEME.primary} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#F3F4F6', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ margin: 0, color: THEME.textLight, fontSize: '0.95rem' }}>
              <Phone size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Visit our store or call <strong style={{ color: THEME.primary }}>{STORE_INFO.phone}</strong> for availability and pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
   
    { id: 'contact', label: 'Contact' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setPage={setCurrentPage} openCategoryModal={setSelectedCategory} />;
      case 'about': return <About />;
      
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div style={styles.container}>
      <GlobalStyles />

      <header style={styles.nav}>
        <div onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
  <img 
    src="/LOGOPEEK.png" 
    alt="Peekaboo Logo"
    style={{
      height: '65px',
      objectFit: 'contain'
    }}
  />
</div>

        <nav className="mobile-hide" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === item.id ? THEME.primary : '#4B5563',
                fontWeight: currentPage === item.id ? '700' : '500',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'color 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }} 
          className="mobile-show"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isMenuOpen && (
        <div style={{ 
          position: 'fixed', top: '70px', left: 0, right: 0, background: 'white', 
          padding: '2rem', borderBottom: '1px solid #eee', zIndex: 999,
          display: 'flex', flexDirection: 'column', gap: '1rem'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1.2rem', padding: '0.5rem 0' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <footer style={styles.footer}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ ...styles.logo, fontSize: '1.5rem', marginBottom: '1rem' }}>Peekaboo</h3>
            <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
              Your trusted partner in parenting. Providing premium toys and baby care products in Coimbatore.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#D1D5DB' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('about')}>About Us</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>Products</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('contact')}>Contact</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Product Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#D1D5DB' }}>
              <span>Educational Toys</span>
              <span>Baby Care products</span>
              <span>Soft Toys & Plushies</span>
              <span>Baby dress</span>
              <span>Baby Accessories</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={18} /> Sundarapuram, Coimbatore</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}><Phone size={18} /> +91 98765 43210</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}><Mail size={18} /> hello@peekabookids.com</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', color: '#6B7280' }}>
          © Crafted by PSGians. Looking to build your next high-quality website? Call: +91 8695149303
        </div>
      </footer>

      <CategoryModal 
        category={selectedCategory} 
        onClose={() => setSelectedCategory(null)} 
      />
    </div>
  );
};

export default App;
