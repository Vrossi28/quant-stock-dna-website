import { DotIcon } from "lucide-react";

const ListItem = ({
  content,
  asBulletedList,
}: {
  content: string;
  asBulletedList: boolean;
}) => {
  if (asBulletedList) {
    return (
      <div className="grid grid-cols-12 pt-2 md:flex items-start justify-center md:justify-start md:items-center md:text-justify">
        <DotIcon className="w-4 h-4" /> <p className="col-span-10">{content}</p>
      </div>
    );
  } else {
    return <h1 className="text-base flex-wrap">{content}</h1>;
  }
};

export default ListItem;
