import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => (
  <div style={{ height: '100%' }}>
    {colors.map((color, i) => (
      <DraggableColorBox
        index={i}
        key={color.name}
        color={color.color}
        name={color.name}
        removeColor={removeColor}
      />
    ))}
  </div>
));

export default DraggableColorList;
