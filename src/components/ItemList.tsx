import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const ItemList = ({ items, onEdit, onDelete }: ItemListProps) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.colour}</p>
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => { if (item._id) { onDelete(item._id); } }} > Delete </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
