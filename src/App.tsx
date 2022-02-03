import React, { lazy, Suspense, useState } from 'react';
// import { square } from "./math.bak";

const LazyComponent = lazy(() => import('./LazyComponent'));
const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(_count => _count + 1);
  };

  const decrement = () => {
    setCount(_count => _count - 1);
  };

  return (
    <div>
      {/* <h2>square iss: {square(3)}</h2> */}
      <h2>
        Number: <b>{count}</b>
      </h2>
      <br />
      <br />
      <button type="button" onClick={() => increment()}>
        Increment
      </button>
      <button type="button" onClick={() => decrement()}>
        Decrement
      </button>
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default React.memo(App);
