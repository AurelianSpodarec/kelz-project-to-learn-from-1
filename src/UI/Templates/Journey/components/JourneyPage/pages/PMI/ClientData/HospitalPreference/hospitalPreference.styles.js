import styled from "styled-components"
import { Skeleton as Skeletonn } from "@4cplatform/elements/Molecules"

export const GoogleMapsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
`
export const PinWrapper = styled.div`
  position: relative;
  display: flex;
`
export const Pin = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  z-index: ${({ zIndex }) => zIndex};
  background: ${({ theme, type }) => {
    const pinColors = {
      client: theme.red,
      closest: theme.blue,
      selected: theme.green,
      avaliable: theme.darkBlue,
      disabled: theme.faintGrey
    }
    return pinColors[`${type}`]
  }};
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transform: rotate(45deg);
  }
`
export const Tooltip = styled.div`
  visibility: ${({ isHover }) => (isHover ? "visible" : "hidden")};
  background-color: ${({ theme, type }) => (type === "selected" ? theme.green : theme.blue)};
  color: #fff !important;
  text-align: center;
  padding: 1.5rem 1.2rem;
  top: -10rem;
  left: 1rem;
  width: 22rem;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
`

export const PreferedHospital = styled.div`
  border: ${({ theme }) => `1px solid ${theme.lightGrey}`};
  width: fit-content;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  border-radius: 3px;
`
export const PreferedHospitalContenct = styled.div`
  margin-right: 1rem;
  &h4 {
    margin
  }
`

export const ZoomButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 2rem;
  right: 0;
`
export const Skeleton = styled(Skeletonn)`
  position: absolute;
  width: 100%;
  height: 50vh;
  z-index: 4;
  top: 0;
  left: 0;
`
