import { Route, Routes } from "react-router-dom"
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import Navbar from "../../common/Header/Navbar";
import { Helmet } from "react-helmet";

const Dashboard = ({ children, heading_title }) => {
    return (
        <div id="outer-main-content">
            <Header />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <Navbar heading_title={heading_title} />
                <div className="container-fluid py-4">
                    <div className="minHeight">
                        {children}
                    </div>
                    <Footer />
                </div>
            </main>
            <Helmet>
                <script src="/assets/js/core/popper.min.js"></script>
                <script src="/assets/js/core/bootstrap.min.js"></script>
                {/* <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script> */}
                <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
                <script src="/assets/js/plugins/chartjs.min.js"></script>
                <script src="/assets/js/soft-ui-dashboard.js" type="text/javascript" />
            </Helmet>
        </div>
    );
}

export default Dashboard;
