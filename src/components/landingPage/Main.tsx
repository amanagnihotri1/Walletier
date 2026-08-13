import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './mainpage.module.scss';
import axios from 'axios';
 import { FormData,TrackFolioLandingProps } from '../../app/TypeInterfaces';
import { useNavigate } from 'react-router-dom';

export default function TrackFolioLanding({ onLoginClick, onSignupClick }: TrackFolioLandingProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const navigate=useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [id]: value }));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  
  try {
    const bodyData = {
      ...formData,
      access_key: process.env.REACT_APP_FORM_KEY
    };
    
    const response = await axios.post(
      "https://api.web3forms.com/submit",
      bodyData,
      {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(response);
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Form submission error:', error);
    
  }
};

  return (
    <div className={styles.trackfolioContainer}>
      {/* Header / Navigation */}
      <header className={styles.navbar}>
        <a href="#home" className={styles.logo}>
          <span className={styles.logoIcon}>
            <img src="./wallet.png" alt="not found" />
          </span>
          <span className={styles.logoText}>Walletier</span>
        </a>
        <nav className={styles.navLinks}>
          <a href="#home" className={styles.active}>Home</a>
          <a href="#features">Features</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className={styles.authButtons}>
          <button className={styles.btnLogin}  onClick={()=>navigate("/auth/login")}>Login</button>
          <button className={styles.btnSignup} onClick={()=>navigate("/auth/signup")}>Get Started for Free</button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Take Control of Your<br />Finances Effortlessly.</h1>
          <p>Track expenses, manage budgets, and achieve your financial goals.</p>
          <div className={styles.heroCta}>
            <button className={styles.btnLogin} onClick={()=>navigate("/auth/login")}>Login</button>
            <button className={styles.btnSignup} onClick={()=>navigate("/auth/signup")}>Get Started for Free</button>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <img src="./appss.png" alt="TrackFolio Dashboard Preview" className={styles.dashboardMockup} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2>Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h3>Smart Expense Tracking</h3>
            <p>Track expenses, manage budgets, and achieve your financial goals easily.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3>Custom Budgeting</h3>
            <p>Create personalized budgets tailored to your income and spending lifestyle.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Detailed Reports & Insights</h3>
            <p>Gain deep clarity on your spending habits with advanced charts and data analytics.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <h2>About Us</h2>
        <div className={styles.aboutContent}>
          <p>Walletier is built to empower individuals to take complete control of their financial health. Our team is dedicated to creating seamless, secure, and intuitive tools that make money management stress-free.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <h2>Contact Us</h2>
        <p>Have questions or need support? Drop us a message.</p>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={4} value={formData.message} onChange={handleInputChange} required></textarea>
          </div>
          <button type="submit" className={styles.btnSignup}>Send Message</button>
        </form>
      </section>
      <footer>
        <p>&copy; 2026 Walletier. All rights reserved.</p>
        <div className={styles.socialLinks}>
          <a href="#twitter">Twitter</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="#github">GitHub</a>
        </div>
      </footer>
    </div>
  );
}