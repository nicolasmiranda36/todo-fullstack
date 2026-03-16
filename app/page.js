"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      if (Array.isArray(data)) setTodos(data);
    };

    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tareas: newTodo, estado: false }),
    });

    const created = await res.json();
    setTodos((prev) => [...prev, created]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (todo) => {
    const updatedEstado = !todo.estado;

    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: updatedEstado }),
    });

    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, estado: updatedEstado } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Lista de Tareas
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{
                color: "#333",          // color del texto que escribís
                backgroundColor: "#eee",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc"
              }}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Agregar
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTodo(todo)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    todo.estado
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-400"
                  }`}
                >
                  {todo.estado && "✔"}
                </button>

                <span
                  className={`${
                    todo.estado
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {todo.tareas}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}