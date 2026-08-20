import { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/notes/${userId}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to fetch notes:", err));
  }, [userId]);

  async function handleAddNote(e) {
    e.preventDefault();
    if (title.trim() === "" || text.trim() === "") return;

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, title, text }),
      });

      const newNote = await response.json();
      setNotes([...notes, newNote]);
      setTitle("");
      setText("");
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  }

  if (!userId) {
    return (
      <div className="container py-5">
        <p>
          Please <a href="/login">login</a>to view your notes.
        </p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="mb-4">My Notes</h1>

      <form onSubmit={handleAddNote} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write Your Notes..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>

      <div className="row g-3">
        {notes.map((note) => (
          <div className="col-md-4" key={note.id}>
            <div className="card p-3">
              <h5>{note.title}</h5>
              <p>{note.text}</p>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Notes;
