import { useInject } from "@infra/di/view";
import { PlayScreenPresenter } from "@quiz/play/core/controllers/presenters/PlayScreenPresenter";
import { PlayScreenState } from "@quiz/play/core/controllers/state/PlayScreenState";
import { Alternative } from "@quiz/play/core/data/Alternative";
import { Question } from "@quiz/play/core/data/Question";
import { Badge, Chip, LinearProgress } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export function PlaySessionScreen() {
    const presenter = useInject<PlayScreenPresenter>("PlayScreenPresenter")
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [totalQuestionsRange, setTotalQuestionsRange] = useState(0)
    const [alternatives, setAlternatives] = useState<Alternative[]>()
    const [disabled, setDisabled] = useState(false)
    const [title, setTitle] = useState("")
    const [answered, setAnswer] = useState('')
    const [skipCount, setSkipCount] = useState(0)
    const [hintCount, setHintCount] = useState(0)
    const [coins, setCoins] = useState(0)
    const [xp, setXp] = useState(0)

    const updateState = useCallback((state: PlayScreenState) => {
        setCoins(state.coins ?? coins)
        setXp(state.xp ?? xp)
        setSkipCount(state.skipCount ?? skipCount)
        setHintCount(state.hintCount ?? hintCount)
        setDisabled(state.disabled ?? disabled)
    }, [])

    const updateQuestion = useCallback((question: Question) => {
        setCurrentQuestionIndex(question.index)
        setTotalQuestionsRange(question.rangeTotal)
        setAlternatives(question.alternatives)
        setTitle(question.title)
        setAnswer('')
    }, [])

    useEffect(() => {
        presenter.setQuestionCallback(updateQuestion)
        presenter.setReducer(updateState)
        presenter.start()
        return () => {}
    }, [])

    const onAnswer = (alternative: Alternative) => {
        if(answered === '') {
            setAnswer(alternative.id)
            setDisabled(!alternative.correct)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.headerFooter]}>
                <HeaderTile title="Questions" value={`${currentQuestionIndex} / ${totalQuestionsRange}`} color="#a7c6da" borderColor="white" textColor="black" />
                <HeaderTile title="Coins" value={`${coins}`} color="#F1DB4B" borderColor="white" textColor="black" />
                <HeaderTile title="XP" value={`${xp}`} color="#CDEB8B" borderColor="white" textColor="black" />
            </View>
            <View style={{elevation: 2, padding: 0, backgroundColor: '#d7f4ee', marginLeft: 8, marginRight: 8}}>
                <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{backgroundColor: '#F6425F', color: 'white', width: 50, height: 50, borderRadius: 50, marginLeft: 8, marginRight: 16, textAlignVertical: 'center', textAlign: 'center', fontSize: 24, fontWeight: 'bold', borderWidth: 4, borderColor: 'white', elevation: 2}}>?</Text>
                    <Text style={{flex: 3, fontWeight: 'bold'}}>{title}</Text>
                </View>
                <LinearProgress
                    value={5}
                    variant="indeterminate"
                />
            </View>
            <FlatList data={alternatives}
                renderItem={({item}) => {
                    return <ChoiceCard id={item.id} choice={item.choice} correct={item.correct} onPress={() => onAnswer(item)} answered={answered} concealed={item.concealed} disabled={disabled}></ChoiceCard>
                }}
                keyExtractor={(item) => item.id}
            />
            <View style={[styles.headerFooter, {justifyContent: 'space-around'}]}>
                <Chip type="outline" title={"EXIT"} icon={{type: "ionicon", name: 'exit-outline', color: '#218adc', size: 20}} containerStyle={{marginLeft: 8}} />
                <HintButton disabled={answered !== ''} count={hintCount} onPress={async () => await presenter.getHint()} />
                <ActionFactory answered={answered !== ''} disabled={disabled} skipCount={skipCount} />
            </View>
        </SafeAreaView>
    )
}

const ActionFactory = (props: {disabled: boolean, answered: boolean, skipCount: number}) => {
    const presenter = useInject<PlayScreenPresenter>("PlayScreenPresenter")
    if(!props.answered || props.disabled) return <SkipButton count={props.skipCount} disabled={props.disabled} onPress={async () => await presenter.skipQuestion()} />
    return <NextButton />
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
    return (
        <View>
            <Chip title={"SKIP"} 
                icon={{type: "octicon", name: 'skip', color: 'white', size: 20}} 
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

const NextButton = () => {
    return (
        <Chip title={"NEXT"} color={"#D80073"} icon={{type: "material", name: 'navigate-next', color: 'white', size: 20}} containerStyle={{marginRight: 8}} buttonStyle={{paddingRight: 18}} titleStyle={{fontWeight: 'bold'}} />
    )
}

const ChoiceCard = (props: {id: string, choice: string, correct: boolean, concealed: boolean, onPress: (id: string) => void, answered: string, disabled: boolean}) => {
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
        <Pressable onPress={() => props.onPress(props.id)} disabled={props.disabled || (!props.concealed && props.answered === '')}>
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