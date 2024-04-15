from flask import Flask, jsonify, request, redirect, session, url_for, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

CORS(app, supports_credentials=True)

# Configure the SQLAlchemy part of the app instance
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create an SQLAlchemy db instance
db = SQLAlchemy(app)

# Flask-Sessions configuration
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True

# Spotify OAuth settings
app.config['SPOTIPY_CLIENT_ID'] = os.getenv('SPOTIPY_CLIENT_ID')
app.config['SPOTIPY_CLIENT_SECRET'] = os.getenv('SPOTIPY_CLIENT_SECRET')
app.config['SPOTIPY_REDIRECT_URI'] = 'http://127.0.0.1:5000/callback'
scope = 'user-follow-read'

sp_oauth = SpotifyOAuth(app.config['SPOTIPY_CLIENT_ID'], app.config['SPOTIPY_CLIENT_SECRET'],
                        app.config['SPOTIPY_REDIRECT_URI'], scope=scope)

# Helper function to set the token in a secure, HTTP-only cookie
def set_token_cookie(token_info):
    response = make_response(redirect(url_for('get_followed_artists')))
    response.set_cookie('token_info', value=token_info['access_token'], secure=True, httponly=True)
    return response

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_cached_token(code)
    if token_info:
        return set_token_cookie(token_info)
    else:
        print("Failed to get token.")
        return 'Failed to get token', 401

@app.route('/get_followed_artists')
def get_followed_artists():
    token_info = request.cookies.get('token_info')
    if not token_info:
        print("No token info in session")
        return redirect(url_for('login'))   
    
    sp = spotipy.Spotify(auth=token_info)
    try: 
        results = sp.current_user_followed_artists(limit=20)
        artist_names = [artist['name'] for artist in results['artists']['items']]
        return jsonify(artist_names)
    except spotipy.SpotifyException as e:
        if e.http_status == 401:
            print("Token expired, refreshing...")
            token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
            return set_token_cookie(token_info)
        else: 
            print(f"Error fetching artists: {str(e)}")
            return jsonify({'error': 'Failed to fetch artists', 'message': str(e)}), 500
    except Exception as e:
        print(f"Error fetching artists: {str(e)}")
        return jsonify({'error': 'Failed to fetch artists', 'message': str(e)}), 500

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('hello_world')))
    response.set_cookie('token_info', expires=0)
    return response

if __name__ == '__main__':
    app.run(debug=True)
