interface IProps {
  cardId: number;
}

const DetailedInfo = ({ cardId }: IProps) => {
  return (
    <h3>
      New url: <span>{cardId}</span>
    </h3>
  );
};

export default DetailedInfo;
