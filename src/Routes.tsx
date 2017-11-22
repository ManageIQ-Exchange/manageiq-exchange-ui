import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/Router/AsyncComponent';
import { AuthenticatedRoute } from './components/Router/AuthenticatedRoute';
import { UnauthenticatedRoute } from './components/Router/UnauthenticatedRoute';

// Dynamic Imports added in ts 2.4.1, to be removed once 2.4 @types fixed in create-react-app-typescript
// https://github.com/Microsoft/TypeScript/issues/12364
declare global {
  interface System {
    import(request: string): Promise<any>;
  }
  var System: System;
}

const importHome = () => System.import('./pages/Home'); 
const importDolor = () => System.import('./pages/Dolor');
const importNotFound = () => System.import('./pages/NotFound');

interface Props {
  childProps: any;
}
export const Routes: React.StatelessComponent<Props> = props => {
  return (
    <Switch>
      <UnauthenticatedRoute
        path="/"
        exact
        component={asyncComponent(importHome)}
        props={props.childProps}
      />
      <AuthenticatedRoute
        path="/dolor"
        exact
        component={asyncComponent(importDolor)}
        props={props.childProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={asyncComponent(importNotFound)} />
    </Switch>
  );
};