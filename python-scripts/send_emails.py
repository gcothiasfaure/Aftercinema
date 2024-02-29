import sqlite3
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

# Connexion à la base de données SQLite
conn = sqlite3.connect('database.db')
cur = conn.cursor()

# Récupérer les emails depuis la table appropriée
cur.execute("SELECT email FROM emails")
emails = [row[0] for row in cur.fetchall()]

# Fermer la connexion à la base de données SQLite
conn.close()

# Créer le contenu de la newsletter
newsletter_subject = "Sujet de la newsletter"
newsletter_content = "Contenu de la newsletter"

print(os.environ.get("SENDGRID_API_KEY"))
# Initialiser l'API SendGrid avec votre clé d'API
# sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

# # Envoyer la newsletter à tous les emails récupérés
# for email in emails:
#     message = Mail(
#         from_email='sender@example.com',
#         to_emails=email,
#         subject=newsletter_subject,
#         html_content=newsletter_content)
    
#     try:
#         response = sg.send(message)
#         print(f"Newsletter sent successfully to {email}")
#     except Exception as e:
#         print(f"Error sending newsletter to {email}: {e}")
