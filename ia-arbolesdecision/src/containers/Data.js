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
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <button>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Data;
