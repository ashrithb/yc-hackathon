from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv
from posthog_raw_client import PostHogRawClient

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize PostHog raw client
posthog_client = None
try:
    posthog_client = PostHogRawClient()
    print("✅ PostHog raw client initialized successfully")
except ValueError as e:
    print(f"⚠️  PostHog client initialization failed: {e}")
    print("   Some endpoints will return errors.")

@app.route('/api/posthog/raw/events', methods=['GET'])
def get_raw_events():
    """Get raw events data from PostHog with no processing"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    try:
        distinct_id = request.args.get('distinct_id')
        limit = request.args.get('limit', 100, type=int) 
        days_back = request.args.get('days_back', 30, type=int)
        
        # Return raw PostHog response with no modifications
        raw_response = posthog_client.get_raw_events(distinct_id, limit, days_back)
        return jsonify(raw_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posthog/raw/users', methods=['GET'])
def get_raw_users():
    """Get raw users data from PostHog with no processing"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    try:
        limit = request.args.get('limit', 100, type=int)
        days_back = request.args.get('days_back', 30, type=int)
        
        # Return raw PostHog response with no modifications
        raw_response = posthog_client.get_raw_users(limit, days_back)['results']
        return jsonify(raw_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posthog/raw/event-types', methods=['GET'])
def get_raw_event_types():
    """Get raw event types data from PostHog"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    try:
        days_back = request.args.get('days_back', 30, type=int)
        
        # Return raw PostHog response with no modifications
        raw_response = posthog_client.get_raw_event_types(days_back)
        return jsonify(raw_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posthog/raw/query', methods=['POST'])
def execute_raw_query():
    """Execute any raw HogQL query"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    try:
        data = request.json
        query = data.get('query')
        
        if not query:
            return jsonify({"error": "Query parameter is required"}), 400
        
        # Execute raw query and return unprocessed response
        raw_response = posthog_client.raw_query(query)
        return jsonify(raw_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posthog/send-event', methods=['POST'])
def send_event():
    """Send an event to PostHog"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    try:
        data = request.json
        distinct_id = data.get('distinct_id')
        event = data.get('event')
        properties = data.get('properties', {})
        
        if not distinct_id or not event:
            return jsonify({"error": "distinct_id and event are required"}), 400
        
        result = posthog_client.send_event(distinct_id, event, properties)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posthog/info', methods=['GET'])
def get_info():
    """Get PostHog project info"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    return jsonify(posthog_client.get_project_info())

@app.route('/api/user/<user_id>/raw', methods=['GET'])
def get_user_raw_data(user_id):
    """Get user behavior data: clicks, scrolls, time spent per page/section"""
    if not posthog_client:
        return jsonify({"error": "PostHog client not configured"}), 500
    
    try:
        days_back = request.args.get('days_back', 30, type=int)
        
        # Get behavior data for this user - clicks, scrolls, time spent
        raw_response = posthog_client.get_user_behavior_data(user_id, days_back=days_back)['results']
        return jsonify(raw_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "posthog_configured": posthog_client is not None,
        "endpoints": [
            "GET /api/user/{user_id}/raw",
            "GET /api/posthog/raw/events",
            "GET /api/posthog/raw/users", 
            "GET /api/posthog/raw/event-types",
            "POST /api/posthog/raw/query",
            "POST /api/posthog/send-event",
            "GET /api/posthog/info"
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)