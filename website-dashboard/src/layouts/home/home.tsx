import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import classes from "./sass/home.module.scss";
import Aside from "../../components/shared/sidebar/aside/aside";
import Header from "../../components/shared/navbar/header";
import { useAppSelector } from "../../redux/store/store";
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
  } = useAppSelector((state) => state.modal);

  const { adminApiKeys, keysReturned, searchKeysReturned, searchAPIKeys } =
    useAppSelector((state) => state.typesense);

  const closeKeyModal = (adminOrSearch: "admin" | "search") => {
    dispatch(closeAPIKeyModal({ value: adminOrSearch }));
  };

  return (
    <div className={clsx(classes.Home, "dark")}>
      {keysReturned && (
        <ApiKeyDisplayModal
          apiKey={adminApiKeys.value || "No key"}
          onClick={() => closeKeyModal("admin")}
        />
      )}
      {searchKeysReturned && (
        <ApiKeyDisplayModal
          apiKey={searchAPIKeys.value || "No key"}
          onClick={() => closeKeyModal("search")}
        />
      )}
      {openCurationModal && <AddCurationsModal />}
      {openSynonymModal && <AddSynonymModal />}
      {openAdminAPIKeyModal && <AdminAPIKeyModal />}
      {openAliasesModal && <AddAliasesModal />}
      <aside
        className={clsx(
          classes.Aside,
          "px-5 pt-3 border-r-2 border-[#e5e5e5] dark:border-gray-600 dark:bg-[#0d1117]"
        )}
      >
        <Aside />
      </aside>
      <header
        className={clsx(
          classes.Header,
          "px-3 py-2 dark:bg-[#161b22] border-b-2 border-[#e5e5e5] dark:border-gray-600"
        )}
      >
        <Header />
      </header>
      <main className={clsx(classes.Main, "dark:bg-[#0d1117]")}>
        <Outlet />
      </main>
    </div>
  );
}
export default Home;
