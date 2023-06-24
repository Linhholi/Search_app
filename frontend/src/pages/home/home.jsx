import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./home.css";

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className="bigbody">
            <h1>What would you like to do today?</h1>
            <div className="body">
                <a href="/">
                <img alt="" className="picture" src="https://searchengineland.com/wp-content/seloads/2014/08/map-local-search-ss-1920.jpg" />
                </a>
                <a href="/customers">
                <img alt="" className="picture"src="https://www.searchenginejournal.com/wp-content/uploads/2021/06/5-ways-to-find-new-foreign-customers-for-your-website-60db14c6602cd-1280x720.png" />
                </a>
            </div>
        </div>
        
        <Footer />
    </div>
  );
};
export default Home;
