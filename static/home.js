/**
 * Codeweave - Main JavaScript
 * This file contains all interactive functionality for the Codeweave website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeSwitcher();
    initMobileNavigation();
    initSmoothScrolling();
    createParticles();
    initTimelineAnimation();
    initTestimonialSlider();
    initPricingToggle();
    initCodePlayground();
    initFileTree();
    initPricingCalculator();
    initLiveChatWidget();
    initCookieConsent();
    initBackToTop();
});

/**
 * Theme Switcher Functionality
 * Handles theme selection and persistence
 */
function initThemeSwitcher() {
    // Set default theme
    const defaultTheme = 'dark';
    document.documentElement.setAttribute('data-theme', defaultTheme);
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeIcon = themeToggle.querySelector('i');
    
    // Toggle theme menu
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling up
        themeToggle.classList.toggle('active');
    });
    
    // Close theme menu when clicking outside
    document.addEventListener('click', function() {
        if (themeToggle.classList.contains('active')) {
            themeToggle.classList.remove('active');
        }
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from closing the menu
            const theme = this.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update icon
            updateThemeIcon(theme);
            
            // Close menu
            themeToggle.classList.remove('active');
            
            // Save theme preference
            localStorage.setItem('theme', theme);
        });
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update active state based on saved theme
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === savedTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Update icon based on saved theme
    updateThemeIcon(savedTheme);
}

/**
 * Updates the theme icon based on the selected theme
 * @param {string} theme - The current theme name
 */
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = 'fas';
    
    switch(theme) {
        case 'light':
            themeIcon.classList.add('fa-sun');
            break;
        case 'dark':
            themeIcon.classList.add('fa-moon');
            break;
        case 'ocean':
            themeIcon.classList.add('fa-water');
            break;
        case 'nature':
            themeIcon.classList.add('fa-tree');
            break;
        case 'cosmic':
            themeIcon.classList.add('fa-star');
            break;
        default:
            themeIcon.classList.add('fa-moon');
    }
}

/**
 * Mobile Navigation
 * Handles hamburger menu toggle for mobile devices
 */
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

/**
 * Smooth Scrolling
 * Enables smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Particle Background
 * Creates animated background particles for the hero section
 */
function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 200 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particles.appendChild(particle);
    }
}

/**
 * Timeline Animation
 * Animates timeline items when they come into view
 */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Testimonial Slider
 * Handles the testimonial carousel functionality
 */
function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (!track || !testimonials.length) return;
    
    let currentIndex = 0;
    let testimonialInterval;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Initialize dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        });
    }

    // Next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        });
    }

    // Auto slide functionality
    function startAutoSlide() {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }, 5000);
    }

    // Pause auto slide on hover
    if (track) {
        track.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        track.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Start auto slide
    startAutoSlide();
}

/**
 * Pricing Toggle
 * Toggles between monthly and yearly pricing
 */
function initPricingToggle() {
    const pricingToggle = document.querySelector('.pricing-toggle-switch');
    const monthlyPrices = document.querySelectorAll('.pricing-price.monthly');
    const yearlyPrices = document.querySelectorAll('.pricing-price.yearly');
    const pricingTexts = document.querySelectorAll('.pricing-toggle-text');
    const pricingSaves = document.querySelectorAll('.pricing-save');
    
    if (!pricingToggle) return;

    pricingToggle.addEventListener('click', () => {
        pricingToggle.classList.toggle('yearly');
        
        monthlyPrices.forEach(price => {
            price.style.display = pricingToggle.classList.contains('yearly') ? 'none' : 'inline-block';
        });
        
        yearlyPrices.forEach(price => {
            price.style.display = pricingToggle.classList.contains('yearly') ? 'inline-block' : 'none';
        });
        
        pricingTexts.forEach(text => {
            text.classList.toggle('active');
        });
        
        pricingSaves.forEach(save => {
            save.classList.toggle('show', pricingToggle.classList.contains('yearly'));
        });
    });
}

/**
 * Code Playground
 * Handles the interactive code playground functionality
 */
