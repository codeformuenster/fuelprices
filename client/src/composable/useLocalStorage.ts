import { ref, onMounted, onUnmounted, watchEffect, type Ref } from 'vue';

const useLocalStorage = (storageKey: string, defaultValue: any = '') => {
  const storage: Ref<any> = ref(null);

  const init = () => {
    const item: string | null = localStorage.getItem(storageKey);

    if (item !== null) {
      storage.value = parseItem(item);
      return;
    }

    storage.value = defaultValue;
  };

  const parseItem = (item: string) => {
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  };

  const handler = (event: StorageEvent) => {
    if (event.key === storageKey) {
      storage.value = event.newValue ? parseItem(event.newValue) : null;
    }
  };

  let initialized = false;

  if (typeof window !== 'undefined') {
    init();
    initialized = true;
  }

  onMounted(() => {
    if (!initialized) {
      init();
    }

    window.addEventListener('storage', handler, true);
  });

  watchEffect(() => {
    if (storage.value) {
      localStorage.setItem(storageKey, JSON.stringify(storage.value));
      window.dispatchEvent(
        new StorageEvent('storage', { key: storageKey, newValue: storage.value, storageArea: localStorage })
      );
    }
  });

  onUnmounted(() => {
    window.removeEventListener('storage', handler);
  });

  const remove = () => {
    try {
      storage.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    storage,
    remove,
  };
};


export default useLocalStorage;