import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    // const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Trending
                </Typography>
                {/* <Typography color={medium}>abc</Typography> */}
            </FlexBetween>
            {/* <img
                width="100%"
                height="auto"
                alt="abc"
                src="img1"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main}>title1</Typography>
                <Typography color={medium}>title2</Typography>
            </FlexBetween>*/}
            <Typography color={medium} m="0.5rem 0">
                Trending on Spark.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
