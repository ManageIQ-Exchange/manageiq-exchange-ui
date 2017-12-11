'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import AboutPage from './components/AboutPage';
import AuthorsPage from './components/AuthorsPage';
import AuthorProfile from './components/AuthorProfile';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/about/" component={AboutPage}/>
    <Route path="/authors/" component={AuthorsPage}/>
    <Route path="/author/:userName" component={AuthorProfile}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
