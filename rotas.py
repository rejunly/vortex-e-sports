from app import app
from flask import render_template
import calendar

'''Devo criar a tela perfil, desenvolvendo uma estrutura base para modificar com o DOM.'''
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

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/transmission')
def transmission():
    return render_template('tela_transmissao.html')