from flask import Flask, request, send_file
import sqlite3
from datetime import datetime, timedelta
import io

app = Flask(__name__)

from DB import create_views_table, save, remove, get_views

create_views_table()

@app.route('/counter')
def counter():
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    now = datetime.utcnow()
    cutoff = now - timedelta(hours=1)
    
    remove(cutoff)
    save(ip, now)
        
    count = get_views()

    svg = f'''
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20">
        <rect width="150" height="20" fill="#007acc"/>
        <text x="10" y="14" fill="white" font-size="12">Vues: {count}</text>
    </svg>
    '''
    return send_file(io.BytesIO(svg.encode()), mimetype='image/svg+xml')

if __name__ == '__main__':
    init_db()
    app.run()

