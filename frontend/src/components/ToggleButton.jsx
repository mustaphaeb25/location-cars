// import React from 'react';
// import { Form } from 'react-bootstrap';

// const ToggleButton = ({ label, checked, onChange }) => {
//   return (
//     <Form.Check
//       type="switch"
//       id="custom-switch"
//       label={label}
//       checked={checked}
//       onChange={onChange}
//     />
//   );
// };

// export default ToggleButton;
// import React from 'react';
// import { Form } from 'react-bootstrap';

// const ToggleButton = ({ label, checked, onChange, ariaLabel }) => {
//   return (
//     <Form.Check
//       type="switch"
//       id="theme-switch"
//       label={label}
//       checked={checked}
//       onChange={onChange}
//       aria-label={ariaLabel}
//       className={`theme-switch ${checked ? 'dark-mode' : 'light-mode'}`}
//     />
//   );
// };

// export default ToggleButton;

import React from 'react';
import { Form } from 'react-bootstrap';

const ToggleButton = ({ label, checked, onChange, ariaLabel }) => {
  return (
    <Form.Check
      type="switch"
      id="theme-switch"
      label={label}
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className="theme-switch"
    />
  );
};

export default ToggleButton;