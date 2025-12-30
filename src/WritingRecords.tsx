import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocation, Link } from 'react-router-dom';
import { browserProgressReader as progressReader, type ParsedProgressReport } from './utils/browserProgressReader';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faArrowLeft,
  faArrowRight,
  faFileAlt,
  faChartLine,
  faBook,
  faRobot
} from '@fortawesome/free-solid-svg-icons';

// Dynamic content with timestamps for automatic sorting
const blogPosts = [
  {
    title: "A World without lies",
    url: "https://medium.com/@shashwatmishra0369/the-world-without-lies-8b241f55b55b",
    snippet: "Ever thought? How would a world without lies look like ?",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*S_vQvDibV2e3Lc-5",
    publishedDate: new Date('2025-07-20'),
    category: 'Philosophy'
  },
  {
    title: "Pushovers Finish Last — Learn to Say No",
    url: "https://medium.com/@shashwatmishra0369/pushovers-finish-last-learn-to-say-no-79bb882a8801",
    snippet: "Why saying no is a superpower for your career and life.",
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*wCIOsoK3MY3o49iU",
    publishedDate: new Date('2025-07-18'),
    category: 'Career'
  },
].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()); // Sort by most recent



const TABS = [
  { key: 'blog', label: 'Blog Posts', icon: faFileAlt },
  { key: 'progress', label: 'Progress Reports', icon: faChartLine },
  { key: 'research', label: 'Research & Publications', icon: faBook },
];

const WritingRecords: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('blog');


  const [fileReports, setFileReports] = useState<ParsedProgressReport[]>([]);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [progressStats, setProgressStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'dashboard'>('timeline');

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['blog', 'progress', 'research'].includes(tab) && tab !== selectedTab) {
      setSelectedTab(tab);
    }
  }, [location.search]);

  // Load file-based progress reports
  useEffect(() => {
    const loadFileReports = async () => {
      setLoading(true);
      try {
        const reports = await progressReader.getRecentReports(50); // Fetch more for better data
        const stats = await progressReader.getStats();
        setFileReports(reports);
        setProgressStats(stats);
      } catch (error) {
        console.warn('Could not load file reports:', error);
      }
      setLoading(false);
    };

    if (selectedTab === 'progress') {
      loadFileReports();
    }
  }, [selectedTab]);

  const handleDateClick = (date: string) => {
    // Find and highlight the report for this date
    const report = fileReports.find(r => r.date === date);
    if (report) {
      setExpandedReport(`${report.day}-${report.date}`);
      // Scroll to timeline view
      setViewMode('timeline');
      // Optional: scroll to element logic
    }
  };

  return (
    <div className="section-container" style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative' }}>
      <Link to="/" className="home-back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Home
      </Link>

      <div className="section-header">

        <h2 className="section-title">Knowledge & <span className="highlight-text">Progress</span></h2>
        <div className="section-line"></div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`btn-grad ${selectedTab !== tab.key ? 'secondary' : ''}`}
            style={{
              opacity: selectedTab === tab.key ? 1 : 0.7,
              minWidth: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {tab.icon && <FontAwesomeIcon icon={tab.icon} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="content-area">
        {selectedTab === 'blog' && (
          <div className="blog-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '0 2rem'
          }}>
            {blogPosts.map((post, idx) => (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="blog-card"
                style={{
                  background: 'rgba(30, 30, 30, 0.6)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#ffb347',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {post.category} • {post.publishedDate.toLocaleDateString()}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#aaa',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {post.snippet}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ffb347',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    Read Article <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '0.5rem' }} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {selectedTab === 'progress' && (
          <div style={{ padding: '0 2rem' }}>
            {/* View Toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
              gap: '1rem'
            }}>
              <button
                onClick={() => setViewMode('timeline')}
                style={{
                  background: viewMode === 'timeline' ? 'rgba(255,179,71,0.2)' : 'transparent',
                  border: '1px solid #ffb347',
                  color: '#ffb347',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '0.5rem' }} />
                Timeline
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                style={{
                  background: viewMode === 'dashboard' ? 'rgba(255,179,71,0.2)' : 'transparent',
                  border: '1px solid #ffb347',
                  color: '#ffb347',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.5rem' }} />
                Analytics
              </button>
            </div>

            {viewMode === 'dashboard' ? (
              <ProgressDashboard
                stats={progressStats}
                reports={fileReports}
                loading={loading}
                onDateClick={(date) => {
                  handleDateClick(date);
                  setViewMode('timeline');
                }}
              />
            ) : (
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Timeline View */}
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>Loading reports...</div>
                ) : fileReports.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>No progress reports found.</div>
                ) : (
                  fileReports.map((report) => (
                    <div
                      key={`${report.day}-${report.date}`}
                      style={{
                        marginBottom: '2rem',
                        background: 'rgba(30,30,30,0.6)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,179,71,0.1)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        onClick={() => setExpandedReport(expandedReport === `${report.day}-${report.date}` ? null : `${report.day}-${report.date}`)}
                        style={{
                          padding: '1.5rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottom: expandedReport === `${report.day}-${report.date}` ? '1px solid rgba(255,179,71,0.1)' : 'none'
                        }}
                      >
                        <div>
                          <div style={{ color: '#ffb347', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                            Day {report.day} • {new Date(report.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                          <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{report.title}</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            background: 'rgba(255,179,71,0.1)',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '12px',
                            color: '#ffb347',
                            fontSize: '0.9rem'
                          }}>
                            Score: {report.productivityScore}/10
                          </div>
                          <div style={{ fontSize: '1.5rem' }}>
                            {expandedReport === `${report.day}-${report.date}` ? '-' : '+'}
                          </div>
                        </div>
                      </div>

                      {expandedReport === `${report.day}-${report.date}` && (
                        <div style={{ padding: '2rem', background: 'rgba(20,20,20,0.3)' }}>
                          <MarkdownRenderer content={report.content} />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'research' && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#aaa'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffb347' }}>
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <h3>Research Papers & Publications</h3>
            <p>Coming soon. Stay tuned for updates on my latest research work.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingRecords;