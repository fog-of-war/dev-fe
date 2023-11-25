/** @jsxImportSource @emotion/react */

import React from 'react';
import colors from "../../constants/colors";

interface EmailCertifedProps {
  email: string;
}

const EmailCertifed = ({ email }: EmailCertifedProps) => {
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <span
        css={{
          fontSize: "16px",
          fontWeight: "bold",
          color: colors.accent,

        }}
      >
        이메일
      </span>
      <div
        css={{
          fontSize: "20px",
          color: colors.darkGrey,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {email}
        <div
          css={{
            background: colors.accent,
            color: 'white',
            borderRadius: '10px', // Circular shape
            padding: '6px 12px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          인증완료
        </div>
      </div>
    </div>
  );
};

export default EmailCertifed;
