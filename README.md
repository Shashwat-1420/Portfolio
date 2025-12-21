# 🚀 Shashwat Mishra - Portfolio & Progress Tracker

> A dynamic, feature-rich portfolio website with an integrated progress tracking system, comprehensive analytics dashboard, and beautiful visualizations. Built with modern web technologies to showcase projects, skills, and daily learning progress.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-FF6384?logo=chart.js)](https://www.chartjs.org/)

---

## ✨ Features

### 🎨 **Portfolio Showcase**
- **Hero Section**: Animated landing with portrait and professional introduction
- **About Section**: Comprehensive bio with interactive radar chart for skills visualization
- **Portfolio Projects**: Showcase of featured projects with tech stacks and links
- **Services**: Detailed skillset and expertise areas
- **Certifications**: Interactive PDF viewer for professional certifications
- **Contact Form**: Netlify-powered contact form with social media links

### 📊 **Progress Tracking System**
- **Daily Progress Reports**: Markdown-based daily tracking system
- **Activity Heatmap**: GitHub-style 365-day activity visualization
- **Analytics Dashboard**: 
  - Smart KPIs (Streaks, Productivity Scores, Achievements)
  - Productivity trend charts
  - Mood intelligence radar
  - Emotional patterns analysis
  - Learning focus areas
  - AI-powered insights and recommendations
- **Timeline View**: Chronological display of progress reports with expandable details
- **Dashboard View**: Comprehensive analytics with multiple chart types

### 📝 **Writing Records**
- **Blog Posts**: Magazine-style layout for Medium articles
- **Progress Reports**: Interactive timeline and dashboard views
- **Research Publications**: Bookshelf-style display for research work
- **Modal Reader**: Enhanced reading experience with fallback options

### 🎯 **Interactive Features**
- **Smooth Animations**: Particle background effects and transitions
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Beautiful orange (#ffb347) accent color scheme
- **Loading States**: Elegant loading screens and transitions
- **Scroll to Top**: Floating button for easy navigation

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0** - Modern UI library
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Lightning-fast build tool
- **React Router DOM 7.6.3** - Client-side routing

### **Data Visualization**
- **Chart.js 4.5.0** - Powerful charting library
- **react-chartjs-2 5.3.0** - React bindings for Chart.js
- Custom Activity Heatmap component

### **Styling**
- **CSS3** - Custom styling with animations
- **Font Awesome 6.7.2** - Icon library
- Monospace font family for consistency

### **Content Management**
- **gray-matter 4.0.3** - Frontmatter parsing
- **pdfjs-dist 4.10.38** - PDF rendering
- Markdown file-based progress reports

### **Deployment**
- **Netlify** - Hosting and form handling
- **gh-pages** - Alternative deployment option

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── certificates/          # PDF certificates
│   └── progress-reports/     # Daily progress markdown files
│       ├── 2025/            # Year-organized reports
│       ├── templates/       # Report templates
│       └── generate-report.js  # Auto-generation script
├── src/
│   ├── components/
│   │   ├── ActivityHeatmap.tsx    # 365-day heatmap visualization
│   │   ├── MarkdownRenderer.tsx    # Markdown content renderer
│   │   └── PdfThumbnail.tsx        # PDF thumbnail generator
│   ├── hooks/
│   │   └── usePageTransition.ts    # Page transition utilities
│   ├── utils/
│   │   ├── browserProgressReader.ts  # Browser-based file reader
│   │   └── progressFileReader.ts      # File system reader
│   ├── assets/               # Images and icons
│   ├── AboutSection.tsx      # About section component
│   ├── PortfolioSection.tsx  # Projects showcase
│   ├── ServicesSection.tsx   # Skills and services
│   ├── CertificationsSection.tsx  # Certifications display
│   ├── ContactSection.tsx    # Contact form
│   ├── WritingRecords.tsx    # Blog/Progress/Research hub
│   ├── NavBar.tsx            # Navigation component
│   ├── Footer.tsx            # Footer component
│   ├── ScrollToTopButton.tsx # Scroll to top button
│   ├── App.tsx               # Main app component
│   └── App.css               # Global styles
├── dist/                     # Build output
├── netlify.toml              # Netlify configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json              # Dependencies and scripts
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/StrikerSam-Ai/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📊 Progress Tracking System

### **Creating Daily Reports**

The portfolio includes a powerful progress tracking system that reads markdown files from `public/progress-reports/`.

#### **Quick Report Generation**
```bash
# Generate today's full report
npm run report

# Generate quick report (minimal fields)
npm run report:quick
```

#### **Manual Report Creation**
1. Copy a template from `public/progress-reports/templates/`
2. Create file: `public/progress-reports/2025/day-XXX-YYYY-MM-DD.md`
3. Fill in the frontmatter and content

#### **Report Structure**
```markdown
---
title: "Day X - Learning Focus"
day: X
date: "2025-07-26"
mood: "excellent"
productivityScore: 8
achievements:
  - "Completed ML course module"
  - "Wrote blog post"
tags:
  - "machine-learning"
  - "writing"
---

## What I Learned Today
...

## Challenges Faced
...

## Tomorrow's Goals
...
```

### **Features**
- ✅ Automatic parsing and display
- ✅ Streak calculation
- ✅ Productivity score tracking
- ✅ Achievement logging
- ✅ Tag-based organization
- ✅ Mood tracking
- ✅ Timeline and dashboard views
- ✅ 365-day activity heatmap

---

## 🎨 Key Features in Detail

### **1. Activity Heatmap**
- GitHub-style 365-day visualization
- Color intensity based on productivity scores
- Interactive tooltips with detailed information
- Click to navigate to specific reports
- Dynamic month labels
- Statistics summary

### **2. Analytics Dashboard**
- **Smart KPIs**: Streaks, productivity scores, achievements, learning days
- **Productivity Trend**: Line chart showing score progression
- **Mood Intelligence**: Radar chart for emotional patterns
- **Emotional Patterns**: Doughnut chart for mood distribution
- **Learning Focus Areas**: Top tags with percentage breakdown
- **AI-Powered Insights**: Performance analysis and recommendations

### **3. Interactive Components**
- **Radar Chart**: Skills visualization with heartbeat animation
- **PDF Viewer**: In-browser certificate viewing
- **Modal System**: Enhanced reading experience
- **Responsive Grids**: Adaptive layouts for all screen sizes

---

## 🌐 Deployment

### **Netlify (Recommended)**
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Forms are automatically handled by Netlify

### **GitHub Pages**
```bash
npm run deploy
```

### **Environment Variables**
No environment variables required for basic functionality.

---

## 📈 Future Roadmap

See [PHASE2_ROADMAP.md](./PHASE2_ROADMAP.md) for detailed future enhancements:

- 🎮 **Gamification System**: Achievements, XP, levels, challenges
- 🔮 **Predictive Analytics**: Performance forecasting, smart recommendations
- ⚡ **Custom Dashboard Layouts**: Drag-and-drop widget system
- 🚀 **Advanced Features**: Data export, external integrations, collaboration

---

## 🎯 Usage Tips

1. **Daily Routine**: Run `npm run report` each day to track progress
2. **Consistency**: Maintain daily reports for accurate analytics
3. **Tags**: Use consistent tags for better organization
4. **Review**: Check dashboard weekly to identify patterns
5. **Customization**: Modify templates to fit your tracking needs

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Shashwat Mishra**
- 🌐 Portfolio: [Live Site](https://proportsm.netlify.app)
- 💼 LinkedIn: [@sam140706](https://www.linkedin.com/in/sam140706/)
- 🐙 GitHub: [@StrikerSam-Ai](https://github.com/StrikerSam-Ai)
- 🐦 Twitter: [@SHASHWATMI67916](https://x.com/SHASHWATMI67916)
- ✍️ Medium: [@shashwatmishra0369](https://medium.com/@shashwatmishra0369)
- 📧 Email: shashwatmishra0369@gmail.com

---

## 🙏 Acknowledgments

- **Chart.js** for powerful data visualization
- **Font Awesome** for beautiful icons
- **React Community** for excellent libraries
- **Vite Team** for the amazing build tool
- **Netlify** for seamless deployment

---

## 📊 Project Statistics

- **Total Components**: 15+ React components
- **Lines of Code**: 5000+ lines
- **Dependencies**: 20+ packages
- **Features**: 30+ interactive features
- **Charts**: 4+ chart types
- **Responsive Breakpoints**: Mobile, Tablet, Desktop

---

## ⚡ Performance

- ⚡ **Fast Build**: Vite-powered for instant HMR
- 🎯 **Optimized**: Code splitting and lazy loading
- 📱 **Responsive**: Mobile-first design
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🔒 **Secure**: Modern security practices

---

**Built with ❤️ by Shashwat Mishra**

*"Eager learner passionate about deep learning, defence tech, and AI innovation."*
