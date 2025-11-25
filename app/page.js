'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, Users, TrendingUp, AlertCircle, Download, Upload, 
  Link, CheckCircle, XCircle, Clock, User, CalendarDays, 
  FileText, BarChart3, Settings, Home, FileSpreadsheet 
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

export default function TeamAvailabilityTracker() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'
  ]);
  const [confluenceConnected, setConfluenceConnected] = useState(false);
  const [confluenceUrl, setConfluenceUrl] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [syncStatus, setSyncStatus] = useState('');
  
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: 'planned',
    startDate: '',
    endDate: '',
    reason: '',
    halfDay: false,
    coveringPerson: ''
  });

  // Styles object
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    wrapper: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    mainCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      padding: '30px',
      marginBottom: '30px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    titleSection: {
      flex: 1
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1a202c',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: 0
    },
    subtitle: {
      color: '#718096',
      marginTop: '8px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    primaryButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    successButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    dangerButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '6px 12px'
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      borderBottom: '2px solid #e5e7eb',
      marginBottom: '30px',
      overflowX: 'auto'
    },
    tab: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      color: '#6b7280',
      borderBottom: '2px solid transparent',
      marginBottom: '-2px',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      color: '#3b82f6',
      borderBottomColor: '#3b82f6'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      padding: '20px',
      borderRadius: '12px',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    statCardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    statLabel: {
      opacity: 0.9,
      marginBottom: '8px',
      fontSize: '14px'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    formSection: {
      backgroundColor: '#f9fafb',
      padding: '30px',
      borderRadius: '12px'
    },
    formTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '20px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      padding: '10px 15px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    select: {
      padding: '10px 15px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    checkbox: {
      marginRight: '8px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#374151'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    tableWrapper: {
      overflowX: 'auto',
      borderRadius: '12px'
    },
    tableHeader: {
      backgroundColor: '#f9fafb'
    },
    tableHeaderCell: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '2px solid #e5e7eb'
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
      transition: 'background-color 0.2s ease'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
    },
    tableCell: {
      padding: '12px 16px',
      fontSize: '14px'
    },
    badge: {
      padding: '4px 10px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    sickBadge: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    plannedBadge: {
      backgroundColor: '#dbeafe',
      color: '#2563eb'
    },
    approvedBadge: {
      backgroundColor: '#d1fae5',
      color: '#059669'
    },
    pendingBadge: {
      backgroundColor: '#fef3c7',
      color: '#d97706'
    },
    chartContainer: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      marginBottom: '20px',
      border: '1px solid #e5e7eb'
    },
    chartGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '20px'
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px'
    },
    calendarHeader: {
      textAlign: 'center',
      fontWeight: '600',
      color: '#4b5563',
      padding: '8px'
    },
    calendarDay: {
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: '8px',
      minHeight: '80px',
      backgroundColor: 'white'
    },
    calendarDayWithLeave: {
      backgroundColor: '#fee2e2',
      borderColor: '#fca5a5'
    },
    calendarDayNumber: {
      fontWeight: '600',
      fontSize: '14px',
      marginBottom: '4px'
    },
    calendarDayName: {
      fontSize: '11px',
      color: '#dc2626'
    },
    alertBox: {
      padding: '12px 16px',
      backgroundColor: '#d1fae5',
      border: '1px solid #86efac',
      color: '#059669',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '20px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280'
    },
    settingsSection: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px'
    },
    settingsTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    memberItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      marginBottom: '8px'
    },
    memberName: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    outlineButton: {
      padding: '10px 20px',
      border: '2px solid #3b82f6',
      backgroundColor: 'transparent',
      color: '#3b82f6',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      marginTop: '16px',
      transition: 'all 0.3s ease'
    }
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedLeaves = localStorage.getItem('teamLeaves');
    const savedMembers = localStorage.getItem('teamMembers');
    const savedConfluence = localStorage.getItem('confluenceConfig');
    
    if (savedLeaves) {
      setLeaves(JSON.parse(savedLeaves));
    } else {
      // Initialize with sample data
      const sampleData = [
        {
          id: 1,
          employeeName: 'John Smith',
          leaveType: 'planned',
          startDate: '2025-01-20',
          endDate: '2025-01-24',
          reason: 'Annual vacation',
          coveringPerson: 'Sarah Johnson',
          status: 'approved'
        },
        {
          id: 2,
          employeeName: 'Emily Davis',
          leaveType: 'sick',
          startDate: '2025-01-15',
          endDate: '2025-01-16',
          reason: 'Medical appointment',
          coveringPerson: 'Michael Brown',
          status: 'approved'
        }
      ];
      setLeaves(sampleData);
    }
    
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    }
    
    if (savedConfluence) {
      const config = JSON.parse(savedConfluence);
      setConfluenceConnected(config.connected);
      setConfluenceUrl(config.url);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (leaves.length > 0) {
      localStorage.setItem('teamLeaves', JSON.stringify(leaves));
    }
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newLeave = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setLeaves(prev => [...prev, newLeave]);
    
    // If Confluence is connected, sync the data
    if (confluenceConnected) {
      await syncWithConfluence([...leaves, newLeave]);
    }
    
    setFormData({
      employeeName: '',
      leaveType: 'planned',
      startDate: '',
      endDate: '',
      reason: '',
      halfDay: false,
      coveringPerson: ''
    });
    
    setLoading(false);
    setSyncStatus('Leave entry added successfully!');
    setTimeout(() => setSyncStatus(''), 3000);
  };

  const handleDelete = (id) => {
    const updatedLeaves = leaves.filter(leave => leave.id !== id);
    setLeaves(updatedLeaves);
    
    if (confluenceConnected) {
      syncWithConfluence(updatedLeaves);
    }
  };

  const handleConfluenceConnect = async () => {
    if (confluenceUrl && apiToken) {
      setLoading(true);
      
      // Simulate connection
      setTimeout(() => {
        setConfluenceConnected(true);
        localStorage.setItem('confluenceConfig', JSON.stringify({
          connected: true,
          url: confluenceUrl,
          token: apiToken
        }));
        setSyncStatus('Connected to Confluence successfully!');
        setLoading(false);
        setTimeout(() => setSyncStatus(''), 3000);
      }, 1500);
    }
  };

  const syncWithConfluence = async (leavesData) => {
    setSyncStatus('Syncing with Confluence...');
    
    try {
      const response = await fetch('/api/confluence/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          leaves: leavesData,
          confluenceUrl,
          apiToken 
        })
      });
      
      if (response.ok) {
        setSyncStatus('Sync completed successfully!');
      } else {
        setSyncStatus('Sync failed. Please check your connection.');
      }
    } catch (error) {
      setSyncStatus('Sync failed. Please check your connection.');
    }
    
    setTimeout(() => setSyncStatus(''), 3000);
  };

  const exportToCSV = () => {
    const headers = ['Employee', 'Type', 'Start Date', 'End Date', 'Reason', 'Coverage'];
    const rows = leaves.map(leave => [
      leave.employeeName,
      leave.leaveType,
      leave.startDate,
      leave.endDate,
      leave.reason || 'N/A',
      leave.coveringPerson || 'N/A'
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team_leaves_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const calculateStats = () => {
    const today = new Date();
    const currentLeaves = leaves.filter(leave => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      return start <= today && end >= today;
    });
    
    const upcomingLeaves = leaves.filter(leave => {
      const start = new Date(leave.startDate);
      return start > today;
    });
    
    const sickLeaves = leaves.filter(l => l.leaveType === 'sick').length;
    const plannedLeaves = leaves.filter(l => l.leaveType === 'planned').length;
    
    return {
      total: leaves.length,
      current: currentLeaves.length,
      upcoming: upcomingLeaves.length,
      sick: sickLeaves,
      planned: plannedLeaves
    };
  };

  const getMonthlyData = () => {
    const monthlyData = {};
    leaves.forEach(leave => {
      const month = new Date(leave.startDate).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { sick: 0, planned: 0 };
      }
      monthlyData[month][leave.leaveType]++;
    });
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      sick: data.sick,
      planned: data.planned
    }));
  };

  const getTeamAvailability = () => {
    const today = new Date();
    const next7Days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const onLeave = leaves.filter(leave => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        return date >= start && date <= end;
      }).length;
      
      next7Days.push({
        date: date.toLocaleDateString('default', { weekday: 'short', day: 'numeric' }),
        available: teamMembers.length - onLeave,
        onLeave
      });
    }
    
    return next7Days;
  };

  const stats = calculateStats();
  const monthlyData = getMonthlyData();
  const availabilityData = getTeamAvailability();
  const pieData = [
    { name: 'Sick Leave', value: stats.sick || 1, color: '#ef4444' },
    { name: 'Planned Leave', value: stats.planned || 1, color: '#3b82f6' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.mainCard}>
          <div style={styles.header}>
            <div style={styles.titleSection}>
              <h1 style={styles.title}>
                <CalendarDays color="#3b82f6" size={36} />
                Team Availability Tracker
              </h1>
              <p style={styles.subtitle}>Track and manage team leaves with Confluence integration</p>
            </div>
            <div style={styles.buttonGroup}>
              {confluenceConnected && (
                <button
                  onClick={() => syncWithConfluence(leaves)}
                  style={{...styles.button, ...styles.successButton}}
                  onMouseOver={(e) => e.target.style.opacity = '0.9'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  <Link size={20} />
                  Sync
                </button>
              )}
              <button
                onClick={exportToCSV}
                style={{...styles.button, ...styles.primaryButton}}
                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                <Download size={20} />
                Export
              </button>
            </div>
          </div>

          {syncStatus && (
            <div style={styles.alertBox}>
              <CheckCircle size={20} />
              {syncStatus}
            </div>
          )}

          <div style={styles.tabs}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
              { id: 'input', label: 'Add Leave', icon: <FileText size={18} /> },
              { id: 'records', label: 'Records', icon: <FileSpreadsheet size={18} /> },
              { id: 'calendar', label: 'Calendar', icon: <Calendar size={18} /> },
              { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={activeTab === tab.id 
                  ? {...styles.tab, ...styles.activeTab} 
                  : styles.tab}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'dashboard' && (
            <div>
              <div style={styles.statsGrid}>
                <div style={{...styles.statCard, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
                  <div style={styles.statCardContent}>
                    <div>
                      <p style={styles.statLabel}>Total Leaves</p>
                      <p style={styles.statValue}>{stats.total}</p>
                    </div>
                    <FileText size={30} color="rgba(255,255,255,0.8)" />
                  </div>
                </div>

                <div style={{...styles.statCard, background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>
                  <div style={styles.statCardContent}>
                    <div>
                      <p style={styles.statLabel}>Currently Away</p>
                      <p style={styles.statValue}>{stats.current}</p>
                    </div>
                    <XCircle size={30} color="rgba(255,255,255,0.8)" />
                  </div>
                </div>

                <div style={{...styles.statCard, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
                  <div style={styles.statCardContent}>
                    <div>
                      <p style={styles.statLabel}>Upcoming</p>
                      <p style={styles.statValue}>{stats.upcoming}</p>
                    </div>
                    <Clock size={30} color="rgba(255,255,255,0.8)" />
                  </div>
                </div>

                <div style={{...styles.statCard, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                  <div style={styles.statCardContent}>
                    <div>
                      <p style={styles.statLabel}>Available Today</p>
                      <p style={styles.statValue}>{teamMembers.length - stats.current}</p>
                    </div>
                    <CheckCircle size={30} color="rgba(255,255,255,0.8)" />
                  </div>
                </div>
              </div>

              <div style={styles.chartGrid}>
                <div style={styles.chartContainer}>
                  <h3 style={styles.chartTitle}>Monthly Leave Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sick" fill="#ef4444" name="Sick Leave" />
                      <Bar dataKey="planned" fill="#3b82f6" name="Planned Leave" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div style={styles.chartContainer}>
                  <h3 style={styles.chartTitle}>Leave Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={styles.chartContainer}>
                <h3 style={styles.chartTitle}>7-Day Team Availability</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={availabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="available" stroke="#10b981" name="Available" strokeWidth={2} />
                    <Line type="monotone" dataKey="onLeave" stroke="#ef4444" name="On Leave" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'input' && (
            <div style={styles.formSection}>
              <h2 style={styles.formTitle}>Add Leave Entry</h2>
              <form onSubmit={handleSubmit}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Employee Name *
                    </label>
                    <select
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={handleInputChange}
                      required
                      style={styles.select}
                    >
                      <option value="">Select employee</option>
                      {teamMembers.map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Leave Type *
                    </label>
                    <select
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleInputChange}
                      style={styles.select}
                    >
                      <option value="planned">Planned Leave</option>
                      <option value="sick">Sick Leave</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      min={formData.startDate}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Coverage Person
                    </label>
                    <select
                      name="coveringPerson"
                      value={formData.coveringPerson}
                      onChange={handleInputChange}
                      style={styles.select}
                    >
                      <option value="">Select coverage</option>
                      {teamMembers.filter(m => m !== formData.employeeName).map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Reason / Notes
                    </label>
                    <input
                      type="text"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Optional notes"
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={{marginBottom: '20px'}}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="halfDay"
                      checked={formData.halfDay}
                      onChange={handleInputChange}
                      style={styles.checkbox}
                    />
                    Half day leave
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{...styles.button, ...styles.primaryButton, opacity: loading ? 0.5 : 1}}
                >
                  {loading ? 'Adding...' : 'Add Leave Entry'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'records' && (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Employee</th>
                    <th style={styles.tableHeaderCell}>Type</th>
                    <th style={styles.tableHeaderCell}>Duration</th>
                    <th style={styles.tableHeaderCell}>Coverage</th>
                    <th style={styles.tableHeaderCell}>Status</th>
                    <th style={styles.tableHeaderCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map(leave => {
                    const start = new Date(leave.startDate);
                    const end = new Date(leave.endDate);
                    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <tr key={leave.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <User size={16} color="#9ca3af" />
                            <span style={{fontWeight: '500'}}>{leave.employeeName}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={leave.leaveType === 'sick' 
                            ? {...styles.badge, ...styles.sickBadge} 
                            : {...styles.badge, ...styles.plannedBadge}}>
                            {leave.leaveType}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <div>
                            <div>{start.toLocaleDateString()} - {end.toLocaleDateString()}</div>
                            <div style={{color: '#6b7280', fontSize: '12px'}}>{duration} day{duration > 1 ? 's' : ''}</div>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          {leave.coveringPerson || '-'}
                        </td>
                        <td style={styles.tableCell}>
                          <span style={leave.status === 'approved' 
                            ? {...styles.badge, ...styles.approvedBadge} 
                            : {...styles.badge, ...styles.pendingBadge}}>
                            {leave.status || 'pending'}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <button
                            onClick={() => handleDelete(leave.id)}
                            style={{background: 'none', border: 'none', cursor: 'pointer', padding: '4px'}}
                          >
                            <XCircle size={18} color="#ef4444" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {leaves.length === 0 && (
                <div style={styles.emptyState}>
                  No leave records found. Add a leave entry to get started.
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div style={styles.chartContainer}>
              <h3 style={styles.chartTitle}>Monthly Calendar View</h3>
              <div style={styles.calendarGrid}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={styles.calendarHeader}>
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date();
                  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                  const startOffset = firstDayOfMonth.getDay();
                  
                  date.setDate(date.getDate() - date.getDate() + 1 - startOffset + i);
                  
                  const dayLeaves = leaves.filter(leave => {
                    const start = new Date(leave.startDate);
                    const end = new Date(leave.endDate);
                    return date >= start && date <= end;
                  });
                  
                  const isCurrentMonth = date.getMonth() === new Date().getMonth();
                  
                  return (
                    <div
                      key={i}
                      style={dayLeaves.length > 0 
                        ? {...styles.calendarDay, ...styles.calendarDayWithLeave, opacity: isCurrentMonth ? 1 : 0.5} 
                        : {...styles.calendarDay, opacity: isCurrentMonth ? 1 : 0.5}}
                    >
                      <div style={styles.calendarDayNumber}>{date.getDate()}</div>
                      {dayLeaves.slice(0, 2).map((leave, idx) => (
                        <div key={idx} style={styles.calendarDayName}>
                          {leave.employeeName.split(' ')[0]}
                        </div>
                      ))}
                      {dayLeaves.length > 2 && (
                        <div style={styles.calendarDayName}>+{dayLeaves.length - 2} more</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div style={styles.settingsSection}>
                <h3 style={styles.settingsTitle}>
                  <Link size={20} />
                  Confluence Integration
                </h3>
                
                {!confluenceConnected ? (
                  <div>
                    <div style={{marginBottom: '16px'}}>
                      <label style={styles.label}>
                        Confluence URL
                      </label>
                      <input
                        type="url"
                        value={confluenceUrl}
                        onChange={(e) => setConfluenceUrl(e.target.value)}
                        placeholder="https://your-domain.atlassian.net"
                        style={{...styles.input, width: '100%'}}
                      />
                    </div>
                    
                    <div style={{marginBottom: '16px'}}>
                      <label style={styles.label}>
                        API Token
                      </label>
                      <input
                        type="password"
                        value={apiToken}
                        onChange={(e) => setApiToken(e.target.value)}
                        placeholder="Enter your Confluence API token"
                        style={{...styles.input, width: '100%'}}
                      />
                      <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                        Generate token from Confluence → Settings → API Tokens
                      </p>
                    </div>
                    
                    <button
                      onClick={handleConfluenceConnect}
                      disabled={loading}
                      style={{...styles.button, ...styles.primaryButton, opacity: loading ? 0.5 : 1}}
                    >
                      {loading ? 'Connecting...' : 'Connect to Confluence'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '16px'}}>
                      <CheckCircle size={20} />
                      <span>Connected to Confluence</span>
                    </div>
                    
                    <div style={{...styles.buttonGroup, marginTop: '16px'}}>
                      <button
                        onClick={() => syncWithConfluence(leaves)}
                        disabled={loading}
                        style={{...styles.button, ...styles.successButton, opacity: loading ? 0.5 : 1}}
                      >
                        {loading ? 'Syncing...' : 'Manual Sync Now'}
                      </button>
                      <button
                        onClick={() => {
                          setConfluenceConnected(false);
                          localStorage.removeItem('confluenceConfig');
                        }}
                        style={{...styles.button, ...styles.dangerButton}}
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div style={styles.settingsSection}>
                <h3 style={styles.settingsTitle}>Team Members</h3>
                <div>
                  {teamMembers.map(member => (
                    <div key={member} style={styles.memberItem}>
                      <span style={styles.memberName}>
                        <User size={16} color="#9ca3af" />
                        {member}
                      </span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    const newMember = prompt('Enter team member name:');
                    if (newMember) {
                      setTeamMembers([...teamMembers, newMember]);
                    }
                  }}
                  style={styles.outlineButton}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#eff6ff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  + Add Team Member
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
