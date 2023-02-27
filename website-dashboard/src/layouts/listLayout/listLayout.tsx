interface Propss {
  children: React.ReactNode;
}

function ListLayout({ children }: Propss) {
  return <div className="m-4 rounded-lg border-2 py-5 pb-7">{children}</div>;
}

export default ListLayout;
