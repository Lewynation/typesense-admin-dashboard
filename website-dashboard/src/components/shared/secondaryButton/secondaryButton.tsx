interface Props {
  text: string;
  Icon: React.FC;
  onClick: () => void;
}

function SecondaryButton({ text, Icon, onClick }: Props) {
  return (
    <button
      type="button"
      className="bg-[#f1f0fe] font-lato text-base px-3 py-2 rounded-md font-bold flex gap-3 flex-row justify-start items-center"
      onClick={onClick}
    >
      <Icon />

      <p>{text}</p>
    </button>
  );
}

export default SecondaryButton;
