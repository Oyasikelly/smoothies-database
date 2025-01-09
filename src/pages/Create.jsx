import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";
const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();

    setTimeout(() => {
      if (error) {
        console.log(error);
        setFormError("An error has occured! ");
      }
      if (data) {
        console.log(data);
        setFormError(null);
        navigate("/");
      }
    }, 100); // Small delay for smoother UX
  }
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <div className="btns">
          <button>Create Smoothie Recipe</button>

          <Link className="link" to="/">
            Go to Home
          </Link>
        </div>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
