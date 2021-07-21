export function deleteEmptyKey(values) {
  for (const key in values) {
    if (values[key] === '' || !values[key]) {
      delete values[key];
    }
  }
  return values;
}
