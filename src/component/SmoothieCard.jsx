import { Link } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useState } from "react";
export default function SmoothieCard({ smoothie, onDelete }) {
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={() => onDelete(smoothie.id)}>
          delete
        </i>
      </div>
    </div>
  );
}
