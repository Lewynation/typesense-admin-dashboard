import image from "./images/notfound.png";

interface Props {
  description?: string;
}

function NoRecords({ description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img src={image} alt="notFound" className="w-96" />
      <p className="font-bold font-lato text-lg mt-5">No records were found</p>
      <p className="font-lato text-base mb-5">{description}</p>
    </div>
  );
}

NoRecords.defaultProps = {
  description: "You Records will appear here",
};

export default NoRecords;
