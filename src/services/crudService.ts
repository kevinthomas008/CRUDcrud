import axios from 'axios';
import { Item } from '../types';

const API_URL = 'https://crudcrud.com/api/73db4f5b79f54bf4ad0c4d4614df2053/unicorns';

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item: Item): Promise<Item> => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id: string, item: Item): Promise<Item> => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
