import React, { ReactElement } from 'react';
import { Location } from 'history';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../services';

interface LocationState {
  from: Location;
}

function LoginPage(props: RouteComponentProps<never, StaticContext, LocationState>): ReactElement {
  // redirect to home if already logged in
  if (authenticationService.currentUserValue) {
    // eslint-disable-next-line react/destructuring-assignment
    props.history.push('/');
  }

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
          setStatus();
          authenticationService.login(username, password).then(
            () => {
              if (props.location.state) {
                props.history.push(props.location.state.from.pathname);
              } else {
                props.history.push('/');
              }
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            },
          );
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                type="text"
                className={`form-control${
                  errors.username && touched.username ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name="username" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={`form-control${
                  errors.password && touched.password ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Login
              </button>
            </div>
            {status && <div className="alert alert-danger">{status}</div>}
          </Form>
        )}
      />
    </div>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { LoginPage };
