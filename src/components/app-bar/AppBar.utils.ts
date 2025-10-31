import { Theme } from "@mui/material";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string, theme: Theme) {
    let out = {
        sx: {
            bgcolor: '',
            border: `3px solid ${theme.palette.primary.light}`,
            fontSize: theme.typography.caption,
        },
        children: '',
    };
    if (name) {
        out.sx.bgcolor = stringToColor(name);
        out.children = `${name[0].toUpperCase()}${name[1].toUpperCase()}`;
    }
    return out;
}

