import { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote(e) {
    e.preventDefault();
    if (title.trim() === "" || text.trim() === "") return;

    const newNote = {
      id: Date.now(),
      title: title,
      text: text,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setText("");
  }

  function handleDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
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
          Add Notes
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
