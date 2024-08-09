import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const InitialsIcon = ({ initials }) => {
  const diameter = 70; // Diameter of the circle
  const fontSize = 30; // Font size for initials

  return (
    <View>
      <Svg height={diameter} width={diameter}>
        <Circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2} fill="#509650" />
        <SvgText
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize={fontSize}
          fontWeight="bold"
        >
          {initials}
        </SvgText>
      </Svg>
    </View>
  );
};

export default InitialsIcon;
