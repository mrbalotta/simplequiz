import { Card, Chip, Icon, Slider } from "@rneui/themed"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

const goals = [
    {goal: "Answer at least 6 questions correctly", xp: 1},
    {goal: "Answer 4 questions correctly in a row", xp: 1},
    {goal: "Use 1 power-up or less", xp: 2},
    {goal: "Don't ask for hints before answering at least 5 questions correctly", xp: 2},
    {goal: "Complete at least 2 goals", xp: 1}
]

const powerups = [
    {powerup: 'Skip up to 2 questions', cost: 'Buy for $5'},
    {powerup: 'Skip up to 3 questions not in a row', cost: 'Buy for $5'},
    {powerup: 'Pray to God', cost: 'Free'},
    {powerup: 'Get 2 hints per question up to 5 hints in total', cost: 'Buy for $10'},
    {powerup: 'Multiply your earned XP by 1.5 only if all goals are completed', cost: 'Buy for $15'},
    {powerup: 'Multiply your earned XP by 3 only if all goals are completed', cost: 'Buy for $25'},
    {powerup: 'Multiply your earned coins by 3 with no restrictions', cost: 'Buy for $40'},
]

const fixedTimeCard = false
const fixedDifficulty = false
const noPowerUps = false
export function GoalScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={[styles.content]}> 
                <GoalsCard />
                <Text style={{alignSelf: 'center', marginTop: 16, fontSize: 30, fontWeight: 'bold', color: '#aaa'}}>Settings</Text>
                {!fixedDifficulty && <DifficultyCard />}
                {fixedDifficulty && <FixedDifficultyCard />}
                {!fixedTimeCard && <TimerCard />}
                {fixedTimeCard && <FixedTimerCard />}
                {!noPowerUps &&  <PowerUpsCard />}
                { noPowerUps && <NoPowerUpsCard />}
                
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
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

const GoalsCard = () => {
    return (
        <Card containerStyle={{
            alignSelf: 'stretch',
            backgroundColor: '#F9F7ED', 
            borderColor: '#D6B656', 
            borderRadius: 10,
            elevation: 10
        }}>
            <Card.Title>Goals</Card.Title>
            <Card.Divider />
            <View style={{margin: 0}}>
                {goals.map((item, idx) => {
                    return (
                        <View style={[{flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8}]}  key={`goal-${idx}`}>
                            <Icon
                                name='trophy' 
                                size={30}
                                type='foundation' 
                                color='#F6425F' 
                            />
                            <View>
                                <Text style={{
                                    marginLeft: 18,
                                    fontSize: 16,
                                    color: '#4d4d4d',
                                    fontStyle: 'italic'
                                }}>{item.goal}</Text> 
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{
                                        marginLeft: 18,
                                        fontSize: 16,
                                        color: '#5676D6',
                                        fontStyle: 'italic',
                                    }}>you earn </Text> 
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#5676D6',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold'
                                    }}>{item.xp} XP</Text> 
                                </View>
                            </View>
                            
                        </View>
                    )
                })}
                
            </View>
            <StartButton style={{alignSelf: 'center'}} />
        </Card>
    )
}

const DifficultyCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Difficulty</Card.Title>
            <Card.Divider />
            <DifficultySlider />
            <Text style={{textAlign: 'center', fontStyle: 'italic'}}>Harder play sessions always amount to more XP, which will be multiplied by the corresponding factor.</Text>
        </Card>
    )
}

const FixedDifficultyCard = () => {
    return (
        <Card containerStyle={[styles.card, {
            backgroundColor: '#EDEFF9',
            borderColor: '#5676D6'
        }]}>
            <Card.Title>Fixed Difficulty</Card.Title>
            <Card.Divider />
            <DifficultySlider value={3} disabled={true} />
            <Text style={{textAlign: 'center', fontStyle: 'italic'}}>You're challenged to play at this mode! Harder play sessions always amount to more XP, which will be multiplied by the corresponding factor.</Text>
        </Card>
    )
}

const DefaultSlider = (props: {disabled?: boolean, value?: number}) => {
    return (
        <Slider
            style={[styles.slider]}
            animateTransitions
            animationType="spring"
            maximumValue={2}
            allowTouchTrack={!props?.disabled ?? true}
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
            value={props?.value}
            disabled={props?.disabled}
        />
    )
}

