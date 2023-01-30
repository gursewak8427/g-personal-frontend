import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="container p-2">
                <div className="card m-3">
                    <div className="p-3 d-flex align-items-center justify-content-center">
                        <button className="btn btn-primary m-2"><Link className="text-white" to={"/admin"}>Admin</Link></button>
                        <button className="btn btn-primary m-2"><Link className="text-white" to={"/agent"}>Agent</Link></button>
                        <button className="btn btn-primary m-2"><Link className="text-white" to={"/student"}>Student</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;