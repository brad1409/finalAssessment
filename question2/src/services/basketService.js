import { API_URL } from "../../apiConfig";

export async function fetchBasket() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = await response.json();

  if (!Array.isArray(json) || json.length === 0) {
    throw new Error("API returned no usable data");
  }

  return json.map((item) => ({
    id: String(item.id),
    name: String(item.name ?? "Unknown item"),
    category: String(item.category ?? "Other"),
    store: String(item.store ?? "Unknown store"),
    province: String(item.province ?? ""),
    area: String(item.area ?? ""),
    price: Number(item.price) || 0,
  }));
}