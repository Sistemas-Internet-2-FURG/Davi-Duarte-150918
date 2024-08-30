from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'Chave_dos_guri'  # Chave secreta para flash messages

db = SQLAlchemy(app)

# Definição das tabelas
class Turma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    limite_vagas = db.Column(db.Integer, nullable=False)  # Limite de vagas na turma
    alunos = db.relationship('Aluno', backref='turma', lazy=True)

class Aluno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(20), unique=True, nullable=False)  # Novo campo de matrícula
    turma_id = db.Column(db.Integer, db.ForeignKey('turma.id'), nullable=False)

# Inicializando o banco de dados dentro do contexto do aplicativo
with app.app_context():
    db.create_all()

# Rota para listar turmas e alunos
@app.route('/')
def index():
    turmas = Turma.query.all()
    alunos = Aluno.query.all()
    return render_template('index.html', turmas=turmas, alunos=alunos)

# CRUD para Turma
@app.route('/turmas', methods=['GET', 'POST'])
def manage_turmas():
    if request.method == 'POST':
        nome = request.form.get('nome')
        limite_vagas = request.form.get('limite_vagas')

        if not nome or not limite_vagas:
            flash('Todos os campos são obrigatórios.', 'error')
            return redirect(url_for('manage_turmas'))

        try:
            limite_vagas = int(limite_vagas)
            if limite_vagas <= 0:
                raise ValueError
        except ValueError:
            flash('O limite de vagas deve ser um número inteiro positivo.', 'error')
            return redirect(url_for('manage_turmas'))

        nova_turma = Turma(nome=nome, limite_vagas=limite_vagas)
        db.session.add(nova_turma)
        db.session.commit()
        flash('Turma adicionada com sucesso!', 'success')
        return redirect(url_for('index'))
    turmas = Turma.query.all()
    return render_template('turmas.html', turmas=turmas)

@app.route('/turma/edit/<int:id>', methods=['GET', 'POST'])
def edit_turma(id):
    turma = Turma.query.get_or_404(id)
    if request.method == 'POST':
        nome = request.form.get('nome')
        limite_vagas = request.form.get('limite_vagas')

        if not nome or not limite_vagas:
            flash('Todos os campos são obrigatórios.', 'error')
            return redirect(url_for('edit_turma', id=turma.id))

        try:
            limite_vagas = int(limite_vagas)
            if limite_vagas <= 0:
                raise ValueError
        except ValueError:
            flash('O limite de vagas deve ser um número inteiro positivo.', 'error')
            return redirect(url_for('edit_turma', id=turma.id))

        turma.nome = nome
        turma.limite_vagas = limite_vagas
        db.session.commit()
        flash('Turma atualizada com sucesso!', 'success')
        return redirect(url_for('index'))
    return render_template('edit_turma.html', turma=turma)

@app.route('/turma/delete/<int:id>')
def delete_turma(id):
    turma = Turma.query.get_or_404(id)
    
    # Verificar se a turma tem alunos associados
    if turma.alunos:
        flash('Não é possível excluir a turma. Existem alunos associados a esta turma.', 'error')
        return redirect(url_for('index'))
    
    db.session.delete(turma)
    db.session.commit()
    flash('Turma excluída com sucesso!', 'success')
    return redirect(url_for('index'))

# CRUD para Aluno
@app.route('/alunos', methods=['GET', 'POST'])
def manage_alunos():
    turmas = Turma.query.all()
    if request.method == 'POST':
        nome = request.form.get('nome')
        matricula = request.form.get('matricula')
        turma_id = request.form.get('turma_id')

        if not nome or not matricula or not turma_id:
            flash('Todos os campos são obrigatórios.', 'error')
            return redirect(url_for('manage_alunos'))

        turma = Turma.query.get(turma_id)
        if len(turma.alunos) >= turma.limite_vagas:
            flash('Turma já está cheia.', 'error')
            return redirect(url_for('manage_alunos'))

        if Aluno.query.filter_by(matricula=matricula).first():
            flash('Matrícula já existente. Por favor, escolha outra.', 'error')
            return redirect(url_for('manage_alunos'))

        novo_aluno = Aluno(nome=nome, matricula=matricula, turma_id=turma_id)
        db.session.add(novo_aluno)
        db.session.commit()
        flash('Aluno adicionado com sucesso!', 'success')
        return redirect(url_for('index'))
    alunos = Aluno.query.all()
    return render_template('alunos.html', alunos=alunos, turmas=turmas)

@app.route('/aluno/edit/<int:id>', methods=['GET', 'POST'])
def edit_aluno(id):
    aluno = Aluno.query.get_or_404(id)
    turmas = Turma.query.all()
    if request.method == 'POST':
        nome = request.form.get('nome')
        matricula = request.form.get('matricula')
        turma_id = request.form.get('turma_id')

        if not nome or not matricula or not turma_id:
            flash('Todos os campos são obrigatórios.', 'error')
            return redirect(url_for('edit_aluno', id=aluno.id))

        turma = Turma.query.get(turma_id)
        if aluno.turma_id != turma.id and len(turma.alunos) >= turma.limite_vagas:
            flash('A turma selecionada já atingiu o limite de vagas.', 'error')
            return redirect(url_for('edit_aluno', id=aluno.id))

        if Aluno.query.filter(Aluno.matricula == matricula, Aluno.id != aluno.id).first():
            flash('Matrícula já existente. Por favor, escolha outra.', 'error')
            return redirect(url_for('edit_aluno', id=aluno.id))

        aluno.nome = nome
        aluno.matricula = matricula
        aluno.turma_id = turma_id
        db.session.commit()
        flash('Aluno atualizado com sucesso!', 'success')
        return redirect(url_for('index'))
    return render_template('edit_aluno.html', aluno=aluno, turmas=turmas)

@app.route('/aluno/delete/<int:id>')
def delete_aluno(id):
    aluno = Aluno.query.get_or_404(id)
    db.session.delete(aluno)
    db.session.commit()
    flash('Aluno excluído com sucesso!', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
