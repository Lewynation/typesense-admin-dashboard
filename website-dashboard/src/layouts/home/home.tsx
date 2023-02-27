import { Outlet } from "react-router-dom";
import clsx from "clsx";
import classes from "./sass/home.module.scss";
import Aside from "../../components/shared/sidebar/aside/aside";
import Header from "../../components/shared/navbar/header";

function Home() {
  return (
    <div className={classes.Home}>
      <aside className={clsx(classes.Aside, "px-5 pt-3")}>
        <Aside />
      </aside>
      <header className={clsx(classes.Header, "px-3 py-2 ")}>
        <Header />
      </header>
      <main className={clsx(classes.Main)}>
        <Outlet />
      </main>
    </div>
  );
}
export default Home;
