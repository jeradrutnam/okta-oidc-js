/*
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import { useAuth, useAuthState } from './OktaContext';
import { Route } from 'react-router';

const RequireAuth = ({ children }) => { 
  const auth = useAuth();
  const authState = useAuthState();

  if(!authState.isAuthenticated) { 
    if(!authState.isPending) { 
      auth.login();
    }
    return null;
  }

  return (
    <> 
      {children}
    </>
  );

};

const SecureRoute = ( {component, ...props} ) => { 

  const PassedComponent = component;
  const WrappedComponent = () => (<RequireAuth><PassedComponent/></RequireAuth>);
  return (
    <Route
      { ...props }
      render={ () => props.render ? props.render({...props, component: WrappedComponent}) : <WrappedComponent /> } 
    />
  );
};

export default SecureRoute;
