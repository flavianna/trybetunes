import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div className="w-full flex-col text-center items-center mt-60">
        <div className="text-lg" data-testid="page-not-found">404</div>
        <h3 className="text-2xl">Page not found</h3>
      </div>
    );
  }
}

export default NotFound;
