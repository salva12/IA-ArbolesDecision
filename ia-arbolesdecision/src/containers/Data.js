import React from 'react';

const Data = ({ attributes, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {attributes.map(attr => <th>{attr.label}</th>)}
            <th />
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
};

export default Data;
