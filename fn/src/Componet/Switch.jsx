 
import styled from 'styled-components';

const Switch = ({fn}) => {
  
  return (
    <StyledWrapper>
      
      <label className="switch" onClick={fn}>
        
        <input type="checkbox" />
        <span className="slider">
          <svg className="slider-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16" /></svg> 
        </span>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 2.5em;
    height: 1em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0d1117;
    border: 1px solid #B0B0B0;
    transition: .4s;
    border-radius: 32px;
    outline: none;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    outline: 2px solid #B0B0B0;
    left: -1px;
    bottom: -1px;
    background-color: #fff;
    transition: transform .25s ease-in-out 0s;
  }

  .slider-icon {
    opacity: 0;
    height: 12px;
    width: 12px;
    stroke-width: 8;
    position: absolute;
    z-index: 999;
    stroke: #222222;
    right: 60%;
    top: 30%;
    transition: right ease-in-out .3s, opacity ease-in-out .15s;
  }

  input:checked + .slider {
    background-color: #222222;
  }

  input:checked + .slider .slider-icon {
    opacity: 1;
    right: 20%;
  }

  input:checked + .slider:before {
    transform: translateX(1.5em);
    outline-color: #181818;
  }`;

export default Switch;
