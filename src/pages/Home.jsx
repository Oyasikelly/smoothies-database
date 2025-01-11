import supabase from "../config/SupabaseClient";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

// component
import SmoothieCard from "../component/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => {
        return sm.id !== id;
      });
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("An error occured!");
        setSmoothies(null);
        // console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
        // console.log(data);
      }
    };
    fetchSmoothies();
  }, [orderBy]);

  const fadeInStyle = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div className="page home" style={fadeInStyle}>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <>
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </animated.div>
  );
};

export default Home;
