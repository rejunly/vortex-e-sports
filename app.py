from flask import Flask


app = Flask(__name__)
from rotas import *
if __name__ == '__main__':
    app.run(debug=True)
'''quero um calendario do mês de janeiro com um foco em dias especificos. Quando eu clicar no dia 25, apareça uma mensagem'''