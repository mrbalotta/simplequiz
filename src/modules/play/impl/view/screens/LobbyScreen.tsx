import { Card, Chip, Slider } from "@rneui/themed"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

export function LobbyScreen() {
    return (
        <SafeAreaView>
            <EarnablesHeader />
            <ScrollView contentContainerStyle={[styles.content, {minHeight: 900}]}> 
                <StartButton />
                <DifficultyCard />
                <TimerCard />
                <HelpersCard />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 16, marginLeft: 16}}>
                        <ExitButton />
                    </View>
                    <View style={{marginRight: 16, marginLeft: 16}}>
                        <StartButton />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const StartButton = () => {
    return (
        <View style={[{marginTop: 16, width: 200}]}>
            <Chip title="START" color={"#D80073"} titleStyle={{fontSize: 30}} onPress={() => console.log('Icon chip was pressed!')}></Chip>
        </View>
    )
}

const ExitButton = () => {
    return (
        <View>
            <Chip 
                title="EXIT" 
                color={"#76608A"} 
                type="outline"
                titleStyle={{fontSize: 20}} 
                onPress={() => console.log('Icon chip was pressed!')} />
        </View>
    )
}

const EarnablesHeader = () => {
    return (
        <View style={styles.totalCard}>
            <EarnableTile title="Earnable Coins" value="10" color="#647687" borderColor="white" textColor="white" />
            <EarnableTile title="Earnable XP" value="10" color="#76608A" borderColor="white" textColor="white" />
        </View>
    )
}

const EarnableTile = (prop: {title: string, value: string, color: string, borderColor: string, textColor: string}) => {
    return (
        <Card containerStyle={{flex: 1, borderColor: `${prop.borderColor}`, borderRadius: 20, marginBottom: 10,  backgroundColor: `${prop.color}`}}>
            <Text style={{textAlign: 'center', color: `${prop.textColor}`}}>{prop.title}</Text>
            <Text style={[{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: `${prop.textColor}`}]}>{prop.value}</Text>
        </Card>
    )
}

const DifficultyCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Difficulty</Card.Title>
            <Card.Divider />
            <DifficultyLevelOption />
        </Card>
    )
}

const DifficultyLevelOption = () => {
    return (
        <>
            <View style={[styles.sliderContainer]}>
                <Slider
                    style={[styles.slider]}
                    animateTransitions
                    animationType="spring"
                    maximumValue={2}
                    allowTouchTrack
                    onSlidingComplete={() =>
                        console.log("onSlidingComplete()")
                    }
                    onSlidingStart={() =>
                        console.log("onSlidingStart()")
                    }
                    onValueChange={value =>
                        console.log("onValueChange()", value)
                    }
                    orientation="horizontal"
                    step={1}
                    thumbStyle={{ height: 20, width: 20 }}
                    thumbTouchSize={{ width: 40, height: 40 }}
                    trackStyle={{ height: 10, borderRadius: 20 }}
                    //value={0}
                />
            </View>
            <View style={[styles.sliderLabel]}>
                <Text>Easy</Text>
                <Text>Medium</Text>
                <Text>Hard</Text>
            </View>
        </>
    )
}

const TimerOption = () => {
    return (
        <>
            <View style={[styles.sliderContainer]}>
                <Slider
                    style={[styles.slider]}
                    animateTransitions
                    animationType="spring"
                    maximumValue={2}
                    allowTouchTrack
                    onSlidingComplete={() =>
                        console.log("onSlidingComplete()")
                    }
                    onSlidingStart={() =>
                        console.log("onSlidingStart()")
                    }
                    onValueChange={value =>
                        console.log("onValueChange()", value)
                    }
                    orientation="horizontal"
                    step={1}
                    thumbStyle={{ height: 20, width: 20 }}
                    thumbTouchSize={{ width: 40, height: 40 }}
                    trackStyle={{ height: 10, borderRadius: 20 }}
                    //value={0}
                />
            </View>
            <View style={[styles.sliderLabel]}>
                <Text>No Timer</Text>
                <Text style={{marginRight: 35}}>10s</Text>
                <Text style={{marginRight: 5}}>5s</Text>
            </View>
        </>
    )
}

const TimerCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Timer</Card.Title>
                <Card.Divider />
                <TimerOption />
                <Text style={{textAlign: 'center', fontStyle: 'italic'}}>Select how much time you get to answer each question. The fewer, the harder.</Text>
        </Card>
    )
}

const HelpersCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Helpers</Card.Title>
            <Card.Divider />
            <View style={[styles.optionContainer]}>
                <View style={[styles.helperCellLabel]}>
                    <Text style={[styles.helperLabel]}>Skip up to 5 questions</Text>
                </View>
                <View style={styles.helperCell}>
                    <Chip title="Buy for $5" containerStyle={styles.chip}></Chip>
                </View>
            </View>

            <View style={[styles.optionContainer]}>
                <View style={[styles.helperCellLabel]}>
                    <Text style={[styles.helperLabel]}>Get up to 5 hints</Text>
                    <Text style={[styles.helperLabel, {fontStyle: 'italic'}]}>Limited to 2 hints per question</Text>
                </View>
                <View style={styles.helperCell}>
                    <Chip title="Buy for $5" containerStyle={styles.chip}></Chip>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    content: {
        //justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderRadius: 10,
        width: '80%',
        elevation: 5
    },
    totalCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10,
        maxHeight: 125,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    optionContainer: {
        flexDirection: 'row'
    },
    timerContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    helperLabel: {
        fontSize: 14,
        textAlign: 'left'
    },
    timerLabel: {
        fontSize: 14,
    },
    timerCellLabel: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 10
    },
    timerCell: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    helperCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    helperCellLabel: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    chip: {
        marginVertical: 15,
        width: '100%',
        marginLeft: 8,
        marginRight: 9
    },
    slider: {
        flex: 3, 
        marginLeft: 8, 
        marginRight: 8
    },
    sliderContainer: {
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    sliderLabel: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 24
    },
    border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
    }
})