import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import classes from "./sass/home.module.scss";
import Aside from "../../components/shared/sidebar/aside/aside";
import Header from "../../components/shared/navbar/header";
import { RootState } from "../../redux/store/store";
import AddCurationsModal from "../../components/pages/curations/addCurationsModal/addCurationsModal";
import AddSynonymModal from "../../components/pages/synonyms/addSynonymsModal/addSynonymModal";
import AdminAPIKeyModal from "../../components/pages/apiKeys/adminAPIKeyModal/adminAPIKeyModal";
import AddAliasesModal from "../../components/pages/aliases/addAliasesModal/addAliasesModal";
import ApiKeyDisplayModal from "../../components/shared/APIKeyDisplayModal/apiKeyDisplayModal";
import { closeAPIKeyModal } from "../../redux/slices/typesenseSlice/typesenseSlice";

function Home() {
  const dispatch = useDispatch();

  const {
    openCurationModal,
    openSynonymModal,
    openAdminAPIKeyModal,
    openAliasesModal,
  } = useSelector((state: RootState) => state.modal);
  const { adminApiKeys, keysReturned } = useSelector(
    (state: RootState) => state.typesense
  );

  const closeKeyModal = () => {
    dispatch(closeAPIKeyModal());
  };

  return (
    <div className={classes.Home}>
      {keysReturned && (
        <ApiKeyDisplayModal
          apiKey={adminApiKeys.value || "No key"}
          onClick={closeKeyModal}
        />
      )}
      {openCurationModal && <AddCurationsModal />}
      {openSynonymModal && <AddSynonymModal />}
      {openAdminAPIKeyModal && <AdminAPIKeyModal />}
      {openAliasesModal && <AddAliasesModal />}
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
