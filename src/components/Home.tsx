import { useState } from "react";
import CategorySlider from "./CategorySlider";
import Navbar from "./Navbar";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  return (
    <>
      <Navbar
        setSearchQuery={setSearchQuery}
        setFilterStatus={setFilterStatus}
      />
      <CategorySlider searchQuery={searchQuery} filterStatus={filterStatus} />
    </>
  );
};
export default Home;
