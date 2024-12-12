// script.js
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    // Criar novo item da lista
    const taskItem = document.createElement("li");
    taskItem.className = "task";
    taskItem.textContent = taskInput.value;

    // Marcar como concluído ao clicar
    taskItem.onclick = function() {
        taskItem.classList.toggle("completed");
    };

    // Botão de excluir
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
        taskList.removeChild(taskItem);
    };

    // Adiciona o botão de excluir ao item da tarefa
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Limpar o campo de entrada
    taskInput.value = "";
}

