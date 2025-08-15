import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import folium
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from src.mock_data import MockDataGenerator

def create_heatmap():
    """Create global trend heatmap using Folium"""
    
    # Initialize map centered on world
    m = folium.Map(
        location=[20, 0],
        zoom_start=2,
        tiles=None
    )
    
    # Add dark theme tile
    folium.TileLayer(
        tiles='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attr='CartoDB',
        name='Dark Mode',
        control=True
    ).add_to(m)
    
    # Generate location data
    mock_gen = MockDataGenerator()
    locations = mock_gen.generate_geographic_data()
    
    # Add heatmap points
    for location in locations:
        # Color based on intensity
        if location['intensity'] > 80:
            color = '#ef4444'  # Red for high intensity
            radius = 15
        elif location['intensity'] > 60:
            color = '#f59e0b'  # Orange for medium intensity
            radius = 12
        else:
            color = '#10b981'  # Green for low intensity
            radius = 8
        
        folium.CircleMarker(
            location=[location['lat'], location['lng']],
            radius=radius,
            popup=f"""
            <div style='font-family: Arial; min-width: 200px;'>
                <h4 style='color: #333; margin-bottom: 10px;'>{location['city']}</h4>
                <p><strong>Trend Intensity:</strong> {location['intensity']}/100</p>
                <p><strong>Active Topics:</strong> #{random.choice(['AIethics', 'ClimateAction', 'TechDebate'])}</p>
                <p><strong>Engagement:</strong> {random.randint(10, 500)}K interactions</p>
            </div>
            """,
            color=color,
            fill=True,
            opacity=0.8,
            fillOpacity=0.6,
            weight=2
        ).add_to(m)
        
        # Add pulsing effect for high intensity locations
        if location['intensity'] > 80:
            folium.CircleMarker(
                location=[location['lat'], location['lng']],
                radius=radius + 5,
                color=color,
                fill=False,
                opacity=0.3,
                weight=1
            ).add_to(m)
    
    return m

def create_trend_radar(trends_data):
    """Create trend DNA radar chart"""
    
    # Select top 5 trends for radar
    top_trends = trends_data[:5]
    
    categories = ['Virality', 'Sentiment', 'Controversy', 'Growth', 'Geographic Spread']
    
    fig = go.Figure()
    
    colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
    
    for i, trend in enumerate(top_trends):
        values = [
            trend['views'] / 100000,  # Normalize virality
            (trend['sentiment_score'] + 1) * 50,  # Convert sentiment to 0-100
            trend['controversy'],
            max(0, trend['growth_rate']),
            trend['geographic_spread']
        ]
        
        fig.add_trace(go.Scatterpolar(
            r=values,
            theta=categories,
            fill='toself',
            name=f"#{trend['topic']}",
            line_color=colors[i % len(colors)],
            opacity=0.6
        ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 100],
                gridcolor="rgba(148, 163, 184, 0.3)",
                linecolor="rgba(148, 163, 184, 0.5)"
            ),
            angularaxis=dict(
                gridcolor="rgba(148, 163, 184, 0.3)",
                linecolor="rgba(148, 163, 184, 0.5)"
            ),
            bgcolor="rgba(0,0,0,0)"
        ),
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        title={
            'text': "Multi-Dimensional Trend Analysis",
            'x': 0.5,
            'font': {'color': '#e0e7ff'}
        },
        height=400,
        legend=dict(
            font=dict(color='#e0e7ff')
        )
    )
    
    return fig

