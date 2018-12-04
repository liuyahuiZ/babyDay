import React, {Component} from 'react'
import { render } from 'react-dom'
import MyRouter  from './App/Allroutes'
import * as Sentry from '@sentry/browser';

Sentry.init({ dsn: 'https://6ae2c2623b064bf0ad1505ef70808026@sentry.io/1200360' });

render(
  <MyRouter />,
  document.getElementById('root')
)
