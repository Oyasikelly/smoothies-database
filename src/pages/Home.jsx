import supabase from "../config/SupabaseClient";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

// component
import SmoothieCard from "../component/SmoothieCard";
import Footer from "../component/Footer";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("smoothies") // Replace with your table name
        .delete()
        .eq("id", id); // Match the record with the specific ID

      if (error) {
        console.error("Error deleting record:", error.message);
        return;
      }
      console.log("Record deleted successfully");
    } catch (err) {
      console.error("Unexpected error:", err);
    }

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
            <button
              className={orderBy == "created_at" ? "order-by-active" : ""}
              onClick={() => setOrderBy("created_at")}
            >
              Time Created
            </button>
            <button
              className={orderBy == "title" ? "order-by-active" : ""}
              onClick={() => setOrderBy("title")}
            >
              Title
            </button>
            <button
              className={orderBy == "rating" ? "order-by-active" : ""}
              onClick={() => setOrderBy("rating")}
            >
              Rating
            </button>
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

      <Footer />
    </animated.div>
  );
};

export default Home;
