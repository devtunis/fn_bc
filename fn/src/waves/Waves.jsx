
import styled from 'styled-components';

const Waves = () => {
  return (
    <StyledWrapper>
      <div className="loader1">
        <span className="bar1" />
        <span className="bar1" />
        <span className="bar1" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader1 {
    display: flex;
    align-items: center;
  }

  .bar1 {
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    animation: scale-up4 1s linear infinite;
  }

  .bar1:nth-child(2) {
    height: 35px;
    margin: 0 5px;
    animation-delay: .25s;
  }

  .bar1:nth-child(3) {
    animation-delay: .5s;
  }

  @keyframes scale-up4 {
    20% {
      background-color: #ffff;
      transform: scaleY(1.5);
    }

    40% {
      transform: scaleY(1);
    }
  }`;

export default Waves;
