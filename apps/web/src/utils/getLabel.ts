export const getLabel = (options: { value: string; label: string }[], value: string): string => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : 'Not specified';
  };
  
  export const getCountryLabel = (options: { code: string; name: string }[], value: string): string => {
    const option = options.find((option) => option.code === value);
    return option ? option.name : 'Not specified';
  };
  