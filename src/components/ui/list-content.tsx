import { useTranslation } from "react-i18next";
import ListItem from "./list-item";

interface ListProps {
  items: TextProps[];
}

const ListContent: React.FC<ListProps> = ({ items }) => {
  const { t } = useTranslation();
  return (
    <ul className="pt-2">
      {items.map((content, index) => (
        <li key={index} className="gap-x-2">
          <div>
            <h1 className="text-xl md:text-2xl pt-2 font-semibold">
              {t(content.title)}
            </h1>
          </div>
          <div>
            <h1 className="text-sm md:text-lg text-justify flex-wrap flex">
              {t(content.subtitle)}
            </h1>
          </div>
          <div>
            {content.description.map((item, itemIndex) => (
              <ListItem
                key={itemIndex}
                content={t(item.content)}
                asBulletedList={item.asBulletedList}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListContent;
