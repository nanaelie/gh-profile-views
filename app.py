import os
from datetime import datetime, timedelta
from flask import Flask, request, send_file
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import io

# Chargement de la variable d'environnement pour la base de données
# from dotenv import load_dotenv
# load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Configuration de la base de données
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Initialisation de Flask
app = Flask(__name__)

# Définition du modèle Views
from DB import create_views_table, save, remove, get_views

@app.route('/counter')
def counter():
    try:
        ip = request.headers.get('X-Forwarded-For', request.remote_addr)  # Récupérer l'IP
        now = datetime.utcnow()  # Heure actuelle en UTC
        cutoff = now - timedelta(hours=1)  # Limite de temps pour supprimer les anciennes vues (1 heure)

        # Nettoyage des vues anciennes
        remove(cutoff)

        # Enregistrement de la vue actuelle
        save(ip, now)

        # Récupérer le nombre total de vues
        count = get_views()

        # Générer l'image SVG pour afficher le nombre de vues
        svg = f'''
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20">
            <rect width="150" height="20" fill="#007acc"/>
            <text x="10" y="14" fill="white" font-size="12">Vues: {count}</text>
        </svg>
        '''
        
        # Retourner l'image SVG
        return send_file(io.BytesIO(svg.encode()), mimetype='image/svg+xml')

    except Exception as e:
        # Gestion des erreurs
        print(f"Erreur dans la route '/counter': {e}")
        return "Une erreur est survenue, veuillez réessayer plus tard.", 500

if __name__ == '__main__':
    # Créer la table des vues à la première exécution
    try:
        create_views_table()
        app.run()
    except Exception as e:
        print(f"Erreur lors de l'initialisation de la base de données: {e}")
