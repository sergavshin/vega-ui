import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from '@vega-ui/hooks';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownContext } from './DropdownContext';
import { DropdownItem } from './DropdownItem';
import { DropdownLink } from './DropdownLink';
import { DropdownMenu } from './DropdownMenu';

import './Dropdown.css';

type ElementsProps = JSX.IntrinsicElements;

export type DropdownProps = {
  trigger?: React.ReactNode;
  onClose: (e?: MouseEvent | TouchEvent) => void;
  children?: React.ReactNode;
  isOpen: boolean;
  className?: string;
} & ElementsProps['div'];

type Dropdown<T> = React.FC<T> & {
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  Link: typeof DropdownLink;
};

export const Dropdown: Dropdown<DropdownProps> = (props) => {
  const { trigger, onClose, children, className, isOpen, ...rest } = props;
  const dropdownRef = useRef(null);

  useOnClickOutside({
    ref: dropdownRef,
    handler: () => {
      if (isOpen) {
        onClose();
      }
    },
  });

  return (
    <DropdownContext.Provider value={{ onClose }}>
      <div ref={dropdownRef}>
        {trigger}
        <CSSTransition timeout={300} classNames="dropdown" in={isOpen} mountOnEnter unmountOnExit>
          <div {...rest} className={cnDropdown('Root').mix(className)}>
            {children}
          </div>
        </CSSTransition>
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Link = DropdownLink;
