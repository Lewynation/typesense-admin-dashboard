interface Props {
  children: React.ReactNode;
}

function ModalBackground({ children }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-[2]">
      {children}
    </div>
  );
}

export default ModalBackground;
