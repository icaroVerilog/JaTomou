import React          from "react"
import { useRef }     from "react"
import { useEffect}   from "react"
import { useState}    from "react"
import { View }       from "react-native"
import { StyleSheet } from "react-native"

import LottieView     from "lottie-react-native"
import Animation      from "../../assets/animations/okAnimation.json"

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
                speed={1.2}
                autoPlay={false}
                ref={animationRef}
                style={styles.Animation}
                source={Animation}
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
    Animation: {
        width: "50%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
    }
})