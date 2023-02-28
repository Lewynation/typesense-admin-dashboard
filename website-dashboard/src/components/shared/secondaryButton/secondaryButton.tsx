interface Props {
  text: string;
  Icon: React.FC;
}

function SecondaryButton({ text, Icon }: Props) {
  return (
    <button
      type="button"
      className="bg-[#f1f0fe] font-lato text-base px-3 py-2 rounded-md font-bold flex gap-3 flex-row justify-start items-center"
    >
      <Icon />

      <p>{text}</p>
    </button>
  );
}

export default SecondaryButton;
