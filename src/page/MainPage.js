import {Link, Outlet} from "react-router-dom";
import Header from "../component/common/Header";

export default function MainPage() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}
