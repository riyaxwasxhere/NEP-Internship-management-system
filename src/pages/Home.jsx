import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Button>
        <Link to="/student/dashboard">Go to student dashboard</Link>
      </Button>
    </div>
  );
}

export default Home;
