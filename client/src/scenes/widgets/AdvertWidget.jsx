import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";

const trendingTopics = [
    "#Spark",
    "#Shanmukh",
    "#Twitter",
    "#Facebook",
    "#SpaceX",
];

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Trending
                </Typography>
            </FlexBetween>
            {trendingTopics.map((topic, index) => (
                <Typography
                    key={index}
                    color={
                        hoveredIndex === index ? palette.primary.main : medium
                    }
                    m="0.5rem 0"
                    onMouseOver={() => setHoveredIndex(index)}
                    onMouseOut={() => setHoveredIndex(null)}
                    style={{ cursor: "pointer" }}
                >
                    {topic}
                </Typography>
            ))}
        </WidgetWrapper>
    );
};

export default AdvertWidget;
