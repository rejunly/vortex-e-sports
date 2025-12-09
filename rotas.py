from app import app
from flask import render_template
import calendar

# --- Rota de homepage --- 
@app.route('/')
def logincadastro():
    return render_template('jogopaginalogin.html')

@app.route('/home')
def home():   
    return render_template('home.html', calendario = calendar.month(2026, 1))


@app.route('/timevortex')
def timevortex():
    return render_template('index.html')