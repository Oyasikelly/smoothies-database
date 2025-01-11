import { Link } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";

export default function SmoothieCard({ smoothie, onDelete }) {
  const cardStyle = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  return (
    <animated.div className="smoothie-card" style={cardStyle}>
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
    </animated.div>
  );
}
