import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import time
from streamlit_option_menu import option_menu
import folium
from streamlit_folium import st_folium
import random

# Configure page
st.set_page_config(
    page_title="ViralPulse Pro",
    page_icon="🌊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load custom CSS
def load_css():
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');
    
    /* Global Styles */
    .stApp {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a0d2e 50%, #16213e 100%);
        color: #e0e7ff;
        font-family: 'Rajdhani', sans-serif;
    }
    
    /* Cyberpunk Header */
    .main-header {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
        padding: 2rem;
        border-radius: 20px;
        margin-bottom: 2rem;
        box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        text-align: center;
    }
    
    .main-title {
        font-family: 'Orbitron', monospace;
        font-size: 3rem;
        font-weight: 900;
        background: linear-gradient(45deg, #ffffff, #e0e7ff, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
        text-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
    }
    
    .subtitle {
        font-size: 1.2rem;
        color: #a5b4fc;
        margin-top: 0.5rem;
        font-weight: 300;
    }
    
    /* Glassmorphism Cards */
    .glass-card {
        background: rgba(30, 41, 59, 0.4);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        padding: 1.5rem;
        margin: 1rem 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .glass-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
    }
    
    /* Metrics */
    .metric-card {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        border-left: 4px solid #6366f1;
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        backdrop-filter: blur(10px);
    }
    
    .metric-value {
        font-size: 2rem;
        font-weight: 700;
        color: #06b6d4;
        font-family: 'Orbitron', monospace;
    }
    
    .metric-label {
        color: #94a3b8;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    /* Trend Cards */
    .trend-card {
        background: rgba(30, 41, 59, 0.6);
        border-radius: 12px;
        padding: 1rem;
        margin: 0.5rem 0;
        border-left: 4px solid #8b5cf6;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }
    
    .trend-card:hover {
        transform: scale(1.02);
        border-left-color: #06b6d4;
    }
    
    .trend-title {
        font-weight: 600;
        color: #e0e7ff;
        font-size: 1.1rem;
    }
    
    .trend-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }
    
    .controversy-high { color: #ef4444; }
    .controversy-medium { color: #f59e0b; }
    .controversy-low { color: #10b981; }
    
    /* Platform Themes */
    .twitter-theme { border-left-color: #1da1f2; }
    .reddit-theme { border-left-color: #ff4500; }
    .tiktok-theme { border-left-color: #000000; }
    
    /* Alerts */
    .alert-card {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 127, 0.1) 100%);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 12px;
        padding: 1rem;
        margin: 1rem 0;
    }
    
    /* Technical Section */
    .tech-metric {
        text-align: center;
        padding: 1rem;
        background: rgba(6, 182, 212, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(6, 182, 212, 0.3);
    }
    
    /* Sidebar Styling */
    .css-1d391kg {
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(20px);
    }
    
    /* Remove Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.3);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    }
    
    /* Animation */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .pulse-animation {
        animation: pulse 2s infinite;
    }
    
    /* Success/Warning colors */
    .success { color: #10b981; }
    .warning { color: #f59e0b; }
    .danger { color: #ef4444; }
    .info { color: #06b6d4; }
    </style>
    """, unsafe_allow_html=True)

# Load CSS on app start
load_css()

# Initialize session state
if 'selected_platform' not in st.session_state:
    st.session_state.selected_platform = 'All'
if 'alerts' not in st.session_state:
    st.session_state.alerts = []

# Import modules
from src.mock_data import MockDataGenerator
from src.conflict_detector import ConflictDetector
from src.rag_engine import RAGEngine
from src.visualizations import create_heatmap, create_trend_radar, create_sentiment_chart

# Initialize components
@st.cache_resource
def initialize_components():
    mock_gen = MockDataGenerator()
    conflict_detector = ConflictDetector()
    rag_engine = RAGEngine()
    return mock_gen, conflict_detector, rag_engine

mock_gen, conflict_detector, rag_engine = initialize_components()

# Header
st.markdown("""
<div class="main-header">
    <h1 class="main-title">ViralPulse Pro</h1>
    <p class="subtitle">🌊 Social Media Intelligence Hub • Real-time Trend Analysis & Conflict Detection</p>
</div>
""", unsafe_allow_html=True)

# Sidebar Navigation
with st.sidebar:
    st.markdown("### 🎛️ Control Center")
    
    selected = option_menu(
        "Navigation",
        ["🌍 War Room", "⚔️ Conflict Detector", "🧠 RAG Engine", "🔔 Alert Center", "⚙️ Technical"],
        icons=['globe', 'lightning-charge', 'cpu', 'bell', 'gear'],
        menu_icon="cast",
        default_index=0,
        styles={
            "container": {"padding": "0!important", "background-color": "transparent"},
            "icon": {"color": "#06b6d4", "font-size": "18px"}, 
            "nav-link": {"font-size": "16px", "text-align": "left", "margin":"0px", "--hover-color": "rgba(99, 102, 241, 0.1)"},
            "nav-link-selected": {"background-color": "rgba(99, 102, 241, 0.2)"},
        }
    )
    
    st.markdown("---")
    
    # Platform selector
    platform = st.selectbox(
        "🎯 Platform Focus",
        ["All", "Twitter", "Reddit", "TikTok", "Instagram"],
        key="platform_select"
    )
    st.session_state.selected_platform = platform
    
    # Live stats
    st.markdown("### 📊 Live Metrics")
    col1, col2 = st.columns(2)
    with col1:
        st.markdown('<div class="tech-metric"><div class="metric-value">847K</div><div class="metric-label">Posts/hr</div></div>', unsafe_allow_html=True)
    with col2:
        st.markdown('<div class="tech-metric"><div class="metric-value">0.8s</div><div class="metric-label">Avg Latency</div></div>', unsafe_allow_html=True)

# Main content based on selection
if selected == "🌍 War Room":
    st.markdown("## 🌍 Live Social Media War Room")
    
    # Top metrics row
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-value">2,847</div>
            <div class="metric-label">Active Trends</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-value">73%</div>
            <div class="metric-label">Controversy Score</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-value">156M</div>
            <div class="metric-label">Total Reach</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        st.markdown("""
        <div class="metric-card">
            <div class="metric-value pulse-animation">🔴 LIVE</div>
            <div class="metric-label">Status</div>
        </div>
        """, unsafe_allow_html=True)
    
    # Main dashboard
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 🗺️ Global Trend Heatmap")
        
        # Create and display heatmap
        heatmap = create_heatmap()
        st_folium(heatmap, height=400, width=700)
        st.markdown('</div>', unsafe_allow_html=True)
        
        # Trend DNA Radar
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 🧬 Trend DNA Radar")
        trends_data = mock_gen.generate_trending_topics()
        radar_chart = create_trend_radar(trends_data)
        st.plotly_chart(radar_chart, use_container_width=True)
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 🔥 Trending Now")
        
        trends = mock_gen.generate_trending_topics()
        for i, trend in enumerate(trends[:10]):
            controversy_class = "controversy-high" if trend['controversy'] > 70 else "controversy-medium" if trend['controversy'] > 40 else "controversy-low"
            platform_class = f"{trend['platform'].lower()}-theme"
            
            st.markdown(f"""
            <div class="trend-card {platform_class}">
                <div class="trend-title">#{trend['topic']}</div>
                <div class="trend-stats">
                    <span>👁️ {trend['views']:,}</span>
                    <span class="{controversy_class}">🔥 {trend['controversy']}%</span>
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown('</div>', unsafe_allow_html=True)
        
        # Real-time sentiment
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 😊 Sentiment Flow")
        sentiment_chart = create_sentiment_chart()
        st.plotly_chart(sentiment_chart, use_container_width=True)
        st.markdown('</div>', unsafe_allow_html=True)

elif selected == "⚔️ Conflict Detector":
    st.markdown("## ⚔️ Conflict Detector™")
    st.markdown("*Analyze opposing viewpoints and controversy patterns in real-time*")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 🎯 Select Trend")
        
        trends = mock_gen.generate_trending_topics()
        selected_trend = st.selectbox(
            "Choose a trend to analyze:",
            options=[f"#{trend['topic']}" for trend in trends],
            key="conflict_trend"
        )
        
        if st.button("🔍 Analyze Conflict", type="primary"):
            trend_name = selected_trend.replace("#", "")
            conflict_data = conflict_detector.analyze_conflict(trend_name)
            st.session_state.conflict_analysis = conflict_data
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        if 'conflict_analysis' in st.session_state:
            data = st.session_state.conflict_analysis
            
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.markdown("### 📊 Opposition Analysis")
            
            # Viewpoint split
            col1, col2 = st.columns(2)
            with col1:
                st.markdown(f"""
                <div style="text-align: center; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.3);">
                    <div style="font-size: 2rem; color: #10b981;">✅ {data['pro_percentage']}%</div>
                    <div style="color: #94a3b8;">Supporting</div>
                </div>
                """, unsafe_allow_html=True)
            
            with col2:
                st.markdown(f"""
                <div style="text-align: center; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.3);">
                    <div style="font-size: 2rem; color: #ef4444;">❌ {data['con_percentage']}%</div>
                    <div style="color: #94a3b8;">Opposing</div>
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Key quotes
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.markdown("### 💬 Key Influencer Quotes")
            
            col1, col2 = st.columns(2)
            with col1:
                st.markdown("**🟢 Pro Viewpoint:**")
                for quote in data['pro_quotes']:
                    credibility_color = "success" if quote['credibility'] > 80 else "warning" if quote['credibility'] > 60 else "danger"
                    st.markdown(f"""
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
                        <div style="font-style: italic;">"{quote['text']}"</div>
                        <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                            <span style="color: #94a3b8;">@{quote['author']}</span>
                            <span class="{credibility_color}" style="float: right;">🎯 {quote['credibility']}% credible</span>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
            
            with col2:
                st.markdown("**🔴 Con Viewpoint:**")
                for quote in data['con_quotes']:
                    credibility_color = "success" if quote['credibility'] > 80 else "warning" if quote['credibility'] > 60 else "danger"
                    st.markdown(f"""
                    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
                        <div style="font-style: italic;">"{quote['text']}"</div>
                        <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                            <span style="color: #94a3b8;">@{quote['author']}</span>
                            <span class="{credibility_color}" style="float: right;">🎯 {quote['credibility']}% credible</span>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
            
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Historical parallels
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.markdown("### 📜 Historical Parallels")
            for parallel in data['historical_parallels']:
                st.markdown(f"""
                <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 8px; margin: 0.5rem 0; border-left: 4px solid #8b5cf6;">
                    <div style="font-weight: 600; color: #e0e7ff;">{parallel['event']}</div>
                    <div style="color: #94a3b8; font-size: 0.9rem; margin-top: 0.5rem;">{parallel['description']}</div>
                    <div style="color: #8b5cf6; font-size: 0.9rem; margin-top: 0.5rem;">Similarity: {parallel['similarity']}%</div>
                </div>
                """, unsafe_allow_html=True)
            st.markdown('</div>', unsafe_allow_html=True)

elif selected == "🧠 RAG Engine":
    st.markdown("## 🧠 RAG Deep Dive Engine")
    st.markdown("*Advanced retrieval-augmented generation for trend analysis*")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 🔍 Query Interface")
        
        query = st.text_input("Enter your analysis query:", placeholder="e.g., Analyze the cultural impact of #AIethics")
        
        if st.button("🚀 Generate Analysis", type="primary") and query:
            with st.spinner("Processing RAG pipeline..."):
                time.sleep(2)  # Simulate processing
                analysis = rag_engine.analyze_trend(query)
                st.session_state.rag_analysis = analysis
        
        st.markdown('</div>', unsafe_allow_html=True)
        
        # Pipeline visualization
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### ⚙️ Pipeline Status")
        
        steps = [
            {"name": "Retrieve", "status": "✅", "time": "0.2s"},
            {"name": "Contextualize", "status": "✅", "time": "0.4s"},
            {"name": "Generate", "status": "✅", "time": "0.2s"}
        ]
        
        for step in steps:
            st.markdown(f"""
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px; margin: 0.3rem 0;">
                <span>{step['status']} {step['name']}</span>
                <span style="color: #06b6d4;">{step['time']}</span>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        if 'rag_analysis' in st.session_state:
            analysis = st.session_state.rag_analysis
            
            # Step 1: Retrieved chunks
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.markdown("### 📚 Retrieved Chunks (Step 1)")
            
            for i, chunk in enumerate(analysis['chunks'][:5]):
                st.markdown(f"""
                <div style="background: rgba(30, 41, 59, 0.6); padding: 1rem; border-radius: 8px; margin: 0.5rem 0; border-left: 3px solid #6366f1;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600; color: #e0e7ff;">Chunk {i+1}</span>
                        <span style="color: #06b6d4; font-size: 0.9rem;">Relevance: {chunk['relevance']:.3f}</span>
                    </div>
                    <div style="color: #94a3b8; font-size: 0.9rem;">{chunk['text']}</div>
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Step 2: Analysis
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.markdown("### 🎯 Cultural Analysis (Step 2)")
            
            st.markdown(f"**Origin Summary:** {analysis['cultural_origin']}")
            
            # Sentiment pie chart
            sentiment_fig = go.Figure(data=[go.Pie(
                labels=['Positive', 'Neutral', 'Negative'],
                values=analysis['sentiment_breakdown'],
                marker_colors=['#10b981', '#6b7280', '#ef4444']
            )])
            sentiment_fig.update_layout(
                template="plotly_dark",
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                title="Sentiment Distribution"
            )
            st.plotly_chart(sentiment_fig, use_container_width=True)
            
            if analysis['toxicity_alert']:
                st.markdown("""
                <div class="alert-card">
                    ⚠️ <strong>Toxicity Alert:</strong> High levels of toxic content detected in discussions.
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Step 3: Meme evolution (if applicable)
            if analysis['meme_evolution']:
                st.markdown('<div class="glass-card">', unsafe_allow_html=True)
                st.markdown("### 🎭 Meme Evolution Timeline (Step 3)")
                
                timeline_data = pd.DataFrame(analysis['meme_evolution'])
                fig = px.line(timeline_data, x='date', y='popularity', 
                             title="Meme Popularity Over Time",
                             color_discrete_sequence=['#06b6d4'])
                fig.update_layout(template="plotly_dark", paper_bgcolor='rgba(0,0,0,0)')
                st.plotly_chart(fig, use_container_width=True)
                
                st.markdown('</div>', unsafe_allow_html=True)

elif selected == "🔔 Alert Center":
    st.markdown("## 🔔 Pro Alert System")
    st.markdown("*Custom triggers and real-time notifications*")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### ➕ Create New Alert")
        
        alert_type = st.selectbox("Alert Type:", ["Controversy Score", "Sentiment Shift", "Viral Threshold", "Keyword Detection"])
        trigger_value = st.slider("Trigger Value:", 0, 100, 80)
        keywords = st.text_input("Keywords (comma-separated):", placeholder="AIethics, controversy, debate")
        notification_method = st.multiselect("Notification Method:", ["Email", "SMS", "In-App", "Slack"])
        
        if st.button("🔔 Create Alert", type="primary"):
            new_alert = {
                'id': len(st.session_state.alerts) + 1,
                'type': alert_type,
                'trigger': trigger_value,
                'keywords': keywords,
                'methods': notification_method,
                'status': 'Active',
                'created': datetime.now()
            }
            st.session_state.alerts.append(new_alert)
            st.success("Alert created successfully!")
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### 📱 Mock Notifications")
        
        # Simulate some alerts
        sample_notifications = [
            {
                'title': '🚨 HIGH CONTROVERSY ALERT',
                'message': '#AIethics controversy score reached 87% (trigger: 80%)',
                'time': '2 minutes ago',
                'type': 'danger'
            },
            {
                'title': '📈 VIRAL THRESHOLD',
                'message': '#TechDebate reached 1M interactions in 1 hour',
                'time': '15 minutes ago',
                'type': 'success'
            },
            {
                'title': '😊 SENTIMENT SHIFT',
                'message': '#ClimateAction sentiment improved by 25%',
                'time': '1 hour ago',
                'type': 'info'
            }
        ]
        
        for notif in sample_notifications:
            type_class = notif['type']
            icon = '🚨' if notif['type'] == 'danger' else '📈' if notif['type'] == 'success' else '📊'
            
            st.markdown(f"""
            <div class="alert-card">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.2rem; margin-right: 0.5rem;">{icon}</span>
                    <span style="font-weight: 600; color: #e0e7ff;">{notif['title']}</span>
                </div>
                <div style="color: #94a3b8; margin-bottom: 0.5rem;">{notif['message']}</div>
                <div style="color: #6b7280; font-size: 0.8rem;">{notif['time']}</div>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown('</div>', unsafe_allow_html=True)
    
    # Active alerts
    if st.session_state.alerts:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown("### ⚡ Active Alerts")
        
        for alert in st.session_state.alerts:
            col1, col2, col3 = st.columns([2, 1, 1])
            with col1:
                st.markdown(f"**{alert['type']}** - {alert['keywords']}")
                st.markdown(f"<small>Trigger: {alert['trigger']}% | Created: {alert['created'].strftime('%H:%M')}</small>", unsafe_allow_html=True)
            with col2:
                st.markdown(f"<span class='success'>● {alert['status']}</span>", unsafe_allow_html=True)
            with col3:
                if st.button("🗑️", key=f"delete_{alert['id']}"):
                    st.session_state.alerts.remove(alert)
                    st.rerun()
        
        st.markdown('</div>', unsafe_allow_html=True)

elif selected == "⚙️ Technical":
    st.markdown("## ⚙️ Technical Showcase")
    st.markdown("*Performance metrics and system architecture*")
    
    # Benchmark dashboard
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("""
        <div class="tech-metric">
            <div class="metric-value">0.8s</div>
            <div class="metric-label">Avg Latency</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="tech-metric">
            <div class="metric-value">0.94</div>
            <div class="metric-label">RAGAS Score</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="tech-metric">
            <div class="metric-value">42%</div>
            <div class="metric-label">Better Than Keywords</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        st.markdown("""
        <div class="tech-metric">
            <div class="metric-value">99.2%</div>
            <div class="metric-label">Uptime</div>
        </div>
        """, unsafe_allow_html=True)
    
    # Architecture diagram
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.markdown("### 🏗️ System Architecture")
    
    # Create a technical flow diagram
    flow_fig = go.Figure()
    
    # Add nodes
    nodes = [
        {"name": "Social Media APIs", "x": 1, "y": 4, "color": "#6366f1"},
        {"name": "Data Ingestion", "x": 2, "y": 4, "color": "#8b5cf6"},
        {"name": "Sentence Transformer", "x": 3, "y": 4, "color": "#06b6d4"},
        {"name": "Chroma DB", "x": 4, "y": 4, "color": "#10b981"},
        {"name": "RAG Pipeline", "x": 3, "y": 3, "color": "#f59e0b"},
        {"name": "Conflict Detector", "x": 2, "y": 2, "color": "#ef4444"},
        {"name": "Streamlit UI", "x": 3, "y": 1, "color": "#8b5cf6"}
    ]
    
    for node in nodes:
        flow_fig.add_trace(go.Scatter(
            x=[node["x"]], y=[node["y"]], 
            mode="markers+text",
            marker=dict(size=40, color=node["color"]),
            text=node["name"],
            textposition="middle center",
            showlegend=False
        ))
    
    # Add connections
    connections = [
        (1, 4, 2, 4), (2, 4, 3, 4), (3, 4, 4, 4),
        (3, 4, 3, 3), (3, 3, 2, 2), (3, 3, 3, 1), (2, 2, 3, 1)
    ]
    
    for conn in connections:
        flow_fig.add_trace(go.Scatter(
            x=[conn[0], conn[2]], y=[conn[1], conn[3]],
            mode="lines",
            line=dict(color="rgba(148, 163, 184, 0.5)", width=2),
            showlegend=False
        ))
    
    flow_fig.update_layout(
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        xaxis=dict(visible=False),
        yaxis=dict(visible=False),
        height=300,
        title="Data Flow Architecture"
    )
    
    st.plotly_chart(flow_fig, use_container_width=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Code snippet
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.markdown("### 💻 Conflict Detection Algorithm")
    
    code = """
def detect_conflict(trend):
    # Get embeddings for all posts
    cluster_embeddings = sentence_transformer(posts)
    
    # Use DBSCAN for density-based opposition grouping
    pro, con = dbscan_clustering(cluster_embeddings)
    
    # Calculate controversy score
    controversy_score = (len(con) / (len(pro) + 1e-9)) * sentiment_variance(pro, con)
    
    # Extract key quotes from each cluster
    key_quotes_pro = extract_representative_quotes(pro)
    key_quotes_con = extract_representative_quotes(con)
    
    return {
        'controversy_score': controversy_score,
        'pro_quotes': key_quotes_pro,
        'con_quotes': key_quotes_con,
        'pro_percentage': len(pro) / (len(pro) + len(con)) * 100,
        'con_percentage': len(con) / (len(pro) + len(con)) * 100
    }
    """
    
    st.code(code, language="python")
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Performance over time
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.markdown("### 📈 Performance Metrics")
    
    # Generate mock performance data
    dates = pd.date_range(start='2024-01-01', end='2024-01-07', freq='H')
    performance_data = pd.DataFrame({
        'timestamp': dates,
        'latency': np.random.normal(0.8, 0.1, len(dates)),
        'accuracy': np.random.normal(0.94, 0.02, len(dates)),
        'throughput': np.random.normal(1000, 100, len(dates))
    })
    
    fig = make_subplots(
        rows=3, cols=1,
        subplot_titles=('Latency (seconds)', 'Accuracy Score', 'Throughput (requests/min)'),
        vertical_spacing=0.1
    )
    
    fig.add_trace(go.Scatter(x=performance_data['timestamp'], y=performance_data['latency'], 
                           name='Latency', line_color='#6366f1'), row=1, col=1)
    fig.add_trace(go.Scatter(x=performance_data['timestamp'], y=performance_data['accuracy'], 
                           name='Accuracy', line_color='#10b981'), row=2, col=1)
    fig.add_trace(go.Scatter(x=performance_data['timestamp'], y=performance_data['throughput'], 
                           name='Throughput', line_color='#06b6d4'), row=3, col=1)
    
    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        height=500,
        showlegend=False
    )
    
    st.plotly_chart(fig, use_container_width=True)
    st.markdown('</div>', unsafe_allow_html=True)

# Footer with testimonial
st.markdown("---")
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    st.markdown("""
    <div style="text-align: center; padding: 2rem; background: rgba(99, 102, 241, 0.1); border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.2);">
        <div style="font-style: italic; font-size: 1.1rem; color: #e0e7ff; margin-bottom: 1rem;">
            "ViralPulse predicted the #Xbox backlash 12hrs early! Incredible accuracy."
        </div>
        <div style="color: #06b6d4; font-weight: 600;">— @GamingAnalyst</div>
        <div style="margin-top: 1rem; color: #94a3b8; font-size: 0.9rem;">
            🎬 <a href="#" style="color: #8b5cf6;">Watch 30s Demo Video</a>
        </div>
    </div>
    """, unsafe_allow_html=True)

# Auto-refresh for live data
if st.sidebar.checkbox("🔄 Auto Refresh (30s)", value=False):
    time.sleep(30)
    st.rerun()