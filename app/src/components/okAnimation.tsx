import React, { useRef, useEffect, useState} from "react"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import LottieView from "lottie-react-native"

import animation from "../../assets/animations/okAnimation.json"

export default function OkAnimation(props: {state:boolean, onAnimationFinish:any}){

    const animationRef = useRef<any>(null)
    const [counter, setCounter] = useState<number>(0)

    useEffect(() => {
        if (counter == 0){
            setCounter(counter + 1)
        }
        else {
            animationRef.current?.play()
        }
    }, [props.state])

    return (
        <View style={[styles.animationContainer, props.state == true ? {display: "flex"}: {display: "none"}]}>
            <LottieView
                speed={1.5}
                autoPlay={false}
                ref={animationRef}
                style={styles.animation}
                source={animation}
                loop={false}
                onAnimationFinish={() => {props.onAnimationFinish()}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    animationContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        justifyContent: "center",
    },
    animation: {
        width: "50%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
    }
})