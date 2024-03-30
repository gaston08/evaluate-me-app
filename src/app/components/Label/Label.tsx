import * as React from 'react';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useTheme, SxProps } from '@mui/material/styles';
import { StyledLabel } from './styles';
import { ColorEnum } from 'app/shared/interfaces/ui';

const Label = forwardRef(
  (
    {
      children,
      color = ColorEnum.DEFAULT,
      variant = 'soft',
      startIcon,
      endIcon,
      sx,
    }: {
      children: React.Node;
      color: ColorEnum;
      variant: string;
      startIcon: React.Component | null;
      endIcon: React.Component | null;
      sx: SxProps;
    },
    ref,
  ) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledLabel>
    );
  },
);

export default Label;
