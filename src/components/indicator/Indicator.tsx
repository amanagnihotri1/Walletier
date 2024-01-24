import React from 'react';
import { Tooltip } from '@mantine/core';
import {ReactComponent as Info} from "../../assets/info.svg";
export const Indicator = ({customText}:{customText:string}) => {
  return (
    <Tooltip label={customText}>
    <Info/>
  </Tooltip>
  )
}
