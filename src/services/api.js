import { getURL } from '../common/utils';

const informationtUrl = 'https://eatgo-customer-api.ahastudio.com/';

const loginUrl = 'https://eatgo-login-api.ahastudio.com/';

const getItemURL = getURL(informationtUrl);

const getSesstionURL = getURL(loginUrl);


export async function fetchRegions() {
  const url = getItemURL('regions');
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchCategories() {
  const url = getItemURL('categories');
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurants({ regionName, categoryId }) {
  const params = `?region=${regionName}&category=${categoryId}`;
  const url = getItemURL(`restaurants${params}`);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurant({ restaurantId }) {
  const url = getItemURL(`restaurants/${restaurantId}`);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postLogin({ email, password }) {
  const url = getSesstionURL('session');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await response.json();
  return accessToken;
}

export async function postReview({
  accessToken, restaurantId, score, description,
}) {
  const url = getItemURL(`restaurants/${restaurantId}/reviews`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ score, description }),
  });
  await response.json();
}
