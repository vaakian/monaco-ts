
import { useState } from 'react'
import { ref } from 'vue'
import _ from 'lodash'

// vue
export const count = ref(10);

// react
export function useCounter() {
  const [count, setCount] = useState(0)
  return { count, increment: () => setCount(count + 1) }
}

// lodash
const res = _.partition([1, 2, 3, 4], n => n % 2);

// 1. hover the cursor on those variables above to see the types.
// 2. try to import any other library, the types will be automatically loaded.