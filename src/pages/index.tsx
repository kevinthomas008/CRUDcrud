import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { NextPage } from 'next';
import { RootState, AppDispatch } from '../store/store';
import { fetchItems, addItem, editItem, removeItem } from '../store/itemSlice';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { Item } from '../types';

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleCreateOrUpdate = (item: Item) => {
    if (currentItem && currentItem._id) {
      dispatch(editItem({ id: currentItem._id, item }));
    } else {
      dispatch(addItem(item));
    }
    setCurrentItem(null);
  };

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
  };

  const handleDelete = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <ItemForm onSubmit={handleCreateOrUpdate} initialData={currentItem} />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
