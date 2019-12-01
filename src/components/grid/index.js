import React, { useState, Children } from 'react';
import PropTypes from 'prop-types';

import './grid.css';

// common grid component to show
const Grid = ({ children, className, onSelectCard }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const onClickCard = (evt, index) => {
        evt.stopPropagation();
        setCurrentIndex(index);
        onSelectCard(evt, index);
    };

    return (
        <div className={`${className} grid-container`}>
            {
                Children.map(children, (item, index) => (
                    <div
                        className={`grid-item ${currentIndex === index ? 'active' : ''}`}
                        key={`grid-item-${index.toString()}`}
                        onClick={(evt) => onClickCard(evt, index)}
                    >
                    {item}
                    </div>
                ))
            }
        </div>
    );
};

Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  onSelectCard: PropTypes.func.isRequired
};

Grid.defaultProps = {
  className: ''
};

export default Grid;
