import { useInject } from "@infra/di/view";
import { PlayScreenPresenter } from "@quiz/play/core/controllers/presenters/PlayScreenPresenter";
import { HintActionState } from "@quiz/play/core/controllers/state/HintActionState";
import { PlayState } from "@quiz/play/core/controllers/state/PlayState";
import { SkipActionState } from "@quiz/play/core/controllers/state/SkipActionState";
import { Alternative } from "@quiz/play/core/data/Alternative";
import { Question } from "@quiz/play/core/data/Question";
import { Badge, Chip, LinearProgress } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export function PlaySessionScreen() {
    const presenter = useInject<PlayScreenPresenter>("PlayScreenPresenter")
    const [question, setCurrentQuestion] = useState<Question>()
    const [answered, setAnswer] = useState('')
    const [hintState, setHintState] = useState<HintActionState>()
    const [skipState, setSkipState] = useState<SkipActionState>()
    const [playState, setPlayState] = useState<PlayState>()

    const updatePlayState = useCallback((state: PlayState) => {
        console.log(JSON.stringify(state))
        setPlayState(state)
    }, [])

    const updateHintState = useCallback((state: HintActionState) => {
        setHintState(state)
    }, [])

    const updateSkipState = useCallback((state: SkipActionState) => {
        setSkipState(state)
    }, [])

    const updateQuestion = useCallback((question: Question) => {
        setCurrentQuestion(question)
        setAnswer('')
    }, [])

    useEffect(() => {
        presenter.setQuestionCallback(updateQuestion)
        presenter.setPlayStateCallback(updatePlayState)
        presenter.setHintCallback(updateHintState)
        presenter.setSkipCallback(updateSkipState)
        presenter.start()
        return () => {
            const finish = async () =>  { await presenter.finish() }
            finish()
        }
    }, [])

    const onAnswer = async (alternative: Alternative) => {
        console.log("onAnswer")
        if(answered === '') {
            setAnswer(alternative.id)
            await presenter.answer(alternative)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.headerFooter]}>
                <HeaderTile title="Questions" value={`${question?.index} / ${question?.rangeTotal}`} color="#a7c6da" borderColor="white" textColor="black" />
                <HeaderTile title="Coins" value={`${playState?.coins ?? 0}`} color="#F1DB4B" borderColor="white" textColor="black" />
                <HeaderTile title="XP" value={`${playState?.xp ?? 0}`} color="#CDEB8B" borderColor="white" textColor="black" />
            </View>
            <View style={{elevation: 2, padding: 0, backgroundColor: '#d7f4ee', marginLeft: 8, marginRight: 8}}>
                <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{backgroundColor: '#F6425F', color: 'white', width: 50, height: 50, borderRadius: 50, marginLeft: 8, marginRight: 16, textAlignVertical: 'center', textAlign: 'center', fontSize: 24, fontWeight: 'bold', borderWidth: 4, borderColor: 'white', elevation: 2}}>?</Text>
                    <Text style={{flex: 3, fontWeight: 'bold'}}>{question?.title}</Text>
                </View>
                <LinearProgress
                    value={5}
                    variant="indeterminate"
                />
            </View>
            <FlatList data={question?.alternatives}
                renderItem={({item}) => {
                    return <ChoiceCard id={item.id} choice={item.choice} correct={item.correct} onPress={async () => await onAnswer(item)} answered={answered} concealed={item.concealed} disabled={(playState?.disabled ?? false)}></ChoiceCard>
                }}
                keyExtractor={(item) => item.id}
            />
            <View style={[styles.headerFooter, {justifyContent: 'space-around'}]}>
                <Chip type="outline" title={"EXIT"} icon={{type: "ionicon", name: 'exit-outline', color: '#218adc', size: 20}} containerStyle={{marginLeft: 8}} />
                <HintButton disabled={answered !== '' || (hintState?.disabled ?? false)} count={hintState?.count ?? 0} onPress={async () => await presenter.getHint()} />
                <ActionFactory answered={answered !== ''} disabled={playState?.disabled || (skipState?.disabled ?? false)} skipCount={skipState?.count ?? 0} />
            </View>
        </SafeAreaView>
    )
}

