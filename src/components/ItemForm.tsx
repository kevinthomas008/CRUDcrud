import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Item } from '../types';

interface ItemFormProps {
  onSubmit: (item: Item) => void;
  initialData?: Item | null;
}

const ItemForm = ({ onSubmit, initialData }: ItemFormProps) => {
  const [item, setItem] = useState<Item>({ name: '', colour: '' });

  useEffect(() => {
    if (initialData) {
      setItem(initialData);
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(item);
    setItem({ name: '', colour: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="colour"
        value={item.colour}
        onChange={handleChange}
        placeholder="Colour"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
