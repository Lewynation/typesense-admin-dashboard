interface Props {
  text: string;
  onClick: () => void;
  Icon: React.FC;
}

function Button({ text, onClick, Icon }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-[#4c3ded] cursor-pointer p-2 rounded-lg text-white font-lato text-sm flex items-center"
    >
      <Icon />
      <p className="ml-2">{text}</p>
    </button>
  );
}

export default Button;
