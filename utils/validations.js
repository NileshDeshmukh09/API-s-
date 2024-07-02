export const validateProductFields = (fields) => {
    const requiredFields = ['name', 'description', 'category', 'price', 'available'];
    for (const field of requiredFields) {
      if (fields[field] === undefined || fields[field] === null) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }
    return null;
  };