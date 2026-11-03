export function formatPrice(value) {
  return `R${Number(value).toFixed(2)}`;
}

export function getCategories(items) {
  const unique = [...new Set(items.map((i) => i.category))].sort();
  return ["All", ...unique];
}

export function filterItems(items, { query, category, maxPrice }) {
  const q = query.trim().toLowerCase();
  const limit = maxPrice.trim() === "" ? null : parseFloat(maxPrice);

  return items.filter((item) => {
    const matchesName = q === "" || item.name.toLowerCase().includes(q);
    const matchesCategory = category === "All" || item.category === category;
    const matchesPrice = limit === null || Number.isNaN(limit) || item.price <= limit;
    return matchesName && matchesCategory && matchesPrice;
  });
}

export function getStats(visibleItems) {
  const count = visibleItems.length;
  const average =
    count === 0 ? 0 : visibleItems.reduce((sum, i) => sum + i.price, 0) / count;
  return { count, average };
}