const ActionFactory = (props: {disabled: boolean, answered: boolean, skipCount: number}) => {
    const presenter = useInject<PlayScreenPresenter>("PlayScreenPresenter")
    if(!props.answered || props.disabled) return <SkipButton count={props.skipCount} disabled={props.disabled} onPress={async () => await presenter.skipQuestion()} />
    return <NextButton onPress={async () => await presenter.getNextQuestion()} />
}

const HintButton = (props: {disabled: boolean, count: number, onPress: () => void}) => {
    const tintColor = props.disabled ? '#99a1a8' : 'white'
    return (
        <View>
            <Chip title={"HINT"} 
                icon={{type: "font-awesome-5", name: 'lightbulb', color: tintColor, size: 20}} 
                containerStyle={{marginVertical: 15}} 
                buttonStyle={{paddingLeft: 20, paddingRight: 20}} 
                disabled={props.disabled || props.count <= 0} 
                onPress={props.onPress}/>
            <Badge
                status="error"
                value={props.count}
                containerStyle={{ position: 'absolute', top: 9, right: -8 }}
            />
        </View>
    )
}

const SkipButton = (props: {disabled: boolean, count: number, onPress: () => void}) => {
    const tintColor = props.disabled ? '#99a1a8' : 'white'
    return (
        <View>
            <Chip title={"SKIP"} 
                icon={{type: "octicon", name: 'skip', color: tintColor, size: 20}} 
                containerStyle={{marginRight: 8}} 
                buttonStyle={{paddingLeft: 18, paddingRight: 18}} 
                disabled={props.disabled || props.count <= 0}
                onPress={props.onPress}
            />
            <Badge
                status="error"
                value={props.count}
                containerStyle={{ position: 'absolute', top: -9, right: 0 }}
            />
        </View>
    )
}

const NextButton = (props: {onPress: () => void}) => {
    return (
        <Chip title={"NEXT"} 
              color={"#D80073"} 
              icon={{type: "material", name: 'navigate-next', color: 'white', size: 20}} 
              containerStyle={{marginRight: 8}} 
              buttonStyle={{paddingRight: 18}} 
              titleStyle={{fontWeight: 'bold'}} 
              onPress={props.onPress}
        />
    )
}

const ChoiceCard = (props: {id: string, choice: string, correct: boolean, concealed: boolean, onPress: () => void, answered: string, disabled: boolean}) => {
    let borderColor = 'white'
    let backgroundColor = 'white'
    if(props.answered === props.id || !props.concealed) {
        if(props.correct) {
            borderColor = '#3FA44D'
            backgroundColor = '#E3F7E2'
        }
        else {
            borderColor = '#D80073'
            backgroundColor = '#FFF3FA'
        }
    }

    return (
        <Pressable onPress={() => props.onPress()} disabled={props.disabled || (!props.concealed && props.answered === '')}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: backgroundColor, elevation: 4, margin: 8, padding: 2, borderRadius: 10, borderWidth: 2, borderColor: borderColor}}>
                <Text style={{backgroundColor: '#3aafc5', color: 'white', width: 50, height: 50, borderRadius: 50, margin: 16, textAlignVertical: 'center', textAlign: 'center', fontSize: 24, fontWeight: 'bold', borderWidth: 4, borderColor: 'white', elevation: 4}}>{props.id}</Text>
                <Text style={{flex: 3}}>{props.choice}</Text>
            </View>
        </Pressable>
    )
}

const HeaderTile = (prop: {title: string, value: string, color: string, borderColor: string, textColor: string, style?: any}) => {
    return (
        <View style={[{flex: 1, margin: 8, borderColor: `${prop.borderColor}`, borderRadius: 20, marginBottom: 10,  backgroundColor: `${prop.color}`, padding: 5}, prop?.style]}>
            <Text style={{textAlign: 'center', color: `${prop.textColor}`, fontSize: 12}}>{prop.title}</Text>
            <Text style={[{textAlign: 'center', fontWeight: 'bold', color: `${prop.textColor}`}]}>{prop.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    headerFooter: {
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 70,
    },
})