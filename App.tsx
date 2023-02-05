import * as React from 'react';
import './style.css';
const availableColors = [
  'red',
  'blue',
  'green',
  'purple',
  'yellow',
  'black',
  'gold',
  'aqua',
  'pink',
  'salmon',
  'grey',
];

export default function App() {
  const [size, setSize] = React.useState(100);
  const [colors, setColors] = React.useState(['red']);
  const [skew, setSkew] = React.useState(0.65);

  const colorRatio = 1 / colors.length;

  const skewOffset = colorRatio * skew;

  const addRandomColor = () => {
    setColors((prevState) => [
      ...prevState,
      availableColors[Math.floor(Math.random() * availableColors.length)],
    ]);
  };

  const removeColor = () => {
    if (colors.length <= 1) return;
    setColors((prevState) => prevState.slice(0, -1));
  };
  return (
    <div>
      <label htmlFor="size">SVG Size:</label>
      <input
        id="size"
        name="size"
        style={{ display: 'block' }}
        type="range"
        value={size}
        min={50}
        max={250}
        onChange={(e) => setSize(+e.target.value)}
      />
      <label htmlFor="skewness">Skewness:</label>
      <input
        id="skewness"
        name="skewness"
        style={{ display: 'block' }}
        type="range"
        value={skew}
        step={0.05}
        min={-1}
        max={1}
        onChange={(e) => setSkew(+e.target.value)}
      />
      <div style={{ margin: '1rem 0' }}>
        <button onClick={addRandomColor}>Add Color</button>
        <button onClick={removeColor}>Remove Color</button>
      </div>

      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {colors.map((color, idx) => {
          const leftOffset = idx * colorRatio;
          const rightOffset = (1 + idx) * colorRatio;
          const topLeftOffset =
            idx === 0 ? 0 : size * (leftOffset + skewOffset);
          const topRightOffset =
            idx === colors.length - 1
              ? size
              : size * (rightOffset + skewOffset);

          const bottomRightOffset =
            idx === colors.length - 1
              ? size
              : size * (rightOffset - skewOffset);
          const bottomLeftOffset =
            idx === 0 ? 0 : size * (leftOffset - skewOffset);

          return (
            <path
              key={color}
              d={`M ${topLeftOffset} 0 H ${topRightOffset} L ${bottomRightOffset} ${size} H ${bottomLeftOffset} Z`}
              fill={color}
              stroke="white"
            />
          );
        })}
      </svg>
    </div>
  );
}
