from flask import Flask, request, jsonify

app = Flask(__name__)

tasks = []

@app.route('/api/tarefas', methods=['POST'])
def add_task():
    data = request.json
    tasks.append(data['tarefa'])
    return jsonify({"message": "Tarefa adicionada!"}), 201

@app.route('/api/tarefas/<tarefa>', methods=['DELETE'])
def delete_task(tarefa):
    if tarefa in tasks:
        tasks.remove(tarefa)
        return jsonify({"message": "Tarefa removida!"}), 200
    return jsonify({"error": "Tarefa não encontrada."}), 404

if __name__ == '__main__':
    app.run(debug=True)