def create_sentiment_chart():
    """Create real-time sentiment flow chart"""
    
    mock_gen = MockDataGenerator()
    sentiment_data = mock_gen.generate_sentiment_timeline(hours=12)
    
    fig = go.Figure()
    
    # Add sentiment line
    fig.add_trace(go.Scatter(
        x=sentiment_data['timestamp'],
        y=sentiment_data['sentiment'],
        mode='lines',
        name='Sentiment Score',
        line=dict(color='#06b6d4', width=3),
        fill='tonexty' if len(fig.data) > 0 else None,
        fillcolor='rgba(6, 182, 212, 0.1)'
    ))
    
    # Add volume bars (secondary y-axis)
    fig.add_trace(go.Bar(
        x=sentiment_data['timestamp'],
        y=sentiment_data['volume'] / 1000,  # Scale down volume
        name='Volume (K)',
        opacity=0.3,
        marker_color='#8b5cf6',
        yaxis='y2'
    ))
    
    # Update layout for dual y-axis
    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        height=250,
        margin=dict(l=20, r=20, t=30, b=20),
        xaxis=dict(
            gridcolor="rgba(148, 163, 184, 0.2)",
            linecolor="rgba(148, 163, 184, 0.3)"
        ),
        yaxis=dict(
            title="Sentiment",
            range=[-1, 1],
            gridcolor="rgba(148, 163, 184, 0.2)",
            linecolor="rgba(148, 163, 184, 0.3)"
        ),
        yaxis2=dict(
            title="Volume (K)",
            overlaying='y',
            side='right',
            gridcolor="rgba(148, 163, 184, 0.1)"
        ),
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1,
            font=dict(color='#e0e7ff')
        ),
        showlegend=False
    )
    
    return fig

def create_controversy_timeline(trend_topic: str):
    """Create controversy evolution timeline"""
    
    # Generate timeline data
    hours = 48
    timestamps = pd.date_range(
        start=datetime.now() - timedelta(hours=hours),
        end=datetime.now(),
        freq='2H'
    )
    
    controversy_scores = []
    base_controversy = random.randint(40, 80)
    
    for i, timestamp in enumerate(timestamps):
        # Simulate controversy evolution with some events
        noise = random.uniform(-10, 10)
        
        # Add some "events" that spike controversy
        if i == len(timestamps) // 3:  # Event 1
            spike = 20
        elif i == 2 * len(timestamps) // 3:  # Event 2
            spike = 15
        else:
            spike = 0
        
        score = min(100, max(0, base_controversy + noise + spike))
        controversy_scores.append(score)
    
    fig = go.Figure()
    
    # Add controversy line
    fig.add_trace(go.Scatter(
        x=timestamps,
        y=controversy_scores,
        mode='lines+markers',
        name='Controversy Score',
        line=dict(color='#ef4444', width=3),
        marker=dict(size=6, color='#ef4444'),
        fill='tonexty',
        fillcolor='rgba(239, 68, 68, 0.1)'
    ))
    
    # Add threshold line
    fig.add_hline(
        y=70, 
        line_dash="dash", 
        line_color="rgba(239, 68, 68, 0.5)",
        annotation_text="High Controversy Threshold",
        annotation_position="top right"
    )
    
    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        title=f"Controversy Evolution: #{trend_topic}",
        xaxis_title="Time",
        yaxis_title="Controversy Score",
        height=300,
        xaxis=dict(gridcolor="rgba(148, 163, 184, 0.2)"),
        yaxis=dict(
            gridcolor="rgba(148, 163, 184, 0.2)",
            range=[0, 100]
        )
    )
    
    return fig

def create_platform_comparison():
    """Create platform engagement comparison"""
    
    platforms = ['Twitter', 'Reddit', 'TikTok', 'Instagram']
    metrics = ['Reach', 'Engagement', 'Controversy', 'Sentiment']
    
    # Generate data
    data = []
    for platform in platforms:
        for metric in metrics:
            value = random.randint(30, 95)
            data.append({
                'Platform': platform,
                'Metric': metric,
                'Value': value
            })
    
    df = pd.DataFrame(data)
    
    fig = px.bar(
        df,
        x='Platform',
        y='Value', 
        color='Metric',
        barmode='group',
        color_discrete_sequence=['#6366f1', '#8b5cf6', '#06b6d4', '#10b981']
    )
    
    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        title="Cross-Platform Performance",
        height=300
    )
    
    return fig