const DifficultySlider = (props: {disabled?: boolean, value?: number}) => {
    return (
        <>
            <View style={[styles.sliderContainer]}>
                <DefaultSlider {...props} />
            </View>
            <View style={[styles.sliderLabel, {marginBottom: 0}]}>
                <Text style={{fontWeight: 'bold'}}>Easy</Text>
                <Text style={{fontWeight: 'bold'}}>Medium</Text>
                <Text style={{fontWeight: 'bold'}}>Hard</Text>
            </View>
            <View style={[styles.sliderLabel, {marginBottom: 16}]}>
                <Text  style={{marginLeft: 7, fontStyle: 'italic'}}>1x</Text>
                <Text style={{marginRight: 3, fontStyle: 'italic'}}>1.5x</Text>
                <Text style={{marginRight: 5, fontStyle: 'italic'}}>2x</Text>
            </View>
        </>
    )
}

const TimerSlider = (props: {disabled?: boolean, value?: number}) => {
    return (
        <>
            <View style={[styles.sliderContainer]}>
                <DefaultSlider {...props} />
            </View>
            <View style={[styles.sliderLabel, {marginBottom: 0}]}>
                <Text style={{fontWeight: 'bold'}}>No Timer</Text>
                <Text style={{marginRight: 35, fontWeight: 'bold'}}>10s</Text>
                <Text style={{marginRight: 5, fontWeight: 'bold'}}>5s</Text>
            </View>
            <View style={[styles.sliderLabel, {marginBottom: 16}]}>
                <Text  style={{marginLeft: 18, fontStyle: 'italic'}}>1x</Text>
                <Text style={{marginRight: 9, fontStyle: 'italic'}}>1.5x</Text>
                <Text style={{marginRight: 5, fontStyle: 'italic'}}>2x</Text>
            </View>
        </>
    )
}

const TimerCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Timer</Card.Title>
                <Card.Divider />
                <TimerSlider />
                <Text style={{textAlign: 'center', fontStyle: 'italic'}}>Set or unset the countdown timer. Timer is reset before each question. Gained coins will be multiplied by the corresponding factor.</Text>
        </Card>
    )
}

const FixedTimerCard = () => {
    return (
        <Card containerStyle={[styles.card, {
            backgroundColor: '#EDEFF9',
            borderColor: '#5676D6'
        }]}>
            <Card.Title>Fixed Timer</Card.Title>
                <Card.Divider />
                <TimerSlider value={1} disabled={true} />
                <Text style={{textAlign: 'center', fontStyle: 'italic'}}>You're challenged to answer before time's up! Timer is reset before each question. Gained coins will be multiplied by the corresponding factor.</Text>
        </Card>
    )
}

const PowerUpsCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Title>Power-Ups</Card.Title>
            <Card.Divider />
            {
                powerups.map((item, idx) => {
                    return (
                        <View style={[styles.optionContainer]} key={`powerup-${idx}`}>
                            <View style={[styles.powerupCellLabel]}>
                                <Text style={[styles.powerupLabel]}>{item.powerup}</Text>
                            </View>
                            <View style={styles.powerupCell}>
                                <Chip title={item.cost} containerStyle={styles.chip}></Chip>
                            </View>
                        </View>
                    )
                })
            }
            <Text style={{textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', marginTop: 16}}>You can only buy up to 4 power-ups before each play session.</Text>
        </Card>
    )
}

const NoPowerUpsCard = () => {
    return (
        <Card 
            wrapperStyle ={{
                paddingTop: 10, paddingBottom: 10
            }}
            containerStyle={[styles.card, {
                backgroundColor: '#EDEFF9',
                borderColor: '#5676D6',
        }]}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name='emoticon-cry-outline' 
                    size={30}
                    type='material-community' 
                    color='#5676D6'
                />
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#4d4d4d', marginLeft: 16}}>No Power-Ups</Text>
            </View>
            <Text style={{textAlign: 'center', fontStyle: 'italic', marginTop: 8}}>You're challenged to play with no power-ups!</Text>
        </Card>
    )
}

const StartButton = (prop: {style?: any}) => {
    return (
        <View style={[{marginTop: 16, width: 200}, prop?.style]}>
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

const styles = StyleSheet.create({
    content: {
        alignItems: 'stretch'
    },
    card: {
        borderRadius: 10,
        marginLeft: 16,
        marginRight: 16,
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
    powerupLabel: {
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
    powerupCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    powerupCellLabel: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: 8
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