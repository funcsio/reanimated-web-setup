import React, {
  useState,
} from "react";
import { StyleSheet, View, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  
  withSpring,
  
} from "react-native-reanimated";

const MIN_BOX_DIMENSIONS = 100;
const Dim_Width = 500;
const Dim_Height = 500;
const Translate = () => {
  const ref: any = React.createRef();

  const [animationFinished, setAnimationFinished] = useState(true);

  const [inputWidth, setInputWidth] = useState<number>(MIN_BOX_DIMENSIONS);
  const [inputHeight, setInputHeight] = useState<number>(MIN_BOX_DIMENSIONS);

  const width = useSharedValue(inputWidth);
  const height = useSharedValue(inputHeight);

  const AnimatedStyles = {
    animate: useAnimatedStyle(() => {
      return {
        width: withSpring(width.value),
        height: withSpring(height.value),
      };
    }),
  };

  return (
    <Animated.View style={styles.cont}>
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={ref}
      >
        <Animated.View
          style={[styles.box, AnimatedStyles.animate]}
        ></Animated.View>

        {animationFinished && (
          <>
            <Animated.View
              style={[
                styles.box,
                styles.boxGhost,
                {
                  width: inputWidth,
                  height: inputHeight,
                },
              ]}
            ></Animated.View>
          </>
        )}
      </View>
      <Button
        title="Shuffle"
        onPress={() => {
          setAnimationFinished(true);
          setInputWidth(
            MIN_BOX_DIMENSIONS +
              Math.round(Math.random() * (Dim_Width - MIN_BOX_DIMENSIONS))
          );
          setInputHeight(
            MIN_BOX_DIMENSIONS +
              Math.round(Math.random() * (Dim_Height - MIN_BOX_DIMENSIONS))
          );
        }}
      />
      <Button
        title="Play Animation"
        onPress={() => {
          setAnimationFinished(false);
          width.value = inputWidth;
          height.value = inputHeight;
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: "50vh",
    width: "100%",
    minHeight: 500,
  },
  box: {
    backgroundColor: "#001a72",
    borderRadius: 15,
    height: MIN_BOX_DIMENSIONS,
    width: MIN_BOX_DIMENSIONS,
    marginVertical: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxGhost: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
    borderWidth: 2,

    borderStyle: "dashed",
    borderColor: "#ccc",
  },
});
export default Translate;
