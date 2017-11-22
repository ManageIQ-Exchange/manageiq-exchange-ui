import * as React from 'react';
import { RouteNavItem } from './RouteNavItem';

interface Props {
  handleNavClick: Function;
}

export const VerticalNav: React.StatelessComponent<Props> = props => {
  return (
    <div className="nav-pf-vertical">
      <ul className="list-group">        
        <RouteNavItem
          href="/dolor"
          onClick={props.handleNavClick}
          className="list-group-item"
        >
          <span className="fa fa-users" data-toggle="tooltip" title="Dolor" />
          <span className="list-group-item-value">Dolor</span>
        </RouteNavItem>        
      </ul>
    </div>
  );
};