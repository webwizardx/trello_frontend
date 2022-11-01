import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors';
import styles from './styles';

/* Extending the theme with the colors and styles we have defined. */
export const theme = extendTheme({
	colors,
	styles,
});

export default theme;

