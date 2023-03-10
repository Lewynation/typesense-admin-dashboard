import ModalBackground from "../modalBackground/modalBackground";

interface Props {
  apiKey: string;
  onClick: () => void;
}

function ApiKeyDisplayModal({ apiKey, onClick }: Props) {
  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 dark:bg-[#0d1117]">
        <h1 className="font-bold font-lato text-xl mb-2 dark:text-gray-300">
          Your API Key
        </h1>
        <p className="font-lato text-base dark:text-gray-400">
          This is your API key. Copy it as it will not be displayed again!
        </p>
        <p className="font-lato font-bold dark:text-gray-300">{apiKey}</p>
        <div className="flex justify-between">
          <div />
          <button
            type="button"
            className="my-3 text-xl mx-2 outline-none font-lato font-bold dark:text-gray-400"
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