function initCodePlayground() {
    // Tab switching
    const playgroundTabs = document.querySelectorAll('.playground-tab');
    const playgroundPanels = document.querySelectorAll('.playground-panel');
    
    if (!playgroundTabs.length) return;
    
    playgroundTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Update active tab
            playgroundTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding panel
            playgroundPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${target}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // Code tabs
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeContent = document.querySelector('.code-content pre code');
    
    if (!codeTabs.length || !codeContent) return;
    
    // Sample code snippets
    const codeSnippets = {
        'Dashboard.jsx': `import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import SalesChart from './SalesChart';
import { fetchSalesData } from '../api/salesData';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSalesData(user.id);
        setSalesData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading sales data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  return (
    <div className={\`dashboard \${theme}\`}>
      <Navbar />
      <div className="dashboard-content">
        <h1>Welcome back, {user.name}</h1>
        <div className="dashboard-summary">
          <div className="summary-card">
            <h3>Total Sales</h3>
            <p className="summary-value">$24,500</p>
          </div>
          <div className="summary-card">
            <h3>New Customers</h3>
            <p className="summary-value">124</p>
          </div>
          <div className="summary-card">
            <h3>Growth</h3>
            <p className="summary-value">+12.5%</p>
          </div>
        </div>
        {loading ? (
          <p>Loading chart data...</p>
        ) : (
          <SalesChart data={salesData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;`,
        'ThemeToggle.jsx': `import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button 
      className={\`theme-toggle \${theme}\`} 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon" />
      ) : (
        <i className="fas fa-sun" />
      )}
    </button>
  );
};

export default ThemeToggle;`,
        'SalesChart.jsx': `import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'Sales',
          data: data.map(item => item.amount),
          backgroundColor: 'rgba(108, 99, 255, 0.2)',
          borderColor: 'rgba(108, 99, 255, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="sales-chart">
      <h2>Sales Overview</h2>
      <div className="chart-container">
        <canvas ref={chartRef} height="300"></canvas>
      </div>
    </div>
  );
};

export default SalesChart;`
    };
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const file = tab.getAttribute('data-file');
            
            // Update active tab
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update code content
            if (codeSnippets[file]) {
                codeContent.textContent = codeSnippets[file];
            }
        });
    });

    // Example buttons
    const exampleButtons = document.querySelectorAll('.example-btn');
    const playgroundTextarea = document.querySelector('.playground-textarea');
    
    if (!exampleButtons.length || !playgroundTextarea) return;
    
    const examples = {
        'Todo App': 'Create a React Todo app with the ability to add, edit, delete, and mark tasks as complete. Include local storage for persistence and a dark/light theme toggle.',
        'Landing Page': 'Build a responsive landing page for a SaaS product with a hero section, features section, pricing table, and contact form. Include animations and a mobile-friendly navigation.',
        'API Client': 'Develop a REST API client that can fetch data from an external API, display it in a table, and allow filtering and sorting. Include error handling and loading states.'
    };
    
    exampleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const example = button.textContent;
            if (examples[example]) {
                playgroundTextarea.value = examples[example];
            }
        });
    });

    // Generate button
    const generateButton = document.querySelector('.generate-btn');
    
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            // Switch to output tab
            const outputTab = document.querySelector('.playground-tab[data-tab="output"]');
            if (outputTab) {
                outputTab.click();
            }
        });
    }
}

/**
 * File Tree Interaction
 * Handles expandable folders in the file tree
 */
function initFileTree() {
    const folderItems = document.querySelectorAll('.file-tree-item.folder');
    
    folderItems.forEach(folder => {
        folder.addEventListener('click', (e) => {
            const children = folder.querySelector('.file-tree-children');
            if (children) {
                children.style.display = children.style.display === 'none' ? 'block' : 'none';
            }
            e.stopPropagation();
        });
    });
}

/**
 * Pricing Calculator
 * Handles the interactive pricing calculator functionality
 */
