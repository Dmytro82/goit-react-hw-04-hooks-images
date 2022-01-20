const API_KEY = '24206014-53908a4c1f0847c3b4c22896b';
const BASE_URL = 'https://pixabay.com/api';

export default async function imageFinderApi(name, page) {
  const response = await fetch(
    `${BASE_URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );

  return response.ok
    ? response.json()
    : Promise.reject(new Error('Nothing was found for your search!'));
}
