import { useDispatch } from "react-redux";
import AliasesListTile from "../../components/pages/aliases/aliasesListTile";
import AliasesListTitle from "../../components/pages/aliases/aliasesListTitle";
import SecondaryButton from "../../components/shared/secondaryButton/secondaryButton";
import ListLayout from "../../layouts/listLayout/listLayout";
import { openAliasesModal } from "../../redux/slices/modalSlice/modalSlice";
import { ReactComponent as AddIcon } from "./svgs/plus.svg";

function Aliases() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(openAliasesModal());
  };

  return (
    <>
      <div className="px-4 pt-4">
        <SecondaryButton text="Add Curation" onClick={onClick} Icon={AddIcon} />
      </div>
      <ListLayout>
        <AliasesListTitle />
        <AliasesListTile />
      </ListLayout>
    </>
  );
}

export default Aliases;