function initPricingCalculator() {
    const devCountSlider = document.getElementById('dev-count');
    const devCountValue = document.getElementById('dev-count-value');
    const devSalarySlider = document.getElementById('dev-salary');
    const devSalaryValue = document.getElementById('dev-salary-value');
    const projectCountSlider = document.getElementById('project-count');
    const projectCountValue = document.getElementById('project-count-value');
    const projectDurationSlider = document.getElementById('project-duration');
    const projectDurationValue = document.getElementById('project-duration-value');
    const productivitySlider = document.getElementById('productivity');
    const productivityValue = document.getElementById('productivity-value');
    
    const monthlySavings = document.getElementById('monthly-savings');
    const annualSavings = document.getElementById('annual-savings');
    const timeSaved = document.getElementById('time-saved');
    const roi = document.getElementById('roi');
    
    // Check if calculator elements exist
    if (!devCountSlider || !monthlySavings) return;
    
    function updateCalculator() {
        const devCount = parseInt(devCountSlider.value);
        const devSalary = parseInt(devSalarySlider.value);
        const projectCount = parseInt(projectCountSlider.value);
        const projectDuration = parseInt(projectDurationSlider.value);
        const productivity = parseInt(productivitySlider.value) / 100;
        
        // Update display values
        devCountValue.textContent = devCount;
        devSalaryValue.textContent = devSalary.toLocaleString();
        projectCountValue.textContent = projectCount;
        projectDurationValue.textContent = projectDuration;
        productivityValue.textContent = productivity * 100;
        
        // Calculate savings
        const hourlyRate = devSalary / 2080; // 40 hours * 52 weeks
        const hoursPerProject = projectDuration * 40; // 40 hours per week
        const totalHoursPerMonth = projectCount * hoursPerProject;
        const hoursSaved = totalHoursPerMonth * productivity;
        const monthlySavingsValue = hoursSaved * hourlyRate * devCount;
        const annualSavingsValue = monthlySavingsValue * 12;
        const timeSavedValue = projectDuration * productivity;
        const costOfTool = 49 * devCount * 12; // Professional plan
        const roiValue = (annualSavingsValue / costOfTool) * 100;
        
        // Update results
        monthlySavings.textContent = Math.round(monthlySavingsValue).toLocaleString();
        annualSavings.textContent = Math.round(annualSavingsValue).toLocaleString();
        timeSaved.textContent = timeSavedValue.toFixed(1);
        roi.textContent = Math.round(roiValue);
    }
    
    // Initialize calculator
    updateCalculator();
    
    // Update on slider change
    devCountSlider.addEventListener('input', updateCalculator);
    devSalarySlider.addEventListener('input', updateCalculator);
    projectCountSlider.addEventListener('input', updateCalculator);
    projectDurationSlider.addEventListener('input', updateCalculator);
    productivitySlider.addEventListener('input', updateCalculator);
}

/**
 * Live Chat Widget
 * Handles the interactive chat widget functionality
 */
function initLiveChatWidget() {
    const chatButton = document.querySelector('.chat-button');
    const chatPopup = document.querySelector('.chat-popup');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatButton || !chatPopup) return;
    
    chatButton.addEventListener('click', () => {
        chatPopup.style.display = chatPopup.style.display === 'block' ? 'none' : 'block';
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatPopup.style.display = 'none';
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'user');
            userMessage.innerHTML = `
                <div class="chat-bubble">
                    <p>${escapeHTML(message)}</p>
                </div>
                <div class="chat-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate bot response after a delay
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('chat-message', 'bot');
                botMessage.innerHTML = `
                    <div class="chat-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="chat-bubble">
                        <p>Thanks for your message! Our team will get back to you soon. In the meantime, feel free to explore our features or pricing plans.</p>
                    </div>
                `;
                chatMessages.appendChild(botMessage);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    if (chatSend && chatInput) {
        chatSend.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

/**
 * Cookie Consent Banner
 * Handles the cookie consent functionality
 */
function initCookieConsent() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieAccept = document.querySelector('.cookie-accept');
    const cookieSettings = document.querySelector('.cookie-settings');
    
    if (!cookieBanner) return;
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
    
    if (cookieSettings) {
        cookieSettings.addEventListener('click', () => {
            // In a real app, this would open cookie settings
            alert('Cookie settings would open here');
        });
    }
}

/**
 * Back to Top Button
 * Shows/hides the back to top button based on scroll position
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Utility function to escape HTML special characters
 * @param {string} unsafe - The unsafe string that might contain HTML
 * @return {string} - The escaped safe string
 */
function escapeHTML(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}