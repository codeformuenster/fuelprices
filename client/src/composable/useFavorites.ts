import { computed, type Ref } from 'vue';
import useLocalStorage from '@/composable/useLocalStorage.ts';


const {storage}: { storage: Ref<string[]> } = useLocalStorage('favorites', []);

const useFavorites = () => {
  const favoritesList = computed(() => {
    return storage.value;
  });

  const addFavorite = (id: string) => {
    storage.value = [ ...storage.value, id ];
  };

  const removeFavorite = (id: string) => {
    storage.value = storage.value.filter(item => item !== id);
  };

  return {
    favoritesList,
    addFavorite,
    removeFavorite
  };
};


export default useFavorites;