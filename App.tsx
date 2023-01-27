import * as React from 'react';
import './style.css';

export default function App() {
  const [] = React.useState(100)
  const colors = ['red', 'blue', "green", "purple", "yellow", "black"];
  const colorRatio = 1 / colors.length;
  const skewOffset = colorRatio * 0.65;



  return (
    <div>
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        {colors.map((color, idx) => {
          const leftOffset = idx * colorRatio;
          const rightOffset = (1 + idx) * colorRatio;
          const topLeftOffset = idx === 0 ? 0 : 100 * (leftOffset + skewOffset);
          const topRightOffset = 100 * (rightOffset + skewOffset);

          const bottomRightOffset = idx === colors.length - 1 ? 100 : 100 * (rightOffset - skewOffset);
          const bottomLeftOffset = 100 * (leftOffset - skewOffset);

          return (
            <path
              key={color}
              d={`M ${topLeftOffset} 0 H ${topRightOffset} L ${bottomRightOffset} 100 H ${bottomLeftOffset} Z`}
              fill={color}
              stroke="white"
            />
          );
        })}
      </svg>
    </div>
  );
}
