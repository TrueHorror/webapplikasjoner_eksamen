/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { StyledBanner, StyledMainContent } from '../styles/Styled';

function CreateArticle() {
  const [formData, setFormData] = useState({});

  return (
    <section>
      <StyledBanner>
        <h1>Velkommen til FG Rørleggerservice AS</h1>
      </StyledBanner>
      <StyledMainContent>
        <p>hello</p>
      </StyledMainContent>
    </section>
  );
}

export default CreateArticle;
