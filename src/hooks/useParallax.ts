import { useState, useEffect } from 'react';

export function useParallax(progress: number, offset: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Map progress (0-1) to parallax range (-offset to +offset)
    const normalized = (progress - 0.5) * 2; // -1 to 1
    setValue(normalized * offset);
  }, [progress, offset]);

  return value;
}
