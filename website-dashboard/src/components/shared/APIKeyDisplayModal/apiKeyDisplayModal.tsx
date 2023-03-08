import ModalBackground from "../modalBackground/modalBackground";

interface Props {
  apiKey: string;
  onClick: () => void;
}

function ApiKeyDisplayModal({ apiKey, onClick }: Props) {
  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 ">
        <h1 className="font-bold font-lato text-xl mb-2">Your API Key</h1>
        <p className="font-lato text-base ">
          This is your API key. Copy it as it will not be displayed again!
        </p>
        <p className="font-lato font-bold">{apiKey}</p>
        <div className="flex justify-between">
          <div />
          <button
            type="button"
            className="my-3 text-xl mx-2 outline-none font-lato font-bold"
            onClick={onClick}
          >
            OK
          </button>
        </div>
      </div>
    </ModalBackground>
  );
}

export default ApiKeyDisplayModal;
