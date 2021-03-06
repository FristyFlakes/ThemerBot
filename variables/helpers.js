const Color = require(`color`);

const isLight = c => Color(c).isLight();

/**
 * Changes to brightness of a color.
 * @param {number} ratio A number between -100 and 100
 * (if it is negative, `color` will be darkened)
 * @param {boolean} [invert] if true, ratio is negated.
 * @returns {string} A color with lightness of `color.lightness() + ratio`
 */
const adjustBrightness = (color, ratio, invert = false) => {
    const object = Color(color);
    return object
        .lightness(object.lightness() + (invert ? -ratio : ratio))
        .hex();
};

const getFgColor = bg => isLight(bg) ? adjustBrightness(bg, -45) : `#ffffff`;

const themeData = ([filling, text, primary]) => {
    const themeIsLight = isLight(filling);
    const textOnPrimary = getFgColor(primary);
    const background = adjustBrightness(filling, -6.5);
    const secondaryText = Color(filling).mix(Color(text), 0.4).hex();
    const backgroundText = adjustBrightness(secondaryText, -10, themeIsLight);
    const bubbleOutColor = adjustBrightness(
        themeIsLight ? primary : filling,
        themeIsLight ? 41 : -3,
    );

    return {
        background,
        filling,
        text,
        backgroundText,
        secondaryText,
        primary,
        textOnPrimary,
        themeIsLight,
        bubbleOutColor,
    };
};

module.exports = {
    isLight,
    adjustBrightness,
    getFgColor,
    themeData,
};
